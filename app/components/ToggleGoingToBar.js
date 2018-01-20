import React from 'react';

function ToggleGoingToBar(props) {
    if (props.userIsVisitor) {
        return (
            <p>
                <button>{props.visitors} GOING </button>
                <button onClick={() => props.removeUserFromBar(props.yelp_id)}>I changed my mind</button>
            </p>
        );
    }
    return (
        <p>
            <button onClick={ e => {
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