import resume from './Connor_Collins_resume.pdf'
import './Resume.css'

export default function Resume() {
    return (
        <div className='pageShell resumePage'>
            <header className='pageHero'>
                <span className='pageHeroEyebrow'>Experience</span>
                <h2>
                    <a className='resumeA' href={resume} download>Resume</a>
                </h2>
                <p className='pageHeroSub'>Download or view below.</p>
            </header>
            <div className='iframeContainer pageCard' id='resumeDiv'>
                <iframe title='documentResume' src={resume} className='iframe'
                type='application/pdf'></iframe>
            </div>
        </div>
    )
}
