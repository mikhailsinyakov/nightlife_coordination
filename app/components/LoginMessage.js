import React from 'react';

function LoginMessage(props) {
    if (!props.isShownLoginMessage) return null;
    
    const coords = props.loginMessageCoords;
    const parStyle = {
        position: "absolute",
        left: `${coords[0]}px`,
        top: `${coords[1]}px`
    };
    const spanStyle = {
        cursor: "pointer",
        display: "block",
        fontSize: "30px",
        transform: "translate(240px, -65px)",
        position: "absolute"
    };
    
    return (
        <p className="page__login-message bg-dark text-warning" style={parStyle}>
            You are not authenticated 
            <a href="/auth/github" className="badge badge-success" onClick={props.saveLastSearchInStorage}>Login</a>
            <span style={spanStyle} onClick={props.hideLoginMessage}>&times;</span>
        </p>
    );
}

export default LoginMessage;