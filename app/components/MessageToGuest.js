import React from 'react';

function MessageToGuest(props) {
    return (
        <p className="header__login-message bg-dark text-warning">
            You are not authenticated 
            <a href="/auth/github" className="badge badge-success" onClick={props.saveLastSearchInStorage}>Login</a>
        </p>
    );
}

export default MessageToGuest;