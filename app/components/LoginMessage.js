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
        <div style={style}>
            <p>You are not authenticated.</p>
            <p>Please <a href="/auth/github" onClick={props.saveLastSearchInStorage}>Login</a></p>
        </div>
    );
}

export default LoginMessage;