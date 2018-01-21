import React from 'react';

function ToggleGoingToBar(props) {
    if (props.userIsVisitor) {
        return (
            <p>
                <button className="btn btn-primary">{props.visitors} GOING </button>
                <button className="btn btn-danger" onClick={() => props.removeUserFromBar(props.yelp_id)}>I changed my mind</button>
            </p>
        );
    }
    return (
        <p>
            <button className="btn btn-primary" onClick={ e => {
                    e.persist();
                    if (!props.user) {
                        const xCoord = e.pageX + 30;
                        const yCoord = e.pageY - 70;
                        return props.showLoginMessage(xCoord, yCoord);
                    }
                    props.addUserToBar(props.yelp_id);
                } 
            }>{props.visitors} GOING </button>
        </p>
    );
}

export default ToggleGoingToBar;