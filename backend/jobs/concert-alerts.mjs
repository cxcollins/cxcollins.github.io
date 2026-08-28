import mongoose from 'mongoose'
import {
    findActiveSubscribers,
    recordNotified,
    showAlreadySent,
} from '../concert-model.mjs'
import { formatWhatsAppMessage, searchCheapConcerts } from './search-concerts.mjs'
import { applyStopReplies, sendConcertMessages, withWhatsAppClient } from './whatsapp-send.mjs'

function groupByCity(subscribers) {
    const groups = new Map()
    for (const subscriber of subscribers) {
        const key = subscriber.locationKey || subscriber.location.trim().toLowerCase()
        if (!groups.has(key)) {
            groups.set(key, [])
        }
        groups.get(key).push(subscriber)
    }
    return groups
}

async function buildOutgoing(subscribers) {
    const outgoing = []
    const groups = groupByCity(subscribers)

    for (const [, people] of groups) {
        const location = people[0].location
        let shows = []
        try {
            shows = await searchCheapConcerts(location)
            console.log(`Found ${shows.length} cheap shows for ${location}`)
        } catch (error) {
            console.error(`Search failed for ${location}:`, error.message)
            continue
        }
        if (!shows.length) {
            continue
        }

        for (const subscriber of people) {
            const fresh = shows.filter((show) => !showAlreadySent(subscriber, show))
            if (!fresh.length) {
                continue
            }
            outgoing.push({
                phone: subscriber.phone,
                shows: fresh,
                body: formatWhatsAppMessage(subscriber.name, subscriber.location, fresh),
            })
        }
    }

    return outgoing
}

async function run() {
    const subscribers = await findActiveSubscribers()
    if (!subscribers.length) {
        console.log('No active concert subscribers')
        return
    }

    const outgoing = await buildOutgoing(subscribers)
    const contextId = process.env.BROWSERBASE_WHATSAPP_CONTEXT_ID

    await withWhatsAppClient(contextId, async (client) => {
        const stopped = await applyStopReplies(client, subscribers)
        const toSend = outgoing.filter((item) => !stopped.has(item.phone))
        if (!toSend.length) {
            console.log('Nothing to send after search/STOP filter')
            return
        }
        await sendConcertMessages(client, toSend)
        for (const item of toSend) {
            await recordNotified(item.phone, item.shows)
        }
    })
}

try {
    await run()
} catch (error) {
    console.error(error)
    process.exitCode = 1
} finally {
    await mongoose.disconnect().catch(() => {})
}
