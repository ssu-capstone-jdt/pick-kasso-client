import { useEffect } from 'react';

const KeywordSelector = ({ keywords, weights, keywordCount, onKeywordsSelected }) => {
  useEffect(() => {
    const getWeightedRandomList = (lists) => {
      const totalWeight = lists.reduce((sum, list) => sum + list.weight, 0);
      let random = Math.random() * totalWeight;

      for (let i = 0; i < lists.length; i++) {
        if (random < lists[i].weight) {
          return lists[i].list;
        }
        random -= lists[i].weight;
      }
    };

    const selectKeywords = () => {
      if (keywords.length === weights.length) {
        const keywordLists = keywords.map((list, index) => ({ list, weight: weights[index] }));
        const selectedKeywords = [];

        for (let i = 0; i < keywordCount; i++) {
          const selectedList = getWeightedRandomList(keywordLists);
          const randomKeyword = selectedList[Math.floor(Math.random() * selectedList.length)];
          selectedKeywords.push(randomKeyword);
        }

        onKeywordsSelected(selectedKeywords);
      }
    };

    selectKeywords();
  }, [keywords, weights, keywordCount, onKeywordsSelected]);

  return null;
};

export default KeywordSelector;
