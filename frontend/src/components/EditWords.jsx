import { useState } from "react";

//props to keep track of word and closing the pop-up
export default function EditWords({ currentWord, handleClose, refresh}) {
    // const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedWord, setEditedWord] = useState({
        eng_word: currentWord?.eng_word||"",
        finn_word: currentWord?.finn_word||"",
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedWord((prev) => ({
            ...prev,
            [name]: value, // Update the state with the new value
        }));
    };

    // Handle submission
    const handleSubmit = async () => {
        // correct form help from AI
        const { id, eng_word, finn_word } = currentWord;
        try{
            const response = await fetch(`http://localhost:3000/api/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    eng_word: editedWord.eng_word,
                     finn_word: editedWord.finn_word
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                alert(result.error)
            }
            else {
                const updatedWord = await response.json();
                console.log("Editing ok: ", updatedWord)
                refresh();
                handleClose();
            }
        }catch (error) {
            console.log("error caught: ", error)
        }
    };

    // Handle submit words and closing the pop-up
    const handleSubmitAndClose = () => {
        handleSubmit();
        handleClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Word Pair</h2>
                <div>
                    <label>English Word:</label>
                    <input
                        type="text"
                        name="eng_word"
                        value={editedWord.eng_word} //current value
                        onChange={handleChange} // input change
                    />
                </div>
                <div>
                    <label>Finnish Word:</label>
                    <input
                        type="text"
                        name="finn_word"
                        value={editedWord.finn_word}//current value
                        onChange={handleChange} // input change
                    />
                </div>
                <button onClick={handleSubmitAndClose}>Submit</button>
                <button onClick={handleClose}>Exit</button>
            </div>
        </div>
    );
}