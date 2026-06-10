import './Home.css'
import self_pic from './self_pic.png'

export default function Home() {
    return (
        <div className='pageShell homePage'>
            <header className='pageHero'>
                <span className='pageHeroEyebrow'>Portfolio</span>
                <h1>Welcome!</h1>
                <p /* className='pageHeroSub' */>
                    Computer science student · Software engineering & cybersecurity profressional
                </p>
            </header>
            <div className='homeIntro'>
                <div className='homeImageWrap pageCard'>
                    <img src={self_pic} alt='Self portrait' className='homeImg' />
                </div>
                <div className='homeContent pageCard'>
                    <p>
                        Thanks for visiting my website!
                    </p>
                    <p>
                        I am a student at Oregon State University completing a bachelor's degree in computer science. I am currently
                        seeking a software engineering internship for Winter/Spring/Summer 2026, ideally in the San Francisco Bay Area but
                        open to any location. Special interests of mine include algorithm development, distributed system infrastructure, and
                        optimizing the user experience.
                    </p>
                    <p>
                        I have a previous degree in Finance from Santa Clara University, and currently am a Senior
                        Associate at KPMG within the cybersecurity and technology risk practice. I have
                        professional experience in large scale data engineering, cybersecurity best practices, and
                        IT process consulting.
                    </p>
                    <p>
                        In my free time, I love to travel and to be outside. I am an avid skier and surfer and can
                        typically be found in the ocean or on a mountain on the weekends, depending on the season.
                    </p>
                    <p>
                        For more in depth information about my skills and experience, please visit the Projects or Resume
                        page of this site.
                    </p>
                </div>
            </div>
        </div>
    )
}
