import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/login/login";
import Main from "./pages/Main/Main";


function App() {
  return(
    <div>
      <Routes>
          <Route exact path='/' element={<Main />} />
        <Route exact path='login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;