import React from 'react';

function LoginMessage(props) {
    if (!props.isShownLoginMessage) return null;
    
    const coords = props.loginMessageCoords;
    const style = {
        position: "absolute",
        left: `${coords[0]}px`,
        top: `${coords[1]}px`
    };
    
    return (
        <p className="page__login-message bg-dark text-warning" style={style}>
            You are not authenticated 
            <a href="/auth/github" className="badge badge-success" onClick={props.saveLastSearchInStorage}>Login</a>
        </p>
    );
}

export default LoginMessage;