
//debugging help by AI
export default function DeleteWords({ wordID, handleClose }) {

    // Function to delete a word
    const Delete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${wordID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Response status:", response.status);  // Debug the response status


            if (response.status === 204) {
                console.log('Delete successful');
                handleClose(); // Close the pop-up
                
            } else {
                console.error('Error: response not OK');
            }
        } catch (error) {
            console.log("error caught: ", error)
        }
    }
    // Function to submit info and close the pop-up
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