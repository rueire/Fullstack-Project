
import {Link, useLocation } from "react-router-dom"
import FetchWords from "./FetchWords";
import { useState } from "react";
import EditWords from "./EditWords";
import AddWords from "./AddWords";
import DeleteWords from "./DeleteWords";


export default function AdminView() {
    const fetchedWords = FetchWords();
    const location = useLocation(); // Get the current location (route)
    const [currentWord, setCurrentWord] = useState(null);


    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);

    const handleAdd = () => {
        setIsAddOpen(true); // Open the AddWords modal
    };

    const HandleEdit = (word) => {
        setCurrentWord(word);
        setIsEditOpen(true);
    }
    
    const handleClose = () => {
        //close anything and everything
        setIsEditOpen(false);
        setIsAddOpen(false);
        setIsDeleteOpen(false);
    };
    
    const HandleDelete = (wordID) => {
        //debugging here
        if (wordID) {
            setIsDeleteOpen(true);
            setWordToDelete(wordID);
            console.log('deleting: ', wordID)
        } else {
            console.error("Error: Word ID is undefined");
        }
    };


    return (
            <div>
                <nav className="admin-nav">
                <div className="admin-img"> <img src="" alt="admin image" /></div>
                    <div><Link to="/adminmain" className="nav_btn">Main Page</Link></div>
                    <div><Link to="/adminedittasks" className="nav-btn">Tasks</Link></div>
                <div><Link to="/" className="nav-btn">Leave</Link></div>
                </nav>
                {location.pathname === '/adminmain' && (
                    <div>
                    <h1>Title Here</h1>
                    <p>Add some introduction</p>
                    </div>
                )}

                {location.pathname === '/adminedittasks' && (
                <div className="db-wrapper">
                    <h1>Edit Assignment Words</h1>
                    <div className="db-inner">
                        <button
                            className="add-word-pair-btn"
                            onClick={handleAdd}>
                            Add New Word Pair
                        </button>
                        {isAddOpen && (
                            <AddWords handleClose={handleClose} />
                        )}
                        {fetchedWords && fetchedWords.length === 0 ? ( // Handle loading state
                            <p>Loading words...</p>
                        ) : (
                            <ul>
                                    {fetchedWords && fetchedWords.map((word) => (
                                    <div key={word.id} className="word-pair">
                                        <div className="word-id">
                                            <strong>{word.id}</strong>
                                        </div>

                                        <div className="eng-word">
                                            <span>{word.eng_word}</span>
                                        </div>

                                        <div className="finn-word">
                                            <span>{word.finn_word}</span>
                                        </div>

                                        <div className="action-buttons">
                                            <button onClick={() => HandleEdit(word)}>Edit</button>
                                            <button onClick={() => HandleDelete(word.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                )}
            {isEditOpen && (
                <div className="popup">
                    {<EditWords currentWord={currentWord}
                    handleClose={handleClose}/>}
                </div>
            )}
            {isDeleteOpen && (
                <div className="popup">
                    {<DeleteWords wordID={wordToDelete} handleClose={handleClose} />}
                </div>
            )}
            </div>
    )
}