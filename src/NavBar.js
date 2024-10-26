import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return(
        <div className='Nav-container'>
            <h2 className='Nav-h2'>Connor Collins</h2>
            <nav className='Nav-nav'>
                <ul className='Nav-ul'>
                    <li><Link to='/'>Home</Link></li>
                    <li className='dropdown'>
                        <Link to='/projects'>Projects</Link>
                        <ul className='dropdown-items'>
                            <li>
                                <Link to='/flight-checker'>Southwest Flight Price Checker</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Other projects</Link>
                            </li>
                        </ul>
                    </li>
                    <li><Link to='/resume'>Resume</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </nav>
        </div>
    )
}