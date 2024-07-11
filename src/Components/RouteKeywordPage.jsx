import React from 'react';
import { useParams } from 'react-router-dom';
import K1 from './KeywordComponent/K1.jsx';
// import K2 from './KeywordComponent/K2.jsx';
// import K3 from './KeywordComponent/K3.jsx';
// import K4 from './KeywordComponent/K4.jsx';
// import K5 from './KeywordComponent/K5.jsx';
// import K6 from './KeywordComponent/K6.jsx';

const RouteKeywordPage = () => {
  const { id } = useParams();

  switch(id) {
    case '1':
      return <K1 />;
    // case '2':
    //   return <K2 />;
    // case '3':
    //   return <K3 />;
    default:
      return <div>Invalid keyword ID</div>;
  }
}

export default RouteKeywordPage;
