import { useState, useEffect } from 'react'
import './Southwest.css'

export default function Southwest() {

    const [pricePaid, setPricePaid] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [departureMeridiem, setDepartureMeridiem] = useState('')
    const [arrivalTime, setArrivalTime] = useState('')
    const [arrivalMeridiem, setArrivalMeridiem] = useState('')
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [returnDepartureTime, setReturnDepartureTime] = useState('')
    const [returnDepartureMeridiem, setReturnDepartureMeridiem] = useState('')
    const [returnArrivalTime, setReturnArrivalTime] = useState('')
    const [returnArrivalMeridiem, setReturnArrivalMeridiem] = useState('')
    const [roundtrip, setRoundtrip] = useState('oneway')
    const [email, setEmail] = useState('')

    const handleRadioChange = (e) => {
        setRoundtrip(e.target.value)
    }

    const handleChange = ( {target: t} ) => {

        if(t.id === 'pricePaid') {
            setPricePaid(t.value)
        }
        if(t.id === 'departureDate') {
            setDepartureDate(t.value)
        }
        if(t.id === 'departureTime') {
            setDepartureTime(t.value)
        }
        if(t.id === 'departureMeridiem') {
            setDepartureMeridiem(t.value)
        }
        if(t.id === 'arrivalTime') {
            setArrivalTime(t.value)
        }
        if(t.id === 'arrivalMeridiem') {
            setArrivalMeridiem(t.value)
        }
        if(t.id === 'departureAirport') {
            setDepartureAirport(t.value)
        }
        if(t.id === 'arrivalAirport') {
            setArrivalAirport(t.value)
        }
        if(t.id === 'returnDate') {
            setReturnDate(t.value)
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
        if(t.id === 'returnArrivalMeridiem') {
            setReturnArrivalMeridiem(t.value)
        }
        if(t.id === 'email') {
            setEmail(t.value)
        }
    }

    const addFlight = async() => {
        const newFlight = { pricePaid, departureDate, departureTime, departureMeridiem, arrivalTime, arrivalMeridiem, departureAirport, arrivalAirport, roundtrip, returnDate, returnDepartureTime, returnDepartureMeridiem, returnArrivalTime, returnArrivalMeridiem, email }
        const response = await fetch('/flight-checker', {
            method: 'post',
            body: JSON.stringify(newFlight),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // Need to add submit event
    return (
        <div className='Page-container'>
            <h1 className='Southwest-h1'>Southwest Price Change Alert</h1>
            <p>Enter your flight info to be alerted if your flight drops below what you paid for it. Since Southwest will allow you to rebook and pocket the difference, it is worth checking everyday for a change in price.</p>
            <p>This script runs twice a day (at noon and midnight), and will send an email alert if there is a change. Note that only 'Wanna get away' tickets are supported.</p>
            <div className='Southwest-container' id='Southwest-container'>
                {/* Add on submit function */}
                <form id='form' onSubmit={(e) => { e.preventDefault()}}>
                    <label htmlFor='pricePaid'>How much did you pay for your flight? </label>
                    <input id='pricePaid' type='number' value={pricePaid} onChange={handleChange} required></input>
                    <fieldset id='departureDetails'>
                        <legend>
                            Departure details
                        </legend>
                        <label htmlFor='departureDate'>Departure date:</label>
                        <input id='departureDate' placeholder='1/1/24' type='date' value={departureDate} onChange={handleChange} required></input>
                        <label htmlFor='departureTime'>Departure time: </label>
                        <input id='departureTime' placeholder='HH:MM' type='text' value={departureTime} onChange={handleChange} required></input>
                        <label htmlFor='departureMeridiem'>AM/PM: </label>
                        <input id='departureMeridiem' placeholder='AM or PM' type='text' value={departureMeridiem} onChange={handleChange} required></input>
                        <label htmlFor='arrivalTime'>Arrival time: </label>
                        <input id='arrivalTime' placeholder='HH:MM' type='text' value={arrivalTime} onChange={handleChange} required></input>
                        <label htmlFor='arrivalMeridiem'>AM/PM: </label>
                        <input id='arrivalMeridiem' placeholder='AM or PM' type='text' value={arrivalMeridiem} onChange={handleChange} required></input>
                        <label htmlFor='departureAirport'>Departure airport code: </label>
                        <input id='departureAirport' placeholder='SFO' type='text' value={departureAirport} onChange={handleChange} required></input>
                        <label htmlFor='arrivalAirport'>Arrival airport code: </label>
                        <input id='arrivalAirport' placeholder='BOS' type='text' value={arrivalAirport} onChange={handleChange} required></input>
                        <label htmlFor='roundtrip'>Roundtrip
                            <input type='radio' id='roundtrip' name='roundtrip' value='roundtrip' checked={roundtrip === 'roundtrip'} onChange={handleRadioChange} />
                        </label>
                        <label htmlFor='oneway'>Oneway
                            <input type='radio' id='oneway' name='roundtrip' value='oneway' checked={roundtrip === 'oneway'} onChange={handleRadioChange}/>
                        </label>
                    </fieldset>

                    {roundtrip === 'roundtrip' && (<fieldset id='roundtripDetails'>
                        <legend>Return flight details</legend>
                        <label htmlFor='returnDate'>Departure date:</label>
                        <input id='returnDate' placeholder='1/8/24' type='date' value={returnDate} onChange={handleChange} required></input>
                        <label htmlFor='returnDepartureTime'>Departure time: </label>
                        <input id='returnDepartureTime' placeholder='HH:MM' type='text' value={returnDepartureTime} onChange={handleChange} required></input>
                        <label htmlFor='returnDepartureMeridiem'>AM/PM: </label>
                        <input id='returnDepartureMeridiem' placeholder='AM or PM' type='text' value={returnDepartureMeridiem} onChange={handleChange} required></input>
                        <label htmlFor='returnArrivalTime'>Arrival time: </label>
                        <input id='returnArrivalTime' placeholder='HH:MM' type='text' value={returnArrivalTime} onChange={handleChange} required></input>
                        <label htmlFor='returnArrivalMeridiem'>AM/PM: </label>
                        <input id='returnArrivalMeridiem' placeholder='HH:MM' type='text' value={returnArrivalMeridiem} onChange={handleChange} required></input>
                    </fieldset>)}

                    <label htmlFor='email'>What email would you like to be contacted at? </label>
                    <input id='email' placeholder='username@example.com' type='email' value={email} onChange={handleChange} className='spaced' required></input>
                    <button type="submit" onClick={addFlight}>Submit</button>
                    </form>
            </div>
        </div>
    )
}