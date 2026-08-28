import { createBrowserbaseSession } from './search-concerts.mjs'
import { Client } from 'whatsapp-web.js'

const existingId = process.env.BROWSERBASE_WHATSAPP_CONTEXT_ID
let contextId = existingId

if (!contextId) {
    const { Browserbase } = await import('@browserbasehq/sdk')
    const apiKey = process.env.BROWSERBASE_API_KEY
    if (!apiKey) {
        throw new Error('BROWSERBASE_API_KEY is required')
    }
    const bb = new Browserbase({ apiKey })
    const context = await bb.contexts.create({
        ...(process.env.BROWSERBASE_PROJECT_ID ? { projectId: process.env.BROWSERBASE_PROJECT_ID } : {}),
        name: `whatsapp-concert-alerts-${Date.now()}`,
    })
    contextId = context.id
    console.log('\nCreated Browserbase context.')
    console.log(`Save this as BROWSERBASE_WHATSAPP_CONTEXT_ID:\n  ${contextId}\n`)
}

const { bb, session } = await createBrowserbaseSession({
    contextId,
    persist: true,
    timeout: 840,
})

console.log(`Session: https://browserbase.com/sessions/${session.id}`)
try {
    const debug = await bb.sessions.debug(session.id)
    const live = debug?.debuggerFullscreenUrl || debug?.debuggerUrl
    if (live) {
        console.log(`Scan the WhatsApp QR in this live view:\n  ${live}\n`)
    }
} catch {
    console.log('Open the session URL above and use Live View to scan the QR.')
}

const client = new Client({
    puppeteer: {
        browserWSEndpoint: session.connectUrl,
    },
})

client.on('qr', () => {
    console.log('QR is ready in the Browserbase live view. Scan it with your personal WhatsApp.')
})

await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
        reject(new Error('Timed out waiting for WhatsApp login'))
    }, 14 * 60 * 1000)
    client.once('ready', () => {
        clearTimeout(timer)
        console.log('WhatsApp is logged in. Future jobs can reuse this context.')
        resolve()
    })
    client.once('auth_failure', (message) => {
        clearTimeout(timer)
        reject(new Error(message))
    })
    client.initialize().catch(reject)
})

await client.destroy()
console.log(`\nBROWSERBASE_WHATSAPP_CONTEXT_ID=${contextId}`)
process.exit(0)
