import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return(
        <div className='navContainer'>
            <h2 className='navH2'>Connor Collins</h2>
            <nav className='navNav'>
                <ul className='navUl'>
                    <li><Link to='/'>Home</Link></li>
                    <li className='dropdown'>
                        <Link to='/projects'>Projects</Link>
                        <ul className='dropdownItems'>
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