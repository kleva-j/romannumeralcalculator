import React, { useState } from 'react';

export const romanNumeralsMapping = {
    'M' : 1000,
    'CM': 900,
    'D' : 500,
    'CD': 400,
    'C' : 100,
    'XC': 90,
    'L' : 50,
    'XL': 40,
    'X' : 10,
    'IX':  9,
    'V' :  5,
    'IV':  4,
    'I' :  1,
};

export default function RomanNumeralComponent () {
    const [calculatedAnswer, updateAnswer] = useState("Nulla");
    const [input, updateInput] = useState("");

    const addAndConvertToRomanNumerals = (ints) => {
        let sumOfInputValues = ints
            .reduce((total, currentItem) => (total + currentItem), 0);
            
        let romanNumeral = '';

        for (let key in romanNumeralsMapping) {
            while(sumOfInputValues >= romanNumeralsMapping[key]) {
                romanNumeral += key;
                sumOfInputValues -= romanNumeralsMapping[key];
            }
        }

        return romanNumeral || 'Nulla';
    }

    const addNumbers = (inputString) => {
        const numbersStringArray = inputString.split(",");
        const numbers = numbersStringArray
            .map((numberAsString) => parseInt(numberAsString, 10));

        /* numbers is an array of ints. E.g. [1, 2, 3] */
        const answer = addAndConvertToRomanNumerals(numbers)

        return answer;
    }

    const handleChange = (event) => {
        updateInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const answer = addNumbers(input);
        updateAnswer(answer);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label style={{paddingRight: "10px"}}>
                    <span style={{paddingRight: "10px"}}>Numbers (separated by commas):</span>
                    <input type="text" name="input-form" onChange={handleChange}/>
                </label>
                <input type="submit" value="Add Numbers" />
            </form>
            <div>Answer in Roman Numerals: {calculatedAnswer}</div>
        </div>
    )
}