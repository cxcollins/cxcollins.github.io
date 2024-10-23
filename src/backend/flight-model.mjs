import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
)

const db = mongoose.connection

const flightSchema = mongoose.Schema({
    price_paid:                 { type: Number, required: true },
    departureDate:              { type: String, required: true },
    departureTime:              { type: String, required: true },
    departureMeridiem:          { type: String, required: true },
    arrivalTime:                { type: String, required: true },
    arrivalMeridiem:            { type: String, required: true },
    departureAirport:           { type: String, required: true },
    arrivalAirport:             { type: String, required: true },
    roundtrip:                  { type: Boolean, required: true},
    returnDate:                 { type: string },
    returnDepartureTime:        { type: string },
    returnDepartureMeridiem:    { type: string },
    returnArrivalTime:          { type: string },
    returnArrivalMeridiem:      { type: string },
    email:                      { type: string, required: true },
})

const flights = mongoose.model('Flights', flightSchema)

// Create method
export default async function createFlight(price_paid, departureDate, departureTime, departureMeridiem, arrivalTime, arrivalMeridiem, departureAirport, arrivalAirport, roundtrip, returnDate, returnDepartureTime, returnDepartureMeridiem, returnArrivalTime, returnArrivalMeridiem, email) => {
    const flight = new flights({
    price_paid: price_paid,
    departureDate: departureDate,
    departureTime: departureTime,
    departureMeridiem: departureMeridiem,
    arrivalTime: arrivalTime,
    arrivalMeridiem: arrivalMeridiem,
    departureAirport: departureAirport,
    arrivalAirport: arrivalAirport,
    roundtrip: roundtrip,
    returnDate: returnDate,
    returnDepartureTime: returnDepartureTime,
    returnDepartureMeridiem: returnDepartureMeridiem,
    returnArrivalTime: returnArrivalTime,
    returnArrivalMeridiem: returnArrivalMeridiem,
    email: email})

    return flight.save()
}
