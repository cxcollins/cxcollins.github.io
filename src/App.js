import './App.css'
import NavBar  from './NavBar'
import Home from './Home'
import Contact from './Contact'
import Resume from './Resume'
import Projects from './Projects'
import Southwest from './Southwest'
import ConcertAlerts from './ConcertAlerts'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} exact></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/resume' element={<Resume />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/flight-checker' element={<Southwest />}></Route>
          <Route path='/concert-alerts' element={<ConcertAlerts />}></Route>
        </Routes>
    </Router>
  </div>
  );
}

export default App;
