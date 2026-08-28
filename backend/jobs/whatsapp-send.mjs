import { Client } from 'whatsapp-web.js'
import { createBrowserbaseSession } from './search-concerts.mjs'
import { markUnsubscribed } from '../concert-model.mjs'
const SEND_GAP_MS = 3000
const READY_TIMEOUT_MS = 120000

function toChatId(phone) {
    return `${String(phone).replace(/\D/g, '')}@c.us`
}

function isStopText(body) {
    return /^\s*(stop|unsubscribe|cancel)\s*[.!]*$/i.test(String(body || ''))
}

function waitForReady(client) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('WhatsApp Web did not become ready in time'))
        }, READY_TIMEOUT_MS)

        client.once('ready', () => {
            clearTimeout(timer)
            resolve()
        })
        client.once('auth_failure', (message) => {
            clearTimeout(timer)
            reject(new Error(`WhatsApp auth failed: ${message}`))
        })
        client.once('qr', () => {
            clearTimeout(timer)
            reject(new Error('WhatsApp session needs a QR scan. Run npm run whatsapp-login locally and save BROWSERBASE_WHATSAPP_CONTEXT_ID.'))
        })
    })
}

export async function withWhatsAppClient(contextId, fn) {
    if (!contextId) {
        throw new Error('BROWSERBASE_WHATSAPP_CONTEXT_ID is required')
    }
    const { bb, session } = await createBrowserbaseSession({
        contextId,
        persist: true,
        timeout: 840,
    })
    console.log(`WhatsApp session ${session.id}: https://browserbase.com/sessions/${session.id}`)

    let debugUrl = ''
    try {
        const debug = await bb.sessions.debug(session.id)
        debugUrl = debug?.debuggerFullscreenUrl || debug?.debuggerUrl || ''
        if (debugUrl) {
            console.log(`Live view: ${debugUrl}`)
        }
    } catch {
        // debug endpoint is optional
    }

    const client = new Client({
        puppeteer: {
            browserWSEndpoint: session.connectUrl,
        },
    })

    try {
        const ready = waitForReady(client)
        await client.initialize()
        await ready
        return await fn(client, { session, debugUrl })
    } finally {
        try {
            await client.destroy()
        } catch {
            // ignore
        }
    }
}

export async function applyStopReplies(client, subscribers) {
    const stopped = []
    for (const subscriber of subscribers) {
        try {
            const chat = await client.getChatById(toChatId(subscriber.phone))
            const messages = await chat.fetchMessages({ limit: 8 })
            const inbound = messages.filter((message) => !message.fromMe)
            if (inbound.some((message) => isStopText(message.body))) {
                await markUnsubscribed(subscriber.phone)
                stopped.push(subscriber.phone)
                console.log(`Unsubscribed ${subscriber.phone} after STOP`)
            }
        } catch {
            // chat may not exist yet
        }
    }
    return new Set(stopped)
}

export async function sendConcertMessages(client, messages) {
    for (const item of messages) {
        await client.sendMessage(toChatId(item.phone), item.body)
        console.log(`Sent concert list to ${item.phone}`)
        await new Promise((resolve) => setTimeout(resolve, SEND_GAP_MS))
    }
}
