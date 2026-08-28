import { Browserbase } from '@browserbasehq/sdk'
import puppeteer from 'puppeteer-core'

const MAX_PRICE = Number(process.env.MAX_PRICE || 50)
const LOOKAHEAD_DAYS = Number(process.env.LOOKAHEAD_DAYS || 14)
const SESSION_TIMEOUT_SEC = 600

function getClient() {
    const apiKey = process.env.BROWSERBASE_API_KEY
    if (!apiKey) {
        throw new Error('BROWSERBASE_API_KEY is required')
    }
    return new Browserbase({ apiKey })
}

export async function createBrowserbaseSession(options = {}) {
    const bb = getClient()
    const projectId = process.env.BROWSERBASE_PROJECT_ID
    const session = await bb.sessions.create({
        ...(projectId ? { projectId } : {}),
        timeout: options.timeout || SESSION_TIMEOUT_SEC,
        browserSettings: {
            ...(options.contextId
                ? { context: { id: options.contextId, persist: Boolean(options.persist) } }
                : {}),
        },
    })
    return { bb, session }
}

export async function connectPuppeteer(connectUrl) {
    return puppeteer.connect({
        browserWSEndpoint: connectUrl,
        defaultViewport: null,
    })
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function dismissGoogleConsent(page) {
    try {
        await page.evaluate(() => {
            const buttons = [...document.querySelectorAll('button')]
            const match = buttons.find((button) => /accept all|i agree/i.test(button.textContent || ''))
            if (match) {
                match.click()
            }
            document.querySelector('#L2AGLb')?.click()
        })
        await sleep(800)
    } catch {
        // consent dialog is not always present
    }
}

function parsePrices(text) {
    return [...String(text).matchAll(/\$(\d+(?:\.\d{1,2})?)/g)].map((match) => Number(match[1]))
}

function looksUpcoming(text) {
    const value = String(text)
    if (/\b(tonight|today|tomorrow|this week|this weekend)\b/i.test(value)) {
        return true
    }
    const now = new Date()
    const end = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000)
    const monthMatch = value.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}\b/i)
    if (!monthMatch) {
        return true
    }
    const parsed = new Date(`${monthMatch[0]} ${now.getFullYear()}`)
    if (Number.isNaN(parsed.getTime())) {
        return true
    }
    if (parsed < now) {
        parsed.setFullYear(parsed.getFullYear() + 1)
    }
    return parsed <= end
}

function isCheapEnough(text) {
    const prices = parsePrices(text)
    if (prices.length === 0) {
        return /\b(free|cheap|under\s*\$\d+)\b/i.test(text)
    }
    return prices.some((price) => price > 0 && price <= MAX_PRICE)
}

function lowestPrice(text) {
    const prices = parsePrices(text).filter((price) => price > 0 && price <= MAX_PRICE)
    return prices.length ? Math.min(...prices) : null
}

export function filterShows(rawShows) {
    const seen = new Set()
    const filtered = []
    for (const show of rawShows) {
        const title = (show.title || '').trim()
        const blob = `${title} ${show.venue || ''} ${show.date || ''} ${show.snippet || ''}`
        if (!title || title.length < 3) {
            continue
        }
        if (!isCheapEnough(blob) || !looksUpcoming(blob)) {
            continue
        }
        const key = (show.link || title).toLowerCase()
        if (seen.has(key)) {
            continue
        }
        seen.add(key)
        filtered.push({
            title,
            venue: (show.venue || '').trim(),
            date: (show.date || '').trim(),
            link: show.link || '',
            price: lowestPrice(blob),
        })
        if (filtered.length >= 5) {
            break
        }
    }
    return filtered
}

export async function searchCheapConcerts(location) {
    const { session } = await createBrowserbaseSession()
    console.log(`Search session ${session.id} for ${location}: https://browserbase.com/sessions/${session.id}`)
    const browser = await connectPuppeteer(session.connectUrl)
    try {
        const pages = await browser.pages()
        const page = pages[0] || await browser.newPage()
        const query = `cheap concerts in ${location} this week`
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`, {
            waitUntil: 'domcontentloaded',
            timeout: 45000,
        })
        await dismissGoogleConsent(page)
        await sleep(2500)

        const rawShows = await page.evaluate(() => {
            const items = []
            const eventCards = document.querySelectorAll('[data-event-status], [data-ved] g-inner-card, .dW4Cte, .P5Bobd')
            eventCards.forEach((card) => {
                const title = card.querySelector('.P5Bobd, .summary, .title, div[role="heading"]')?.textContent
                    || card.querySelector('.c8b9Dc')?.textContent
                    || ''
                const meta = [...card.querySelectorAll('span, div')]
                    .map((el) => el.textContent)
                    .filter(Boolean)
                    .slice(0, 8)
                    .join(' ')
                const link = card.querySelector('a')?.href || ''
                if (title) {
                    items.push({ title, snippet: meta, link, venue: '', date: '' })
                }
            })

            document.querySelectorAll('#search .g, #rso .MjjYud').forEach((result) => {
                const title = result.querySelector('h3')?.innerText || ''
                const link = result.querySelector('a')?.href || ''
                const snippet = result.querySelector('.VwiC3b, [data-sncf], .ITZIwc')?.innerText || result.innerText.slice(0, 280)
                if (title) {
                    items.push({ title, snippet, link, venue: '', date: '' })
                }
            })
            return items
        })

        return filterShows(rawShows)
    } finally {
        try {
            await browser.close()
        } catch {
            // session may already be gone
        }
    }
}

export function formatWhatsAppMessage(name, location, shows) {
    const firstName = name.trim().split(/\s+/)[0] || 'there'
    const lines = shows.map((show) => {
        const where = show.venue ? ` @ ${show.venue}` : ''
        const when = show.date ? ` — ${show.date}` : ''
        const price = show.price != null ? ` — ~$${show.price}` : ''
        const link = show.link ? `\n  ${show.link}` : ''
        return `• ${show.title}${where}${when}${price}${link}`
    })
    return `Hey ${firstName} — cheap shows near ${location} this week:\n${lines.join('\n')}\nReply STOP to unsubscribe.`
}
