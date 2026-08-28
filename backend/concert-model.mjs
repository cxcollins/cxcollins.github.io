import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '.env') })
dotenv.config()

const uri = process.env.MONGODB_CONNECT_STRING
if (!uri) {
    throw new Error('MONGODB_CONNECT_STRING is required')
}

if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri)
}

const showSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, default: '' },
    notifiedAt: { type: Date, default: Date.now },
}, { _id: false })

const subscriberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    locationKey: { type: String, required: true, index: true },
    active: { type: Boolean, default: true },
    consentAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    lastNotifiedAt: { type: Date },
    lastShows: { type: [showSchema], default: [] },
})

const Subscriber = mongoose.models.ConcertSubscriber || mongoose.model('ConcertSubscriber', subscriberSchema)

export function normalizeLocation(location) {
    return location.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function normalizePhone(raw) {
    const trimmed = String(raw || '').trim()
    const compact = trimmed.replace(/[^\d+]/g, '')
    if (/^\+[1-9]\d{7,14}$/.test(compact)) {
        return compact
    }
    const digits = trimmed.replace(/\D/g, '')
    if (digits.length === 10) {
        return `+1${digits}`
    }
    if (digits.length === 11 && digits.startsWith('1')) {
        return `+${digits}`
    }
    return null
}

export async function upsertSubscriber({ name, phone, location }) {
    const locationKey = normalizeLocation(location)
    return Subscriber.findOneAndUpdate(
        { phone },
        {
            name: name.trim(),
            phone,
            location: location.trim(),
            locationKey,
            active: true,
            consentAt: new Date(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

export async function findActiveSubscribers() {
    return Subscriber.find({ active: true }).lean()
}

export async function markUnsubscribed(phone) {
    return Subscriber.findOneAndUpdate(
        { phone },
        { active: false },
        { new: true }
    )
}

export async function recordNotified(phone, shows) {
    const lastShows = shows.slice(0, 20).map((show) => ({
        title: show.title,
        link: show.link || '',
        notifiedAt: new Date(),
    }))
    return Subscriber.findOneAndUpdate(
        { phone },
        { lastNotifiedAt: new Date(), lastShows },
        { new: true }
    )
}

export function showAlreadySent(subscriber, show) {
    const previous = subscriber.lastShows || []
    return previous.some((item) => {
        if (show.link && item.link && show.link === item.link) {
            return true
        }
        return item.title && show.title && item.title === show.title
    })
}

export default Subscriber
