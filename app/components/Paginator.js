import React from 'react';

function Paginator(props) {
    const page = props.resultsPage;
    if (page < 1) return null;
    const pagesList = [];
    for (let i = page - 2; i <= page + 2; i++) {
        if (i > 0) pagesList.push(i);
    }
    
    function sendRequestWithPageNumber(page) {
        if (props.lastSearchType == "location") {
            props.getBarsByLocation(props.lastSearch, page);
        }
        if (props.lastSearchType == "position") {
            props.getBarsByPosition(page);
        }
    }
    
    const buttonsList = pagesList.map((val, i) => {
        if (val == page) {
            return (
                <button key={i} className="active"><b>{val}</b></button>
            );
        }
        return (
            <button  onClick={() => sendRequestWithPageNumber(val)} 
                     key={i}>{val}</button>
        );
    });
    return (
        <div>{buttonsList}</div>
    );
}

export default Paginator;