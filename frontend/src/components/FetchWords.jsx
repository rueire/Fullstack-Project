import { useState, useEffect } from "react";

export default function FetchWords() {
    const [fetchedWords, setFetchedWords] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api")
            .then((response) => response.json())
            .then((data) => {
                setFetchedWords(data)
            })
            .catch((error) => {
                console.error("Error fetching words:", error);
            });
    }, []);

    return fetchedWords;
}