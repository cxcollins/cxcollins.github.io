import './Projects.css'
import football from './football.png'
import thesis_ss from './thesis_ss.png'

export default function Projects() {
    return (
        <div className="projectsPageContainer">
            <h2 className='projectsH2' id='rojectsH2'>Projects</h2>
            <div className="projectsContainer" id='projectsContainer'>
                <div className="thesisContainer">
                    <a href='https://www.dropbox.com/s/66snwc6hiyqj7ig/Thesis%20Draft.docx?dl=0'>
                    <h2>Undergraduate Thesis</h2>
                    </a>
                    <p>Finding Wisdom in the Crowd: How Stock Market Returns can be Effectively Predicted Using 
                    Twitter Sentiment and Past Return Data</p>
                    <img src={thesis_ss}></img>
                </div>
                <div className="scraperContainer">
                    <a href='https://github.com/cxcollins/fantasy_football_scraper'>
                    <h2>Fantasy Scraper Chrome extension</h2>
                    </a>
                    <p>Simple Chrome add-on that scrapes statistics on any team's defense.
                    Built to avoid multiple tabs when looking at my fantasy team.</p>
                    <img src={football}></img>
                </div>
            </div>
                <div className='restPage' id='restPage'>
                    <p>
                        To view other projects (like the source code for this site), visit my <a href='
                        https://github.com/cxcollins'>Github</a> or
                        my <a href='https://linkedin.com/in/connorxcollins'>LinkedIn!</a>
                    </p>
                </div>
        </div>
    )
}