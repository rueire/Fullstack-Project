import { useState } from "react";

export default function AddWords({handleClose }) {
    const [newWord, setNewWord] = useState({ eng_word: "", finn_word: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("Input change detected:", name, value);
        setNewWord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eng_word: newWord.eng_word,
                    finn_word: newWord.finn_word,
                }),
            });

            if (response.ok) {
                const addedWord = await response.json();
                console.log("insert ok: ", addedWord)

                handleClose();
            }
        } catch (error) {
            console.error("error caught: ", error)
        }
    };

    const handleSubmitAndClose = () => {
        handleSubmit();
        handleClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Word Pair</h2>
                <div>
                    <label>English Word:</label>
                    <input
                        type="text"
                        name="eng_word"
                        value={newWord.eng_word}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Finnish Word:</label>
                    <input
                        type="text"
                        name="finn_word"
                        value={newWord.finn_word}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmitAndClose}>Add new Word</button>
                <button onClick={handleClose}>Exit</button>
            </div>
        </div>
    );
}