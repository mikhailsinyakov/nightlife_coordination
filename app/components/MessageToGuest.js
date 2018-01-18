import React from 'react';

function MessageToGuest(props) {
    return (
        <p>
            You are not authenticated 
            <a href="/auth/github">Login</a>
        </p>
    );
}

export default MessageToGuest;