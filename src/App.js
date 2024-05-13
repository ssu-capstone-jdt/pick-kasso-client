import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Post from './Pages/Post';
import Curriculum from './Pages/Curriculum';
import MyPage from './Pages/MyPage';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/curriculum' element={<Curriculum/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':product_Id' element={<Product/>}/>
        </Route>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
