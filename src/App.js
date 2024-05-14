import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Post from './Pages/Post';
import Curriculum from './Pages/Curriculum';
import MyPage from './Pages/MyPage';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import OAuthCallback from './Components/OAuthCallback';


function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/curriculum' element={<Curriculum/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':product_Id' element={<Product/>}/>
        </Route>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path="/oauth-callback" element={<OAuthCallback setUser={setUser} />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
