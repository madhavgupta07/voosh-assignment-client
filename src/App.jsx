import './App.css'
import Login from './components/Login'
import SignUp from './components/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Kanban from './components/Kanban'
import useStore from './zustand/authStore.js'


function App() {

  const isAuth = Boolean(useStore((state) => state.token));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route
            path="/task/:userId"
            element={ isAuth ? <Kanban /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
