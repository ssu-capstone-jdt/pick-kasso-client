import { useEffect } from 'react';

const KeywordList = ({ keywordFile, onKeywordsLoaded }) => {
  useEffect(() => {
    fetch(keywordFile)
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        onKeywordsLoaded(lines);
      });
  }, [keywordFile, onKeywordsLoaded]);

  return null;
};

export default KeywordList;
