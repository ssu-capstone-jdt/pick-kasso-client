import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Post from './Pages/Post';
import Curriculum from './Pages/Curriculum';
import MyPage from './Pages/MyPage';
import Footer from './Components/Footer/Footer';
import OAuthCallback from './Components/OAuthCallback';
import UserInfo from './Pages/UserInfo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/post' element={<Post />} />
          <Route path='/curriculum' element={<Curriculum />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path="/auth" element={<OAuthCallback setUser={setUser} />} />
          <Route path='/user' element={<UserInfo />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
