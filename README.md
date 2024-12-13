# Fullstack-Project
November-December 2024

Project to show knowledge of backend development and how to make use of it using React.<br/> 
Finnish-English learning application
Get information to frontend, give user possibility to do assignment

Build status:
            Not applicable
Code Style:
            This project uses ESLint

Built with: Backend: Node.js
            Frontend: React

Code Example:
-to be added?-

Installation:
            Ill figure this out later (im still missing docker etc)
            at root:
            -npm install

API reference:
     main API endpoints for this app:
        GET /api: Fetches a list of data.
        POST /api : Adds new data.
        PATCH /api/:id : Edits existing data.
        DELETE /api/:id : Deletes existing data.
    [
    {
        "id": 1,
        "eng_word": "plant",
        "finn_word": "kasvi"
    },
    {
        "id": 2,
        "eng_word": "cat",
        "finn_word": "kissa"
    },
    etc...
    ]

How to use?
        App opens up at main view
        ADMIN is not accessible on smaller screens.
        on small screen (<600px) only user view is an option
                -> Two assignment possibilities
                -> Do assignment to get points for assignment
                -> Leave button, but no logout (yet?)

        on bigger screens there is possibility to access admin view
                -> on adminview, there is main view
                that for now is missing introduction
                -> tasks link takes you to view words that can be edited or deleted.
                -> New words can be added.
                -> Leave button, but no logout (yet?)






Rest not yet set in stone
