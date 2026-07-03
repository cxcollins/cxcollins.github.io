import './Projects.css'
import football from './football.png'
import thesis_ss from './thesis_ss.png'
import ollama from './ollama.jpg'
import workout from './workout.jpg'
const TERMS_URL = `${process.env.PUBLIC_URL}/terms_of_service.pdf`
const PRIVACY_URL = `${process.env.PUBLIC_URL}/privacy_policy.pdf`

const projects = [
    {
        title: 'Undergraduate Thesis',
        href: 'https://www.dropbox.com/s/66snwc6hiyqj7ig/Thesis%20Draft.docx?dl=0',
        tag: 'Research',
        description: 'Finding Wisdom in the Crowd: How Stock Market Returns can be Effectively Predicted Using Twitter Sentiment and Past Return Data',
        image: thesis_ss,
    },
    {
        title: 'Browser History Summarizer',
        href: 'https://github.com/cxcollins/garden-simulator',
        tag: 'Distributed Systems',
        description: 'Scalable distributed system to process and summarize user browser history with locally powered LLM, orchestrating multiple containerized workers via RabbitMQ for fault-tolerant message queuing and horizontal parallelism',
        image: ollama,
    },
    {
        title: 'Workout Tracker Web App',
        href: 'https://github.com/cxcollins/workout_tracker_webapp',
        tag: 'Web App',
        description: 'Web application that allows users to log in with their name, upload workout information, and save their history. Currently under development, future features to include finding other users and trend analysis.',
        image: workout,
    },
    {
        title: 'Fantasy Scraper Chrome extension',
        href: 'https://github.com/cxcollins/fantasy_football_scraper',
        tag: 'Extension',
        description: "Simple Chrome add-on that scrapes statistics on any team's defense. Built to avoid multiple tabs when looking at my fantasy team.",
        image: football,
    },
]

export default function Projects() {
    return (
        <div className='pageShell projectsPage'>
            <header className='pageHero'>
                <span className='pageHeroEyebrow'>Work</span>
                <h2>Projects</h2>
                <p className='pageHeroSub'>Selected builds across research, infrastructure, and full-stack development.</p>
            </header>

            <div className='projectGrid'>
                {projects.map((project) => (
                    <article key={project.title} className='projectCard pageCard'>
                        <a href={project.href} className='projectCardLink' target='_blank' rel='noopener noreferrer'>
                            <span className='sectionLabel'>{project.tag}</span>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <img src={project.image} alt={`${project.title} preview`} />
                        </a>
                    </article>
                ))}
            </div>

            <div className='projectsFooter pageCard'>
                <p>
                    To view other projects (like the source code for this site), visit my{' '}
                    <a href='https://github.com/cxcollins'>Github</a> or my{' '}
                    <a href='https://linkedin.com/in/connorxcollins'>LinkedIn!</a>
                </p>
                <div className='legalLinks'>
                    <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">Terms of Service</a>
                    <span className='legalSeparator'>·</span>
                    <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </div>
            </div>
        </div>
    )
}
