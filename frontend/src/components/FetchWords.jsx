import { useState, useEffect } from "react";

export default function FetchWords() {
    //(empty) array/useeffect usage help from AI
    const [fetchedWords, setFetchedWords] = useState([]);

    // useEffect hook to fetch words from the API
    useEffect(() => {
        fetch("http://localhost:3000/api")
            .then((response) => response.json())
            .then((data) => {
                setFetchedWords(data)  // Update the state with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching words:", error);
            });
    }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

    return fetchedWords;
}