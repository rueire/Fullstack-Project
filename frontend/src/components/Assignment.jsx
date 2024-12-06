import { useState, useEffect } from "react";
import FetchWords from "./FetchWords";

export default function Assignment({mode}) {

    const fetchedWords= FetchWords(); // To store fetched words
    const [shuffleWords, setShuffleWords] = useState([]);
    const [userInput, setUserInput] = useState(""); // Tracks user input
    const [resultColors, setResultColors] = useState([]);
    const [score, setScore] = useState(0);

    const isFinnishToEnglish = mode === "finneng"; // Determine mode based on prop


    //check if answers are correct
    const CheckAnswers = () => {
        let newScore = 0;
        const results = {};
        fetchedWords.forEach((word) => {
            //if if finnish, correct answer is in english
            const answer = isFinnishToEnglish ? word.eng_word : word.finn_word;
            if (userInput[word.id].toLowerCase() === answer.toLowerCase()) {
                console.log("Word is Correct!")
                results[word.id] = 'correct';
                newScore += 2;
            }
            else {
                console.log("Word is Incorrect!")
                results[word.id] = 'wrong';
            }
        })
        setResultColors(results);
        setScore(newScore);
    };

    // Shuffle the words once they are fetched
    useEffect(() => {
        const shuffled = Shuffle([...fetchedWords]); // Copy and shuffle the array
        setShuffleWords(shuffled);
    }, [fetchedWords]); // Re-run shuffle when fetchedWords change

    const Shuffle = (array) => {
        //start from the end to avoid [0]
        //Fisher-Yates Shuffle Algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0,5); //take first 5 results
    };

    // Handle input change for each Finnish word
    const handleChange = (id, value) => {
        setUserInput({
            //Spreads the current userInput object to preserve all the existing key-value pairs
            ...userInput,
            [id]: value, // Update the input value for the specific word ID
        });
    };

    return (<>
        <div className='appTitle'>
            <h1>{isFinnishToEnglish ? 'Finnish - English':'English-Finnish'}</h1>
        </div>
        <div className='outerContainer'>
            <div className="wordTable">
                <table>
                    <thead>
                        <tr>
                            <th>{isFinnishToEnglish ? 'Finnish' : 'English'}</th>
                            <th>{isFinnishToEnglish ? 'English' : 'Finnish'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shuffleWords.map((word) => {
                            return(
                                <tr key={word.id}
                                    className={resultColors[word.id]} // Apply dynamic class
                                    >
                                    <td>{isFinnishToEnglish ? word.finn_word : word.eng_word}</td>
                                    <td> <input
                                        type="text"
                                        value={userInput[word.id] || ""} // Show the input value for this word
                                        onChange={(e) => handleChange(word.id, e.target.value)} // Track changes
                                    /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="submit-btn">
                    <button onClick={CheckAnswers}>Check Answers</button>
                </div>
                <div className="scores">
                    <p>{score}/10 points</p>
                </div>
            </div>
        </div>
    </>)
}