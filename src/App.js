import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<home/>}/>
        <Route path='/post' element={<post/>}/>
        <Route path='/curriculum' element={<curriculum/>}/>
        <Route path='/mypage' element={<mypage/>}/>
      </Routes>
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
