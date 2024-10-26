import './Home.css'
import self_pic from './self_pic.png'
import  { useEffect } from 'react'

export default function Home() {
    // useEffect(() => {
    //     document.getElementById('Home-h1').classList.add('Home-animation')
    //     document.getElementById('Home-div').classList.add('Home-animation')
    //     document.getElementById('Home-img').classList.add('Home-animation')
    // }, [])
    return (
        <div className='Home-container' id='Home-container'>
            <h1 className='Home-h1' id='Home-h1'>Welcome!</h1>
            <img src={self_pic} alt='Self portrait' id='Home-img'></img>
            <div className='Home-div' id='Home-div'>
                <p className='Home-about'>
                <br />
                    Thanks for visiting my website!

                    I am a student at Oregon State University, getting a degree in computer science. I am seeking
                    a software engineering internship for summer 2025 in the San Francisco Bay Area. Special interests
                    of mine include algorithm development, efficient system infrastructure, and optimizing the user 
                    experience.

                    I have a previous degree in Finance from Santa Clara University, and currently am a senior
                    technology consultant at KPMG within the cybersecurity and technology risk practice. I have
                    professional experience in large scale data engineering, cybersecurity best practices, and 
                    IT control design.

                    For more in depth information about my skills and experience, please visit the Projects or Resume 
                    page of this site.
                </p>
            </div>
        </div>
    )
}