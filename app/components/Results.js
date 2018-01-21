import React from 'react';
import ResultItem from './ResultItem.js';
import Paginator from './Paginator.js';

function Results(props) {
    if (props.notFound) {
        return (
            <p>No bars found by your request</p>
        );
    }
    const resultItems = props.bars.map(val => {
        return (
            <ResultItem key={val.id} id={val.id} name={val.name} image_url={val.image_url}
                        address={val.address} url={val.url} rating={val.rating}
                        visitors={getVisitors(val.id)} userIsVisitor={userIsVisitor(val.id)}
                        addUserToBar={props.addUserToBar} removeUserFromBar={props.removeUserFromBar}
                        user={props.user} showLoginMessage={props.showLoginMessage}/>
        );
    });
    
    return (
        <div className="results">
            <Paginator  resultsPage={props.resultsPage} 
                        getBarsByLocation={props.getBarsByLocation}
                        getBarsByPosition={props.getBarsByPosition} 
                        lastSearch={props.lastSearch}/>
            {resultItems}
            <Paginator  resultsPage={props.resultsPage} 
                        getBarsByLocation={props.getBarsByLocation}
                        getBarsByPosition={props.getBarsByPosition} 
                        lastSearch={props.lastSearch}/>
        </div>
    );
    
    function getVisitors(id) {
        const matchedBars = props.selectedBars.filter(val => val.yelp_id == id);
        if (!matchedBars.length) return 0;
        return matchedBars[0].visitors.length;
    }
    
    function userIsVisitor(id) {
        if (!getVisitors(id)) return false;
        if (!props.user) return false;
        const bar = props.selectedBars.filter(val => val.yelp_id == id)[0];
        const matchedVisitors = bar.visitors.filter(val => val.id == props.user._id);
        if (!matchedVisitors.length) return false;
        return true;
    }
    
}

export default Results;