import React, { useState, useEffect } from 'react';
import KeywordList from './KeywordList';
import KeywordSelector from './KeywordSelector';
import age from '../Assets/KeywordPackage/age.txt';
import animal from '../Assets/KeywordPackage/animal.txt';
import attribute from '../Assets/KeywordPackage/attribute.txt';
import class_fantasy from '../Assets/KeywordPackage/class_fantasy.txt';
import class_real from '../Assets/KeywordPackage/class_real.txt';
import color from '../Assets/KeywordPackage/color.txt';
import colorstyle from '../Assets/KeywordPackage/colorstyle.txt';
import fashion_concept from '../Assets/KeywordPackage/fashion_concept.txt';
import flower from '../Assets/KeywordPackage/flower.txt';
import fruit from '../Assets/KeywordPackage/fruit.txt';
import gender from '../Assets/KeywordPackage/gender.txt';
import object from '../Assets/KeywordPackage/object.txt';
import pattern from '../Assets/KeywordPackage/pattern.txt';
import race from '../Assets/KeywordPackage/race.txt';
import status from '../Assets/KeywordPackage/status.txt';
import texture from '../Assets/KeywordPackage/texture.txt';
import weapon from '../Assets/KeywordPackage/weapon.txt';
import weather from '../Assets/KeywordPackage/weather.txt';
import './K.css';

const K1 = () => {
  const [ageKeywords, setAgeKeywords] = useState([]);
  const [attributeKeywords, setAttributeKeywords] = useState([]);
  const [animalKeywords, setAnimalKeywords] = useState([]);
  const [class_fantasyKeywords, setClassFantasyKeywords] = useState([]);
  const [class_realKeywords, setClassRealKeywords] = useState([]);
  const [colorKeywords, setColorKeywords] = useState([]);
  const [colorstyleKeywords, setColorstyleKeywords] = useState([]);
  const [fashion_conceptKeywords, setFashionConceptKeywords] = useState([]);
  const [flowerKeywords, setFlowerKeywords] = useState([]);
  const [fruitKeywords, setFruitKeywords] = useState([]);
  const [genderKeywords, setGenderKeywords] = useState([]);
  const [objectKeywords, setObjectKeywords] = useState([]);
  const [patternKeywords, setPatternKeywords] = useState([]);
  const [raceKeywords, setRaceKeywords] = useState([]);
  const [statusKeywords, setStatusKeywords] = useState([]);
  const [textureKeywords, setTextureKeywords] = useState([]);
  const [weaponKeywords, setWeaponKeywords] = useState([]);
  const [weatherKeywords, setWeatherKeywords] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordCount, setKeywordCount] = useState(2);

  useEffect(() => {
    const keywordLists = [
      ageKeywords, attributeKeywords, animalKeywords, class_fantasyKeywords, class_realKeywords, colorKeywords, colorstyleKeywords, fashion_conceptKeywords, flowerKeywords, fruitKeywords, genderKeywords, objectKeywords, patternKeywords, raceKeywords, statusKeywords, textureKeywords, weaponKeywords, weatherKeywords
    ];
    if (keywordLists.every(list => list.length > 0)) {
      setLoaded(true);
    }
  }, [
    ageKeywords, attributeKeywords, animalKeywords, class_fantasyKeywords, class_realKeywords, colorKeywords, colorstyleKeywords, fashion_conceptKeywords, flowerKeywords, fruitKeywords, genderKeywords, objectKeywords, patternKeywords, raceKeywords, statusKeywords, textureKeywords, weaponKeywords, weatherKeywords
  ]);

  const handleKeywordsSelected = (keywords) => {
    setSelectedKeywords(keywords);
  };

  const resetKeywords = () => {
    setSelectedKeywords([]);
  };

  const selectKeywords = (count) => {
    setKeywordCount(count);
    setSelectedKeywords([]);
  };

  return (
    <div className='keyword-page'>
      <KeywordList keywordFile={age} onKeywordsLoaded={setAgeKeywords} />
      <KeywordList keywordFile={attribute} onKeywordsLoaded={setAttributeKeywords} />
      <KeywordList keywordFile={animal} onKeywordsLoaded={setAnimalKeywords} />
      <KeywordList keywordFile={class_fantasy} onKeywordsLoaded={setClassFantasyKeywords} />
      <KeywordList keywordFile={class_real} onKeywordsLoaded={setClassRealKeywords} />
      <KeywordList keywordFile={color} onKeywordsLoaded={setColorKeywords} />
      <KeywordList keywordFile={colorstyle} onKeywordsLoaded={setColorstyleKeywords} />
      <KeywordList keywordFile={fashion_concept} onKeywordsLoaded={setFashionConceptKeywords} />
      <KeywordList keywordFile={flower} onKeywordsLoaded={setFlowerKeywords} />
      <KeywordList keywordFile={fruit} onKeywordsLoaded={setFruitKeywords} />
      <KeywordList keywordFile={gender} onKeywordsLoaded={setGenderKeywords} />
      <KeywordList keywordFile={object} onKeywordsLoaded={setObjectKeywords} />
      <KeywordList keywordFile={pattern} onKeywordsLoaded={setPatternKeywords} />
      <KeywordList keywordFile={race} onKeywordsLoaded={setRaceKeywords} />
      <KeywordList keywordFile={status} onKeywordsLoaded={setStatusKeywords} />
      <KeywordList keywordFile={texture} onKeywordsLoaded={setTextureKeywords} />
      <KeywordList keywordFile={weapon} onKeywordsLoaded={setWeaponKeywords} />
      <KeywordList keywordFile={weather} onKeywordsLoaded={setWeatherKeywords} />

      <div>
        <button onClick={() => selectKeywords(1)}>키워드 1개</button>
        <button onClick={() => selectKeywords(2)}>키워드 2개</button>
        <button onClick={() => selectKeywords(3)}>키워드 3개</button>
        <select onChange={(e) => selectKeywords(parseInt(e.target.value))}>
          <option value="">키워드 4~10 선택</option>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i + 4}>키워드 {i + 4}개</option>
          ))}
        </select>
      </div>

      {loaded && selectedKeywords.length === 0 && (
        <KeywordSelector
          keywords={[
            ageKeywords, attributeKeywords, animalKeywords, class_fantasyKeywords, class_realKeywords, colorKeywords, colorstyleKeywords, fashion_conceptKeywords, flowerKeywords, fruitKeywords, genderKeywords, objectKeywords, patternKeywords, raceKeywords, statusKeywords, textureKeywords, weaponKeywords, weatherKeywords
          ]}
          weights={[
            0.08, 0.2, 0.06, 0.001, 0.001, 0.06, 0.06, 0.06, 0.06, 0.08, 0.001, 0.2, 0.001, 0.04, 0.04, 0.06, 0.001, 0.001
          ]}
          keywordCount={keywordCount}
          onKeywordsSelected={handleKeywordsSelected}
        />
      )}
      {selectedKeywords.length > 0 && (
        <div>
          <div>Selected Keywords: {selectedKeywords.join(', ')}</div>
          <button onClick={resetKeywords}>다시 선택</button>
        </div>
      )}
    </div>
  );
};

export default K1;
