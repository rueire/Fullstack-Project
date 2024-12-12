import { useState } from "react";

export default function EditWords({ currentWord, handleClose}) {
    // const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedWord, setEditedWord] = useState({
        eng_word: currentWord?.eng_word||"",
        finn_word: currentWord?.finn_word||"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedWord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const { id, eng_word, finn_word } = currentWord;
        try{
            const response = await fetch(`http://localhost:3000/api/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", 
                },
                body: JSON.stringify({eng_word: editedWord.eng_word, finn_word: editedWord.finn_word}),
            });

            if(response.ok) {
                const updatedWord = await response.json();
                console.log("Editing ok: ", updatedWord)

                handleClose();
            }
        }catch (error) {
            console.log("error caught: ", error)
        }
    };

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
                        value={editedWord.eng_word}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Finnish Word:</label>
                    <input
                        type="text"
                        name="finn_word"
                        value={editedWord.finn_word}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmitAndClose}>Submit</button>
                <button onClick={handleClose}>Exit</button>
            </div>
        </div>
    );
}