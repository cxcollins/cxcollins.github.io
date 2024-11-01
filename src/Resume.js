import resume from './resume.pdf'
import './Resume.css'

export default function Resume() {
    return (
        <div>
            <div className='resumeContainer'>
                <h2 className='resumeH1' id='resumeH1'>
                    <a className='resumeA' href={resume} download>Resume</a>
                </h2>
                <div className='iframeContainer' id='resumeDiv'>
                    <iframe title='documentResume' src={resume} className='iframe' 
                    type='application/pdf'>Test</iframe>`
                </div>
            </div>
        </div>
    )
}