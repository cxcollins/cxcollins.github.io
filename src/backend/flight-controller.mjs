import express from 'express'
import createFlight from './flight-model.mjs'

const app = express()
app.use(express.json())

app.post('/flight-checker', (req, res) => {
    createFlight(
        req.body.price_paid,
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

module.exports = app