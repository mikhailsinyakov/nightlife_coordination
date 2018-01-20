import React from 'react';
import MessageToUser from './MessageToUser.js';
import MessageToGuest from './MessageToGuest.js';

function Header(props) {
    return (
        <header>
            <h1>Nightlife App</h1>
            <p>Will show you bars in your chosen area or in your location</p>
            {props.username ? <MessageToUser username={props.username}
                                             saveLastSearchInStorage={props.saveLastSearchInStorage}/>
                            : <MessageToGuest  saveLastSearchInStorage={props.saveLastSearchInStorage}/>}
        </header>
    );
}
export default Header;
