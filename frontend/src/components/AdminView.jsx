
import {Link, useLocation } from "react-router-dom"
import FetchWords from "./FetchWords";

export default function AdminView() {
    const fetchedWords = FetchWords();
    const location = useLocation(); // Get the current location (route)

    function HandleEdit() { }

    function HandleDelete() { }


    return (
            <div>
                <nav>
                <div className="admin-img"> <img src="" alt="admin image" /></div>
                    <div><Link to="/adminmain" className="nav_btn">Main Page</Link></div>
                    <div><Link to="/adminedittasks" className="nav-btn">Tasks</Link></div>
                </nav>
                {location.pathname === '/adminmain' && (
                    <div>
                    <h1>Title Here</h1>
                    <p>Add some introduction</p>
                    </div>
                )}
                {location.pathname === '/adminedittasks' && (
                <div className="db-wrapper">
                    <h1>Title here</h1>
                    <div className="db-inner">
                        {fetchedWords.length === 0 ? ( // Handle loading state
                            <p>Loading words...</p>
                        ) : (
                            <ul>
                                {fetchedWords.map((word) => (
                                    <div key={word.id} className="word-pair">
                                        <div className="word-id">
                                            <strong>{word.id}</strong>
                                        </div>

                                        {/* English Word Div */}
                                        <div className="eng-word">
                                            <span>{word.eng_word}</span>
                                        </div>

                                        {/* Finnish Word Div */}
                                        <div className="finn-word">
                                            <span>{word.finn_word}</span>
                                        </div>

                                        {/* Action Buttons Div */}
                                        <div className="action-buttons">
                                            <button onClick={() => handleEdit(word.id)}>Edit</button>
                                            <button onClick={() => handleDelete(word.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                )}
            </div>
    )
}