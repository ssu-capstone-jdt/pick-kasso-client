import React, { useEffect } from 'react';

const WeightedKeywordSelector = ({ keywords, weights, keywordCount, onKeywordsSelected }) => {
  useEffect(() => {
    if (keywords.length === weights.length) {
      const keywordLists = keywords.map((list, index) => ({ list, weight: weights[index] }));

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
        let selectedKeywords = new Set();

        while (selectedKeywords.size < keywordCount) {
          const list = getWeightedRandomList(keywordLists);
          const keyword = list[Math.floor(Math.random() * list.length)];

          if (!selectedKeywords.has(keyword)) {
            selectedKeywords.add(keyword);
          }
        }

        onKeywordsSelected(Array.from(selectedKeywords));
      };

      selectKeywords();
    }
  }, [keywords, weights, keywordCount, onKeywordsSelected]);

  return null;
};

export default WeightedKeywordSelector;
