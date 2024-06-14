import './App.css';
import History from './Pages/History';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Quiz from './Pages/Quiz';
import Signup from './Pages/Signup';
import {  AuthProvider } from './context/Authcontext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
 <>
 
<AuthProvider>

  <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/quiz' element={<Quiz/>}/>
      <Route path="/history" element={<History/>}/>
    </Routes>
  </Router>
<ToastContainer/>
     
 </AuthProvider>

 </>
  );
}

export default App;
