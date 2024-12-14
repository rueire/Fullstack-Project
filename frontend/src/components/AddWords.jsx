import { useState } from "react";

export default function AddWords({ handleClose }) {
    const [newWord, setNewWord] = useState({ eng_word: "", finn_word: "" });

    // Handle input change
    //AI help, prev was unknown
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Handle submission
    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //AI help to figure out form and usage of properties
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
            else {
                //debugging
                console.log(response.statusText)
            }
        } catch (error) {
            console.error("error caught: ", error)
        }
    };

    // Handle submission of info and closing of the pop-up
    // AI idea to make sure OnClick works as intented
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