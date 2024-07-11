import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Keywords.css';
import user_ICON from '../Assets/User_count.png';

const Keywords = ({ activeButton }) => {
    const [keywordData, setKeywordData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/keyword/all')
          .then(response => {
            const fetchedKeywords = response.data.data.map(item => ({
              id: item.id,
              keyword_title: item.keyword_title,
              image_link: item.image_link,
              tag: item.tag,
              used_count: item.used_count
            }));
            const sortedKeywords = fetchedKeywords.sort((a, b) => b.used_count - a.used_count);

            const updatedKeywords = sortedKeywords.map((item, index) => ({
              ...item,
              isPopular: index < 3  // 상위 3개 항목에 대해 "인기" 설정
            }));

            setKeywordData(updatedKeywords);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    if (!keywordData.length) {
        return <div>Loading...</div>;
    }

    let filteredData = [];
    if (activeButton === 1) {
        filteredData = keywordData.slice(0, 3);
    } else if (activeButton === 2) {
        filteredData = keywordData.filter(item => item.tag.includes("키워드"));
    } else if (activeButton === 3) {
        filteredData = keywordData.filter(item => !item.tag.includes("키워드"));
    } else {
        filteredData = keywordData;
    }

    const handleItemClick = (id) => {
        navigate(`/keyword/${id}`);
        api.post(`/keyword/${id}`);
    };

    return (
        <div className="info-container">
            {filteredData.map((keyword, index) => (
                <div key={index} className="curriculum-item" onClick={() => handleItemClick(keyword.id)}>
                    <div className="image-container">
                        <img src={keyword.image_link} alt={keyword.keyword_title} />
                        {keyword.isPopular && <div className="overlay">HOT</div>}
                    </div>
                    <div className="info">
                        <div className="keyword-title">
                            <h3 className="keyword">{keyword.keyword_title}</h3>
                            <img src={user_ICON} alt=''/>
                            <p className="used-count">{keyword.used_count}</p>
                        </div>
                        <div className="keyword-tags">
                            {keyword.tag.map((tag, tagIndex) => (
                                <span key={tagIndex} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Keywords;
