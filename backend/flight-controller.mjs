import cors from 'cors'
import express from 'express'
import createFlight from './flight-model.mjs'
import { normalizePhone, upsertSubscriber } from './concert-model.mjs'

const app = express()
app.use(express.json())
app.use(cors({
    origin: [
        'https://connorxcollins.com',
        'https://www.connorxcollins.com',
        'http://localhost:3000',
        'http://localhost:3001',
    ],
}))

app.post('/flight-checker', (req, res) => {
    createFlight(
        req.body.pricePaid,
        req.body.departureDate,
        req.body.departureTime,
        req.body.departureMeridiem,
        req.body.arrivalTime,
        req.body.arrivalMeridiem,
        req.body.departureAirport,
        req.body.arrivalAirport,
        req.body.roundtrip,
        req.body.returnDate,
        req.body.returnDepartureTime,
        req.body.returnDepartureMeridiem,
        req.body.returnArrivalTime,
        req.body.returnArrivalMeridiem,
        req.body.email
    )
    .then(flight => {
        console.log(`"Flight for ${flight.email} added to collection.`)
        res.status(201).json(flight)
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({ Error: 'Couldn\'t add to collection'})
    })
})

app.post('/concert-alerts', async (req, res) => {
    try {
        const name = String(req.body.name || '').trim()
        const location = String(req.body.location || '').trim()
        const phone = normalizePhone(req.body.phone)
        const consent = req.body.consent === true || req.body.consent === 'true'

        if (!name || !location || !phone) {
            return res.status(400).json({ Error: 'Name, valid WhatsApp phone, and location are required' })
        }
        if (!consent) {
            return res.status(400).json({ Error: 'Consent is required' })
        }

        const subscriber = await upsertSubscriber({ name, phone, location })
        res.status(201).json({
            ok: true,
            name: subscriber.name,
            phone: subscriber.phone,
            location: subscriber.location,
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ Error: 'Couldn\'t add subscriber' })
    }
})

// Everything below here will have to be updated once uploaded to Vercel

export default app

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
