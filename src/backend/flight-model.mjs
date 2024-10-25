import mongoose from 'mongoose'
import 'dotenv/config'

console.log('MONGODB_CONNECT_STRING:', process.env.MONGODB_CONNECT_STRING);

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
)

//create package.json file

const db = mongoose.connection

const flightSchema = mongoose.Schema({
    pricePaid:                 { type: Number, required: true },
    departureDate:              { type: String, required: true },
    departureTime:              { type: String, required: true },
    departureMeridiem:          { type: String, required: true },
    arrivalTime:                { type: String, required: true },
    arrivalMeridiem:            { type: String, required: true },
    departureAirport:           { type: String, required: true },
    arrivalAirport:             { type: String, required: true },
    roundtrip:                  { type: String, required: true},
    returnDate:                 { type: String },
    returnDepartureTime:        { type: String },
    returnDepartureMeridiem:    { type: String },
    returnArrivalTime:          { type: String },
    returnArrivalMeridiem:      { type: String },
    email:                      { type: String, required: true },
})

const flights = mongoose.model('Flights', flightSchema)

// Create method
export default async function createFlight(pricePaid, departureDate, departureTime, departureMeridiem, arrivalTime, arrivalMeridiem, departureAirport, arrivalAirport, roundtrip, returnDate, returnDepartureTime, returnDepartureMeridiem, returnArrivalTime, returnArrivalMeridiem, email) {
    const flight = new flights({
    pricePaid: pricePaid,
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
