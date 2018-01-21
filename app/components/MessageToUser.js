import React from 'react';

function MessageToUser(props) {
    return (
        <p className="header__login-message bg-dark text-warning">
            Welcome, {props.username} 
            <a href="/logout" className="badge badge-success" onClick={props.saveLastSearchInStorage}>Logout</a>
        </p>
    );
}

export default MessageToUser;