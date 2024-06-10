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
import CurriculumInfo from './Pages/CurriculumInfo';
import LocalCurr from './Pages/LocalCurr';
import PaintingInfo from './Pages/PaintingInfo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div id='root'>
      <BrowserRouter>
      <div className='main-content'>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/post' element={<Post />} />
          <Route path='/curriculum' element={<Curriculum />} />
          <Route path='/curriculum/:id' element={<LocalCurr />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path="/auth" element={<OAuthCallback setUser={setUser} />} />
          <Route path='/user' element={<UserInfo />}/>
          <Route path='/curriculuminfo/:id' element={<CurriculumInfo />} />
          <Route path='/paintinginfo' element={<PaintingInfo />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
