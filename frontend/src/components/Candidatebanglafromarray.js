import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";

const CandidateBanglafromarray = () => {
 
 const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  // This array represents the options for the first select input
  const option1Data = ['Option 1', 'Option 2', 'Option 3'];

  // This object represents the options for the second select input
  const option2Data = {
    'Option 1': ['Suboption 1', 'Suboption 2', 'Suboption 3'],
    'Option 2': ['Suboption 4', 'Suboption 5', 'Suboption 6'],
    'Option 3': ['Suboption 7', 'Suboption 8', 'Suboption 9'],
  };
  
  
  

  // This function handles the change event for the first select input
  const handleOption1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);
    setSelectedOption2('');
  };

  // This function handles the change event for the second select input
  const handleOption2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };

  // This function generates the options for the second select input based on the selected value of the first select input
  const getOption2Data = () => {
    if (selectedOption1) {
      return option2Data[selectedOption1].map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ));
    } else {
      return <option value="">Select an option</option>;
    }
  };
  
 

  return (
    <div>
      <label htmlFor="option1">Option 1:</label>
      <select id="option1" name="option1" value={selectedOption1} onChange={handleOption1Change}>
        <option value="">Select an option</option>
        {option1Data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="option2">Option 2:</label>
      <select id="option2" name="option2" value={selectedOption2} onChange={handleOption2Change}>
        {getOption2Data()}
      </select>
    </div>
	
	 
  );
}


export default CandidateBanglafromarray