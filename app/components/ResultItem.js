import React from 'react';
import ToggleGoingToBar from './ToggleGoingToBar.js';

function ResultItem(props) {
    return (
        <div>
            <img src={props.image_url} alt={props.name} width="50" height="50"/>
            <p>
                <a href={props.url}>{props.name}</a>
                <span>{props.rating}</span>
            </p>
            <ToggleGoingToBar visitors={props.visitors} userIsVisitor={props.userIsVisitor}
                              yelp_id={props.id} addUserToBar={props.addUserToBar} 
                              removeUserFromBar={props.removeUserFromBar}/>
            <p>{props.address}</p>
        </div>
    );
}

export default ResultItem;