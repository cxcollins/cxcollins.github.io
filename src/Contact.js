import './Contact.css'
import { useState, useEffect } from 'react'
import { sendForm } from '@emailjs/browser'

export default function Contact() {
    useEffect(() => {
        document.getElementById('Contact-container').classList.add('animation')
    }, [])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [emailed, setEmailed] = useState(false)

    const handleChange = ( {target: t}) => {
        if(t.id === 'name') {
            setName(t.value)
        }
        else if(t.id === 'email') {
            setEmail(t.value)
        }
        else if(t.id === 'phone') {
            setPhone(t.value)
        }
        else if(t.id === 'message') {
            setMessage(t.value)
        }
    }

    const service_id = 'service_ucimbb8'
    const template_id = 'template_ikfcge9'
    const public_key = 'TTRHObUJ9BQtISqyI'

    const sendEmail = (e) => {
        e.preventDefault()

        sendForm(service_id, template_id, ('#form'), public_key)
          .then((result) => {
              console.log(result)
          }, (err) => {
              console.log(err)
          })

        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setEmailed(true)
      }

    return (
        <div className='Page-container'>
            <h1 className='Contact-h1'>Contact me!</h1>
            <div className='Contact-container' id='Contact-container'>
                <form id='form' onSubmit={sendEmail} className='Form'>
                        <label htmlFor='name'>Name: </label>
                        <input id='name' placeholder='required' type='text' value={name} name='name' onChange={handleChange} required></input>
                        <label htmlFor='email'>Email: </label>
                        <input id='email' type='email' placeholder='required' value={email} name='email' onChange={handleChange} required></input>
                        <label htmlFor='phone'>Phone number: </label>
                        <input id='phone' type='tel' value={phone} name='phone' onChange={handleChange} placeholder='optional'></input>
                        <label htmlFor='message'>Message: </label>
                        <textarea id='message' value={message} name='message' onChange={handleChange} placeholder='required' required></textarea>
                    <button type='submit'>Submit</button>
                    {emailed && <p>Thanks for reaching out! I will be in touch with you shortly.</p>}
                </form>
            </div>
        </div>
    )
}