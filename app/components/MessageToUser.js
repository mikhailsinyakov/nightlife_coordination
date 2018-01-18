import React from 'react';

function MessageToUser(props) {
    return (
        <p>
            Welcome, {props.username} 
            <a href="/logout">Logout</a>
        </p>
    );
}

export default MessageToUser;