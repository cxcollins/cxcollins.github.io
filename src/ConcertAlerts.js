import { useState } from 'react'
import './ConcertAlerts.css'

const apiBase = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '')

function normalizePhone(raw) {
    const trimmed = raw.trim()
    const digits = trimmed.replace(/[^\d+]/g, '')
    if (/^\+[1-9]\d{7,14}$/.test(digits)) {
        return digits
    }
    const justDigits = trimmed.replace(/\D/g, '')
    if (justDigits.length === 10) {
        return `+1${justDigits}`
    }
    if (justDigits.length === 11 && justDigits.startsWith('1')) {
        return `+${justDigits}`
    }
    return null
}

export default function ConcertAlerts() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [consent, setConsent] = useState(false)
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const normalizedPhone = normalizePhone(phone)
        if (!normalizedPhone) {
            setError('Enter a valid WhatsApp number, like +15551234567.')
            return
        }
        if (!consent) {
            setError('Please confirm you want twice-weekly concert texts.')
            return
        }

        setStatus('submitting')
        try {
            const response = await fetch(`${apiBase}/concert-alerts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: normalizedPhone,
                    location: location.trim(),
                    consent: true,
                }),
            })
            const data = await response.json().catch(() => ({}))
            if (!response.ok) {
                throw new Error(data.Error || data.error || 'Could not subscribe')
            }
            setStatus('success')
            setName('')
            setPhone('')
            setLocation('')
            setConsent(false)
        } catch (err) {
            setStatus('idle')
            setError(err.message || 'Could not subscribe. Try again later.')
        }
    }

    return (
        <div className='pageShell concertAlertsPage'>
            <header className='pageHero'>
                <span className='pageHeroEyebrow'>Tool</span>
                <h1>Cheap concert alerts</h1>
                <p className='pageHeroSub'>Twice a week, get a WhatsApp list of inexpensive shows near you.</p>
            </header>
            <div className='concertAlertsCard pageCard'>
                <p>
                    Sign up with the WhatsApp number you want texts on. A few days before the first list,
                    save my number and reply <strong>YES</strong> if WhatsApp asks. Text <strong>STOP</strong> anytime to unsubscribe.
                </p>
                <form className='concertForm' onSubmit={handleSubmit}>
                    <label htmlFor='concert-name'>Name</label>
                    <input
                        id='concert-name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Alex'
                        autoComplete='name'
                        required
                    />

                    <label htmlFor='concert-phone'>WhatsApp phone</label>
                    <input
                        id='concert-phone'
                        type='tel'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='+1 555 123 4567'
                        autoComplete='tel'
                        required
                    />

                    <label htmlFor='concert-location'>City</label>
                    <input
                        id='concert-location'
                        type='text'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder='Portland, OR'
                        autoComplete='address-level2'
                        required
                    />

                    <label className='concertConsent' htmlFor='concert-consent'>
                        <input
                            id='concert-consent'
                            type='checkbox'
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                        />
                        <span>Text me twice a week with cheap concerts near this city. I can reply STOP to opt out.</span>
                    </label>

                    <button type='submit' disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Signing up…' : 'Get concert texts'}
                    </button>
                    {error && <p className='concertError'>{error}</p>}
                    {status === 'success' && (
                        <p className='concertSuccess'>You are on the list. Watch WhatsApp for the next cheap-show roundup.</p>
                    )}
                </form>
            </div>
        </div>
    )
}
