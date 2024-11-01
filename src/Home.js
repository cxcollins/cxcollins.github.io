import './Home.css'
import self_pic from './self_pic.png'

export default function Home() {
    return (
        <div className='homeContainer' id='homeContainer'>
            <h1 className='homeH1' id='homeH1'>Welcome!</h1>
            <img src={self_pic} alt='Self portrait' id='homeImg'></img>
            <div className='homeDiv' id='homeDiv'>
                <p className='homeAbout'>
                <br />
                    Thanks for visiting my website!

                    I am a student at Oregon State University, getting a degree in computer science. I am seeking
                    a software engineering internship for summer 2025 in the San Francisco Bay Area. Special interests
                    of mine include algorithm development, efficient system infrastructure, and optimizing the user 
                    experience.

                    <br></br>
                    <br></br>

                    I have a previous degree in Finance from Santa Clara University, and currently am a senior
                    technology consultant at KPMG within the cybersecurity and technology risk practice. I have
                    professional experience in large scale data engineering, cybersecurity best practices, and 
                    IT control design.

                    <br></br>
                    <br></br>

                    For more in depth information about my skills and experience, please visit the Projects or Resume 
                    page of this site.
                </p>
            </div>
        </div>
    )
}
