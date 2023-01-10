import './App.css'
import NavBar  from './NavBar'
import Home from './Home'
import Contact from './Contact'
import Resume from './Resume'
import Projects from './Projects'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
        </Routes>
    </Router>
  </div>
  );
}

export default App;
