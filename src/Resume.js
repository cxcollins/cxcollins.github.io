import resume from './resume.pdf'
import './Resume.css'
import { useEffect } from 'react'

export default function Resume() {
    useEffect(() => {
        document.getElementById('Resume-h1').classList.add('animation')
        document.getElementById('Resume-div').classList.add('animation')
    })
    return (
        <div>
            <div className='Resume-container'>
                <h2 className='Resume-h1' id='Resume-h1'>Resume</h2>
                <div className='iframe-container' id='Resume-div'>
                    <iframe title='document_resume' src={resume} className='iframe' 
                    type='application/pdf'>Test</iframe>`
                </div>
            </div>
        </div>
    )
}