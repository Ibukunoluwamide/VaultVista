
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Transfer from './components/Transfer';
import Pin_Password from './components/Pin_Password';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';
import Subscriptions from './components/Subscriptions';
import BuyData from './components/subscriptions/BuyData';
import BuyAirtime from './components/subscriptions/BuyAirtime';
import Test from './components/Test';
import History from './components/History';

function App() {
 
  
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/sub' element={<Subscriptions/>} />
    <Route path="/home" element={<Navigate to="/"/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/profile' element={<Profile/>} />
    <Route path='/transfer' element={<Transfer/>} />
    <Route path='/changepin' element={<Pin_Password/>} />
    <Route path='/buy-data' element={<BuyData/>} />
    <Route path='/buy-airtime' element={<BuyAirtime/>} />
    <Route path='/history' element={<History/>} />
    <Route path='/test' element={<Test />} />
   </Routes>
   <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
   </>
  )
}

export default App
