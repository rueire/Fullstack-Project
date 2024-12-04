import { useState, useEffect } from "react";


export default function FetchWords() {

    const [fetchedWords, setFetchedWords] = useState([]); // To store fetched words
    const [userInput, setUserInput] = useState(""); // Tracks user input
    const [resultColors, setResultColors] = useState([]);

    //check if answers are correct
    const CheckAnswers = () => {
        const results = {};
        fetchedWords.forEach((word) => {
            if (userInput[word.id].toLowerCase() === word.finn_word.toLowerCase()) {
                console.log("Word is Correct!")
                results[word.id] = 'correct';
            }
            else {
                console.log("Word is Incorrect!")
                results[word.id] = 'wrong';
            }
        })
        setResultColors(results);
    };

    const ShuffleWords = (array) => {
        //start from the end to avoid [0]
        //Fisher-Yates Shuffle Algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    useEffect(() => {
        fetch("http://localhost:3000/api")
            .then((response) => response.json())
            .then((data) => {
                const shuffledWords = ShuffleWords(data);
                setFetchedWords(shuffledWords)
            })
            .catch((error) => {
                console.error("Error fetching words:", error);
            });
    }, []);

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
            <h1>Eng-Finn App</h1>
        </div>
        <div className='outerContainer'>
            <div className="wordTable">
                <table>
                    <thead>
                        <tr>
                            <th>English</th>
                            <th>Finnish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedWords.map((word) => {
                            return(
                                <tr key={word.id}
                                    className={resultColors[word.id]} // Apply dynamic class
                                > {/* ai help */}
                                    <td>{word.eng_word}</td>
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
                <div className="submit_btn">
                    <button onClick={CheckAnswers}>Check Answers</button>
                </div>
            </div>
        </div>
    </>)
}