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
                    Thanks for visiting my website. I grew up on the East Coast, moved out West to study at Santa
                    Clara University, and currently live in San Francisco. While at school, I studied Finance and
                    Management Information Systems, and have developed a passion for learning new technologies. 
                    Currently, I am a Technology Risk Associate at KPMG, specializing in data engineering and IT 
                    compliance. Over the past few years, I have engaged in work that has given me extensive
                    knowledge of large scale data manipulation using tools like Python and SQL, as well as side
                    projects in Javascript like this website. For more in depth information, please visit the 
                    Projects or Resume page.
                    <br /> <br />
                    Please note that as Github hosts this website as a static site, typing in URL extensions such
                    as cxcollins.github.io/contact will result in a 404 error. I am currently looking at other 
                    options that might better suit the site. 
                </p>
            </div>
        </div>
    )
}