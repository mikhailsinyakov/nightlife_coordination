import React from 'react';
import ReactDOM from 'react-dom';
import userController from '../controllers/userController.client.js';
import BarController from '../controllers/barController.client.js';
import YelpController from '../controllers/yelpController.client.js';
import Header from '../components/Header.js';
import Search from '../components/Search.js';
import Results from '../components/Results.js';
import Footer from '../components/Footer.js';
import LoginMessage from '../components/LoginMessage.js';

const app = document.querySelector("#root");
const barController = new BarController();
const yelpController = new YelpController();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            bars: [],
            selectedBars: [],
            notFound: false,
            isShownLoginMessage: false,
            loginMessageCoords: [],
            lastSearch: "",
            lastSearchType: "",
            lastResultsPage: null,
            resultsPage: 0
        };
        this.getUserData = this.getUserData.bind(this);
        this.getSelectedBars = this.getSelectedBars.bind(this);
        this.getBarsByLocation = this.getBarsByLocation.bind(this);
        this.getBarsByPosition = this.getBarsByPosition.bind(this);
        this.addUserToBar = this.addUserToBar.bind(this);
        this.removeUserFromBar = this.removeUserFromBar.bind(this);
        this.showLoginMessage = this.showLoginMessage.bind(this);
        this.changeLastSearchAndUrl = this.changeLastSearchAndUrl.bind(this);
        this.saveLastSearchInStorage = this.saveLastSearchInStorage.bind(this);
        this.sendRequestWithLastSavedData = this.sendRequestWithLastSavedData.bind(this);
    }
    
    getUserData() {
        userController(user => {
            if (user._id) this.setState({user});
        });
    }
    
    getSelectedBars() {
        barController.getBars(selectedBars => {
            this.setState({selectedBars});
        });
    }
    
    getBarsByLocation(search, page) {
        yelpController.getBarsByLocation(search, page, (bars, url) => {
                if (bars.length) this.setState({
                    bars,
                    notFound: false,
                    resultsPage: page
                });
                else this.setState({notFound: true});
                this.changeLastSearchAndUrl("location", page, search);
            });
    }
    
    
    getBarsByPosition(page) {
        yelpController.getBarsByPosition( page, (bars, url) => {
                if (bars.length) this.setState({
                    bars,
                    notFound: false,
                    resultsPage: page
                });
                else this.setState({notFound: true});
                this.changeLastSearchAndUrl("position", page);
            });
    }
    
    changeLastSearchAndUrl(type, page, search = "") {
        this.setState({
            lastSearchType: type,
            lastSearch: search,
            lastResultsPage: page
        });
    }
    
    saveLastSearchInStorage() {
        if (this.state.lastSearch) window.localStorage.setItem("search", this.state.lastSearch);
        if (this.state.lastSearchType) window.localStorage.setItem("search_type", this.state.lastSearchType);
        if (this.state.lastResultsPage) window.localStorage.setItem("page", this.state.lastResultsPage);
    }
    
    sendRequestWithLastSavedData() {
        const type = window.localStorage.getItem("search_type");
        if (type == "location") {
            const search = window.localStorage.getItem("search");
            const page = +window.localStorage.getItem("page");
            this.getBarsByLocation(search, page);
        }
        if (type == "position") {
            const page = +window.localStorage.getItem("page");
            this.getBarsByPosition(page);
        }
            
        window.localStorage.removeItem("search");
        window.localStorage.removeItem("search_type");
        window.localStorage.removeItem("page");
    }
    
    addUserToBar(yelp_id) {
        barController.addUserToBarsVisitors(yelp_id, this.getSelectedBars);
    }
    
    removeUserFromBar(yelp_id) {
        barController.removeUserFromBarsVisitors(yelp_id, this.getSelectedBars);
    }
    
    showLoginMessage(x, y) {
        if (!this.state.isShownLoginMessage) this.setState({isShownLoginMessage: true});
        this.setState({loginMessageCoords: [x, y]});
    }
    
    componentDidMount() {
        this.getUserData();
        this.getSelectedBars();
        
        const type = window.localStorage.getItem("search_type");
        if (type) this.sendRequestWithLastSavedData();
        
    }
    
    componentDidUpdate() {
        //console.log(this.state.resultsPage)
    }
    
    render() {
        return (
            <div>
                <Header username={this.state.user ? this.state.user.github.username
                                                  : null}
                        saveLastSearchInStorage={this.saveLastSearchInStorage}/>
                <Search getBarsByLocation={this.getBarsByLocation}
                        getBarsByPosition={this.getBarsByPosition}/>
                <Results user={this.state.user} bars={this.state.bars} 
                        selectedBars={this.state.selectedBars} 
                        notFound={this.state.notFound}
                        addUserToBar={this.addUserToBar} 
                        removeUserFromBar={this.removeUserFromBar}
                        showLoginMessage={this.showLoginMessage} 
                        resultsPage={this.state.resultsPage} 
                        lastSearchType={this.state.lastSearchType}
                        lastSearch={this.state.lastSearch}
                        getBarsByLocation={this.getBarsByLocation}
                        getBarsByPosition={this.getBarsByPosition}/>
                <Footer />
                        
                <LoginMessage isShownLoginMessage={this.state.isShownLoginMessage}
                              loginMessageCoords={this.state.loginMessageCoords}
                              saveLastSearchInStorage={this.saveLastSearchInStorage} />
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);
