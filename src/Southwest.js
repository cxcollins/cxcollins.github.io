import { useState, useEffect } from 'react'

export default function Southwest {

    const [departureTime, setDepartureTime] = useState('')
    const [departureMeridiem, setDepartureMeridiem] = useState('')
    const [arrivalTime, setArrivalTime] = useState('')
    const [arrivalTimeMeridiem, setArrivalTimeMeridiem] = useState('')
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')
    const [ticketClass, setTicketClass] = useState('')

    const handleChange = ( {target: t} ) => {
        if(t.id === 'departureTime') {
            setDepartureTime(t.value)
        }
        if(t.id === 'departureMeridiem') {
            setDepartureMeridiem(t.value)
        }
        if(t.id === 'arrivalTime') {
            setArrivalTime(t.value)
        }
        if(t.id === 'arrivalTimeMeridiem') {
            setArrivalTimeMeridiem(t.value)
        }
        if(t.id === 'departureAirport') {
            setDepartureAirport(t.value)
        }
        if(t.id === 'arrivalAirport') {
            setArrivalAirport(t.value)
        }
        if(t.id === 'ticketClass') {
            setTicketClass(t.value)
        }
    }
    return (
        <div>
            <div>
                <h1>Submit this form to be alerted if your Southwest flight drops in price</h1>
                <form id='form'>
                    <
                </form>
            </div>
        </div>
    )
}