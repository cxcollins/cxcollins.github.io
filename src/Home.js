import './Home.css'
import self_pic from './self_pic.png'
import  { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        document.getElementById('Home-h1').classList.add('Home-animation')
        document.getElementById('Home-div').classList.add('Home-animation')
        document.getElementById('Home-img').classList.add('Home-animation')
    }, [])
    return (
        <div className='Home-container' id='Home-container'>
            <h1 className='Home-h1' id='Home-h1'>Welcome!</h1>
            <img src={self_pic} alt='Self portrait' id='Home-img'></img>
            <div className='Home-div' id='Home-div'>
                <p className='Home-about'>
                <br />
                    Thanks for visiting my website! 
                    
                    I am a technology consultant at KPMG, specializing in large scale data engineering and IT 
                    compliance. Over the past few years, I have engaged in professional and educational work that 
                    has given me extensive knowledge of tools like Python and SQL, building data pipelines and 
                    machine learning algorithms.

                    I have a BSc in Finance from Santa Clara, and am also currently earning a BS in Computer
                    Science from Oregon State University. I expect to finish my CS degree by December of 2025.

                    For more in depth information about my skills and experience, please visit the Projects or Resume 
                    page of this site.
                </p>
            </div>
        </div>
    )
}