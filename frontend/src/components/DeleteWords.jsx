// import { useState } from "react";

export default function DeleteWords({ wordID, handleClose }) {
    // console.log('Deleting word with ID:', wordID);  // Log the ID to ensure it’s correct

    const Delete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${wordID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("1 ok till here")
            console.log("Response status:", response.status);  // Debug the response status


            if (response.ok) {
                const DeletedTask = await response.json();
                console.log('Deleted task:', DeletedTask);
                handleClose();
                
            } else {
                console.error('Error: response not OK');
            }
        } catch (error) {
            console.log("error caught: ", error)
        }
    }

    const handleSubmitAndClose = () => {
        Delete();
        handleClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div>
                    <h2>Delete Word Pair</h2>
                    <h3>Are You Sure?:</h3>
                </div>
                <button onClick={handleSubmitAndClose}>Delete</button>
                <button onClick={handleClose}>Exit</button>
            </div>
        </div>
    );
}