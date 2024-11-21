import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
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
            <p>This script runs daily at noon, and will send an email alert if there is a change. Note that only 'Wanna get away' tickets are supported.</p>
            <div className='Southwest-container' id='Southwest-container'>
                <form id='SwForm' onSubmit={(e) => { e.preventDefault()}}>
                    <div className='formUnit'>
                    <label htmlFor='pricePaid'>How much did you pay for your flight? </label>
                    <input className='SwInput' id='pricePaid' type='number' value={pricePaid} onChange={handleChange} required></input>
                    </div>
                    <fieldset id='departureDetails'>
                        <legend>
                            Departure details
                        </legend>
                        <div className='formUnit'>
                        <label htmlFor='departureDate'>Departure date:</label>
                        {/* <DatePicker id='departureDate' selected={departureDate} onChange={handleChange} className='SwInput' required /> */}
                        <input className='SwInput' id='departureDate' type='date' value={departureDate} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                        <label htmlFor='departureTime'>Departure time: </label>
                        <input className='SwInput' id='departureTime' placeholder='HH:MM' type='text' value={departureTime} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                        <label htmlFor='departureMeridiem'>AM/PM: </label>
                        <input className='SwInput' id='departureMeridiem' placeholder='AM or PM' type='text' value={departureMeridiem} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='arrivalTime'>Arrival time: </label>
                            <input className='SwInput' id='arrivalTime' placeholder='HH:MM' type='text' value={arrivalTime} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='arrivalMeridiem'>AM/PM: </label>
                            <input className='SwInput' id='arrivalMeridiem' placeholder='AM or PM' type='text' value={arrivalMeridiem} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='departureAirport'>Departure airport code: </label>
                            <input className='SwInput' id='departureAirport' placeholder='SFO' type='text' value={departureAirport} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='arrivalAirport'>Arrival airport code: </label>
                            <input className='SwInput' id='arrivalAirport' placeholder='BOS' type='text' value={arrivalAirport} onChange={handleChange} required></input>
                            </div>
                        <label htmlFor='roundtrip'>Roundtrip
                            <input className='SwRadio' type='radio' id='roundtrip' name='roundtrip' value='roundtrip' checked={roundtrip === 'roundtrip'} onChange={handleRadioChange} />
                        </label>
                        <label htmlFor='oneway'>Oneway
                            <input className='SwRadio' type='radio' id='oneway' name='roundtrip' value='oneway' checked={roundtrip === 'oneway'} onChange={handleRadioChange}/>
                        </label>
                    </fieldset>

                    {roundtrip === 'roundtrip' && (<fieldset id='roundtripDetails'>
                        <legend>Return flight details</legend>
                        <div className='formUnit'>
                            <label htmlFor='returnDate'>Departure date:</label>
                            <input className='SwInput' id='returnDate' type='date' value={returnDate} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='returnDepartureTime'>Departure time: </label>
                            <input className='SwInput' id='returnDepartureTime' placeholder='HH:MM' type='text' value={returnDepartureTime} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='returnDepartureMeridiem'>AM/PM: </label>
                            <input className='SwInput' id='returnDepartureMeridiem' placeholder='AM or PM' type='text' value={returnDepartureMeridiem} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='returnArrivalTime'>Arrival time: </label>
                            <input className='SwInput' id='returnArrivalTime' placeholder='HH:MM' type='text' value={returnArrivalTime} onChange={handleChange} required></input>
                        </div>
                        <div className='formUnit'>
                            <label htmlFor='returnArrivalMeridiem'>AM/PM: </label>
                            <input className='SwInput' id='returnArrivalMeridiem' placeholder='HH:MM' type='text' value={returnArrivalMeridiem} onChange={handleChange} required></input>
                        </div>
                    </fieldset>)}
                    <div className='formUnit'>
                        <label htmlFor='email'>What email would you like to be contacted at? </label>
                        <input className='SwInput' id='email' placeholder='username@example.com' type='email' value={email} onChange={handleChange} required></input>
                    <button type="submit" onClick={addFlight} className='swButton'>Submit</button>
                    </div>
                    </form>
            </div>
        </div>
    )
}