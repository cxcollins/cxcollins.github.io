import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'

const navClass = ({ isActive }) => (isActive ? 'navLink active' : 'navLink')

export default function NavBar() {
    return(
        <header className='navContainer'>
            <Link to='/' className='navBrand'>Connor Collins</Link>
            <div className='navRight'>
            <nav className='navNav'>
                <ul className='navUl'>
                    <li><NavLink to='/' className={navClass} end>Home</NavLink></li>
                    <li className='dropdown'>
                        <NavLink to='/projects' className={navClass}>Projects</NavLink>
                        <ul className='dropdownItems'>
                            <li>
                                <Link to='/flight-checker'>Southwest Flight Price Checker</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Other projects</Link>
                            </li>
                        </ul>
                    </li>
                    <li><NavLink to='/resume' className={navClass}>Resume</NavLink></li>
                    <li><NavLink to='/contact' className={navClass}>Contact</NavLink></li>
                </ul>
            </nav>
            </div>
        </header>
    )
}
