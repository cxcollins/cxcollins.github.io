import { useState, useEffect } from 'react'

export default function Southwest() {

    const [departureTime, setDepartureTime] = useState('')
    const [departureMeridiem, setDepartureMeridiem] = useState('')
    const [arrivalTime, setArrivalTime] = useState('')
    const [arrivalTimeMeridiem, setArrivalTimeMeridiem] = useState('')
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')
    const [ticketClass, setTicketClass] = useState('wga')
    const [returnDepartureTime, setReturnDepartureTime] = useState('')
    const [returnDepartureMeridiem, setReturnDepartureMeridiem] = useState('')
    const [returnArrivalTime, setReturnArrivalTime] = useState('')
    const [returnArrivalTimeMeridiem, setReturnArrivalTimeMeridiem] = useState('')
    const [returnTicketClass, setReturnTicketClass] = useState('wga')
    const [roundtrip, setRoundtrip] = useState('oneway')

    const handleRadioChange = (e) => {
        setRoundtrip(e.target.value)
    }

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
        if(t.id === 'returnDepartureTime') {
            setReturnDepartureTime(t.value)
        }
        if(t.id === 'returnDepartureMeridiem') {
            setReturnDepartureMeridiem(t.value)
        }
        if(t.id === 'returnArrivalTime') {
            setReturnArrivalTime(t.value)
        }
        if(t.id === 'returnArrivalTimeMeridiem') {
            setReturnArrivalTimeMeridiem(t.value)
        }
        if(t.id === 'returnTicketClass') {
            setReturnTicketClass(t.value)
        }
    }

    // Need to add submit event
    // Need to create mongo backend
    return (
        <div className='Page-container'>
            <h1 className='Southwest-h1'>Southwest Price Change Alert</h1>
            <p>Enter your flight info to be alerted if your flight drops below what you paid for it. Since Southwest will allow you to rebook and pocket the difference, it is worth checking everyday for a change in price.</p>
            <p>This script runs twice a day (at noon and midnight), and will send an email alert if there is a change.</p>
            <div className='Southwest-container' id='Southwest-container'>
                {/* Add on submit function */}
                <form id='form'>
                    <label htmlFor='departureTime'>Departure time: </label>
                    <input id='departureTime' placeholder='HH:MM' type='text' value={departureTime} onChange={handleChange} required></input>
                    <label htmlFor='departureMeridiem'>AM/PM: </label>
                    <input id='departureMeridiem' placeholder='AM or PM' type='text' value={departureMeridiem} onChange={handleChange} required></input>
                    <label htmlFor='arrivalTime'>Arrival time: </label>
                    <input id='arrivalTime' placeholder='HH:MM' type='text' value={arrivalTime} onChange={handleChange} required></input>
                    <label htmlFor='arrivalTimeMeridiem'>AM/PM: </label>
                    <input id='arrivalTimeMeridiem' placeholder='HH:MM' type='text' value={arrivalTimeMeridiem} onChange={handleChange} required></input>
                    <label htmlFor='departureAirport'>Departure airport code: </label>
                    <input id='departureAirport' placeholder='SFO' type='text' value={departureAirport} onChange={handleChange} required></input>
                    <label htmlFor='arrivalAirport'>Arrival airport code: </label>
                    <input id='arrivalAirport' placeholder='BOS' type='text' value={arrivalAirport} onChange={handleChange} required></input>
                    <label htmlFor='ticketClass'>Ticket class: </label>
                    <select id='ticketClass' value={ticketClass} onChange={handleChange} required>
                        <option value='bs'>Business select</option>
                        <option value='anytime'>Anytime</option>
                        <option value='wgap'>Wanna get away plus</option>
                        <option value='wga' default>Wanna get away</option>
                    </select>
                    <fieldset>
                        <legend>
                            Roundtrip?
                        </legend>
                    <label htmlFor='roundtrip'>Roundtrip
                        <input type='radio' id='roundtrip' name='roundtrip' value='roundtrip' checked={roundtrip === 'roundtrip'} onChange={handleRadioChange} />
                    </label>
                    <label htmlFor='oneway'>Oneway
                        <input type='radio' id='oneway' name='roundtrip' value='oneway' checked={roundtrip === 'oneway'} onChange={handleRadioChange}/>
                    </label>
                    <button type='submit'>Submit</button>
                    </fieldset>

                    {roundtrip === 'roundtrip' && (<fieldset id='roundtripDetails'>
                        <legend>Return flight details</legend>

                        <label htmlFor='returnDepartureTime'>Departure time: </label>
                        <input id='returnDepartureTime' placeholder='HH:MM' type='text' value={returnDepartureTime} onChange={handleChange} required></input>
                        <label htmlFor='returnDepartureMeridiem'>AM/PM: </label>
                        <input id='returnDepartureMeridiem' placeholder='AM or PM' type='text' value={returnDepartureMeridiem} onChange={handleChange} required></input>
                        <label htmlFor='returnArrivalTime'>Arrival time: </label>
                        <input id='returnArrivalTime' placeholder='HH:MM' type='text' value={returnArrivalTime} onChange={handleChange} required></input>
                        <label htmlFor='returnArrivalTimeMeridiem'>AM/PM: </label>
                        <input id='returnArrivalTimeMeridiem' placeholder='HH:MM' type='text' value={returnArrivalTimeMeridiem} onChange={handleChange} required></input>
                        <label htmlFor='ticketClass'>Ticket class: </label>
                        <select id='returnTicketClass' value={returnTicketClass} onChange={handleChange} required>
                            <option value='bs'>Business select</option>
                            <option value='anytime'>Anytime</option>
                            <option value='wgap'>Wanna get away plus</option>
                            <option value='wga' default>Wanna get away</option>
                        </select>
                    </fieldset>)}
                </form>
            </div>
        </div>
    )
}