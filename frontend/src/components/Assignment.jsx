import { useState, useEffect } from "react";
import ButtonLink from "./Buttonlink";
import { resolvePath } from "react-router-dom";
// import FetchWords from "./FetchWords";

// props usage figrured out with examples from AI
export default function Assignment({ mode }) {

    // const fetchedWords= FetchWords(); // To store fetched words, AI help to use correctly
    const [fetchedWords, setFetchedWords] = useState([]);
    const [shuffleWords, setShuffleWords] = useState([]);
    const [userInput, setUserInput] = useState(""); // Tracks user input
    // color here + css AI example used
    const [resultColors, setResultColors] = useState([]);
    const [score, setScore] = useState(0);

    const isFinnishToEnglish = mode === "finneng"; // Determine mode based on prop


    useEffect(() => {
        const UseFetch = async () => {
            try {
                const response = await fetch("/api")

                if (response.ok) {
                    const data = await response.json();
                    // Shuffle the words once fetched
                    console.log("fetched: ", data)
                    const shuffled = Shuffle([...data]); // Copy and shuffle the fetched words

                    setFetchedWords(data);
                    setShuffleWords(shuffled);
                    console.log("shuffled: ", shuffled)
                }
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        }
        UseFetch();
    }, []); // Re-run shuffle when fetchedWords change


    //check if answers are correct
    //Set Score and Colors
    const CheckAnswers = () => {
        let newScore = 0;
        const results = {};
        fetchedWords.forEach((word) => {
            //if if finnish, correct answer is in english
            const answer = isFinnishToEnglish ? word.eng_word : word.finn_word;
            //AI help when hit dead end, didnt work without ""
            const userAnswer = userInput[word.id]?.toLowerCase() || "";  //considers undefined

            if (userAnswer === answer.toLowerCase()) {
                console.log("Word is Correct!")
                results[word.id] = 'correct';
                newScore += 2;
            }
            else {
                console.log("Word is Incorrect!")
                results[word.id] = 'wrong';
            }
        })
        // Update the score and color
        setResultColors(results);
        setScore(newScore);
    };

    //Shuffle starts from the end to avoid [0]
    //Fisher-Yates Shuffle Algorithm, AI help
    const Shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, 5); //return first 5 results
    }

    // Handle input change for each word
    const handleChange = (id, value) => {
        setUserInput({
            //Spreads the current userInput object to preserve all the existing key-value pairs
            ...userInput,
            [id]: value, // Update the input value for the specific word ID
        });
    };

    return (<>
        <div className='appTitle'>
            <h1>{isFinnishToEnglish ? 'Finnish - English' : 'English - Finnish'}</h1>
            <div>
                <ButtonLink to="/user">Leave Assignment</ButtonLink>
            </div>
        </div>
        <div className='outerContainer'>
            <div className="wordTable">
                <table>
                    <thead>
                        <tr>
                            <th>{isFinnishToEnglish ? 'FINNISH' : 'ENGLISH'}</th>
                            <th>{isFinnishToEnglish ? 'ENGLISH' : 'FINNISH'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shuffleWords.map((word) => {
                            return (
                                <tr key={word.id}
                                    className={resultColors[word.id]} // Apply dynamic class (:colors, AI help)
                                >
                                    <td>{isFinnishToEnglish ? word.finn_word : word.eng_word}</td>
                                    <td> <input
                                        type="text"
                                        value={userInput[word.id] || ""} // Show the input value for word
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