import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<home/>}/>
        <Route path='/post' element={<post/>}/>
        <Route path='/curriculum' element={<curriculum/>}/>
        <Route path='/mypage' element={<mypage/>}/>
        <Route path="/curriculums" element={<curriculum/>}>
          <Route path=':curriculum_id' element={<curriculum/>}/>
        </Route>
        <Route path='/login' element={<login/>}/>
      </Routes>
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
