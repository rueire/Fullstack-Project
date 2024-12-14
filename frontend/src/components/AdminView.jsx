// UseLocation by AI
import {Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import EditWords from "./EditWords";
import AddWords from "./AddWords";
import DeleteWords from "./DeleteWords";

//LATER!
//Add, Delete, Edit to be updated with button press
//rn requires to leave adminview completely to update


export default function AdminView() {
    const [fetchedWords, setFetchedWords] = useState([]);
    const location = useLocation(); // Get the current location (route) 
    const [currentWord, setCurrentWord] = useState(null);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);

    //AI help to keep word list refreshed
    const FetchWords = async() => {
        try {
            const response = await fetch("http://localhost:3000/api")
            if (response.ok) {
                const data =  await response.json();
                setFetchedWords(data)
            }
        } catch (error) {
            console.error("caught: ", error)
        }
    }
        useEffect(() => {
            if (window.location.pathname.includes("/adminedittasks") ||
                window.location.pathname.includes("/adminmain") ) {
                document.body.style.position = "fixed";
            }
            else {
                document.body.style.position = "";
            }
            FetchWords();
        }, []);

    // Refresh the list of words after action (add, delete, or edit)
    const refreshWords = () => {
        FetchWords();
    };

    // Open the AddWords pop-up
    const handleAdd = () => {
        setIsAddOpen(true);
    };
    // Handle opening the edit pop-up
    const HandleEdit = (word) => {
        setCurrentWord(word);
        setIsEditOpen(true);
    }
    // Close all pop-ups
    const handleClose = () => {
        setIsEditOpen(false);
        setIsAddOpen(false);
        setIsDeleteOpen(false);
    };
    // Handle opening the delete pop-up
    const HandleDelete = (wordID) => {
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
                    <div className="admin-btn-container">
                    <div><Link to="/adminmain" className="nav-btn">Main Page</Link></div>
                    <div><Link to="/adminedittasks" className="nav-btn">Tasks</Link></div>
                    <div><Link to="/" className="nav-btn">Leave</Link></div>
                    </div>
                </nav>
                {location.pathname === '/adminmain' && (
                    <div>
                    <h1>Admin</h1>
                    <p>Add, Delete or Edit words needed <br />
                    in assingment in userview</p>
                    </div>
                )}
                {/* location usage help by AI*/}
                {location.pathname === '/adminedittasks' && (
                <div className="db-wrapper">
                    <h2>Edit Assignment Words</h2>
                    <button
                        className="add-word-pair-btn"
                        onClick={handleAdd}>
                        Add New Word Pair
                    </button>
                    {/* Add Pop-Up*/}
                    {isAddOpen && (
                        <AddWords handleClose={handleClose}
                            refresh={refreshWords} />
                    )}
                    <div className="db-inner">
                        {/*AI help to figure this out
                        => doesnt work without loading words bcause fetch is asyncronous */}
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
            {/* Edit and Delete Pop-Up*/}
            {isEditOpen && (
                <div className="popup">
                    {<EditWords currentWord={currentWord}
                        handleClose={handleClose}
                        refresh={refreshWords}/>}
                </div>
            )}
            {isDeleteOpen && (
                <div className="popup">
                    {<DeleteWords wordID={wordToDelete}
                    handleClose={handleClose}
                        refresh={refreshWords}/>}
                </div>
            )}
            </div>
    )
}