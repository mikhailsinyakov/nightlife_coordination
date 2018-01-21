import React from 'react';
import ToggleGoingToBar from './ToggleGoingToBar.js';

function ResultItem(props) {
    return (
        <div className="result__item bg-success text-light clearfix">
            <a href={props.url}>
                <img src={props.image_url} alt={props.name} width="100" height="100"/>
            </a>
            <div className="description">
                <p> <b>Name:</b> <a href={props.url}>{props.name}</a></p>
                <p> <b>Rating:</b> <span>{props.rating}</span></p>
                <p> <b>Address:</b> {props.address ? props.address : "Unknown"}</p>
                <ToggleGoingToBar visitors={props.visitors} 
                                  userIsVisitor={props.userIsVisitor}
                                   addUserToBar={props.addUserToBar} 
                                  removeUserFromBar={props.removeUserFromBar} 
                                  user={props.user} yelp_id={props.id}
                                  showLoginMessage={props.showLoginMessage} />
            </div>
        </div>
    );
}

export default ResultItem;