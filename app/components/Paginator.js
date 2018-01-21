import React from 'react';

function Paginator(props) {
    const page = props.resultsPage;
    if (page < 1) return null;
    const pagesList = [];
    for (let i = page - 2; i <= page + 2; i++) {
        if (i > 0) pagesList.push(i);
    }
    
    function sendRequestWithPageNumber(page) {
        if (props.lastSearch.type == "location") {
            props.getBarsByLocation(props.lastSearch.query, page);
        }
        if (props.lastSearch.type == "position") {
            props.getBarsByPosition(page);
        }
    }
    
    const buttonsList = pagesList.map((val, i) => {
        if (val == page) {
            return (
                <li className="page-item active" key={i} >
                    <a href="#" className="page-link" 
                       onClick={ e => e.preventDefault}>{val}</a>
                </li>
            );
        }
        return (
            <li className="page-item" key={i}>
                <a href="#" className="page-link" onClick={ e => {
                    e.preventDefault();
                    sendRequestWithPageNumber(val);
                }
                }>{val}</a>
            </li>
        );
    });
    return (
        <nav>
            <ul className="pagination justify-content-center">{buttonsList}</ul>
        </nav>
    );
}

export default Paginator;