// src/Test.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const languages = [
  { label: 'Swahili', value: 'swahili' },
  { label: 'Yoruba', value: 'yoruba' },
  { label: 'Hausa', value: 'hausa' },
  { label: 'Zulu', value: 'zulu' },
  { label: 'Xhosa', value: 'xhosa' },
  { label: 'Afrikaans', value: 'afrikaans' },
  { label: 'Igbo', value: 'igbo' },
  { label: 'Amharic', value: 'amharic' },
  { label: 'Shona', value: 'shona' },
  { label: 'Oromo', value: 'oromo' },
  { label: 'Somali', value: 'somali' },
  { label: 'Tigrinya', value: 'tigrinya' },
  { label: 'Malagasy', value: 'malagasy' },
  { label: 'Igala', value: 'igala' },
  { label: 'Kikuyu', value: 'kikuyu' },
  { label: 'Kinyarwanda', value: 'kinyarwanda' },
  { label: 'Kirundi', value: 'kirundi' },
  { label: 'Lingala', value: 'lingala' },
  { label: 'Luganda', value: 'luganda' },
  { label: 'Luhya', value: 'luhya' },
  { label: 'Luo', value: 'luo' },
  { label: 'Mende', value: 'mende' },
  { label: 'Ndebele', value: 'ndebele' },
  { label: 'Nuer', value: 'nuer' },
  { label: 'Oshiwambo', value: 'oshiwambo' },
  { label: 'Pedi', value: 'pedi' },
  { label: 'Rukiga', value: 'rukiga' },
  { label: 'Runyankore', value: 'runyankore' },
  { label: 'Sesotho', value: 'sesotho' },
  { label: 'Setswana', value: 'setswana' },
  { label: 'Soga', value: 'soga' },
  { label: 'Sotho', value: 'sotho' },
  { label: 'Tswana', value: 'tswana' },
  { label: 'Umbundu', value: 'umbundu' },
  { label: 'Venda', value: 'venda' },
  { label: 'Wolof', value: 'wolof' },
];

const Test = () => {
    const [countries, setCountries] = useState([]);
    const [countrySearch, setCountrySearch] = useState('');
    const [filteredCountry, setFilteredCountry] = useState([]);
    useEffect(() => {
   axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
   .then((result) => {
    // console.log(result.data.data);
    setCountries(result.data.data)
   }).catch((err) => {
    
   });
  }, [])
  

  const [searchLangTerm, setSearchLangTerm] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  
  const handleLanguageChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchLangTerm(input);

    const filtered = languages.filter((language) =>
      language.label.toLowerCase().includes(input)
    );
    setFilteredLanguages(filtered);
  };

  const handleSelectLanguage = (selectedLanguage) => {
    setSearchLangTerm('');
    setFilteredLanguages([]);
    // Handle the selected language as needed
    // console.log('Selected Language:', selectedLanguage);
    setSearchLangTerm(selectedLanguage.value)
    console.log(searchLangTerm);
  };
  
  
  const handleCountrySearch = (event) => {
      setCountrySearch(event.target.value);
      const filteredCount = countries.filter((country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase())
      );
      setFilteredCountry(filteredCount)
  };
      
        const handleSelectCountry = (selectedCountry) => {
          setCountrySearch('');
          setFilteredCountry([]);
          // Handle the selected language as needed
          console.log(selectedCountry.name);
          setCountrySearch(selectedCountry.name)
        //   console.log(countrySearch);
        };


  return (
    <div>
      <Form.Group>
        <Form.Label>Search African Languages</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type to search..."
          value={searchLangTerm}
          onChange={handleLanguageChange}
        />
      </Form.Group>

      {filteredLanguages.length > 0 && (
        <span className="list-grou">
          {filteredLanguages.map((language, index) => (
            <option
              key={index}
              className="list-group-ite"
              onClick={() => handleSelectLanguage(language)}
            >
              {language.label}
            </option>
          ))}
        </span>
      )}

<div>
      <input type="text" placeholder="Search countries" value={countrySearch} onChange={handleCountrySearch} />
      {filteredCountry.length > 0 && (

      <span className='list-group'>
        {filteredCountry.map((country) => (
          <i key={country.name} className="list-group-item" onClick={()=>handleSelectCountry(country)}>
            <img src={country.flag} alt={country.name} style={{width: '30px'}}/>
            {" "}{country.name}
          </i>
        ))}
      </span>
      )}
    </div>
    </div>
  );
};

export default Test;
