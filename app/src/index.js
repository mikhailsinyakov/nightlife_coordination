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
            shownLoginMessage: false,
            loginMessageCoords: [],
            lastSearch: "",
            lastSearchType: ""
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
    
    getBarsByLocation(search) {
        yelpController.getBarsByLocation(search, (bars, url) => {
                if (bars.length) this.setState({
                    bars,
                    notFound: false
                });
                else this.setState({notFound: true});
                this.changeLastSearchAndUrl("location", search);
            });
    }
    
    
    getBarsByPosition() {
        yelpController.getBarsByPosition( (bars, url) => {
                if (bars.length) this.setState({
                    bars,
                    notFound: false
                });
                else this.setState({notFound: true});
                this.changeLastSearchAndUrl("position");
            });
    }
    
    changeLastSearchAndUrl(type, search = "") {
        this.setState({
            lastSearchType: type,
            lastSearch: search
        });
    }
    
    saveLastSearchInStorage() {
        if (this.state.lastSearch) window.localStorage.setItem("search", this.state.lastSearch);
        if (this.state.lastSearchType) window.localStorage.setItem("search_type", this.state.lastSearchType);
    }
    
    sendRequestWithLastSavedData() {
        const type = window.localStorage.getItem("search_type");
        if (type == "location") {
            const search = window.localStorage.getItem("search");
            this.getBarsByLocation(search);
        }
        if (type == "position") this.getBarsByPosition();
            
        window.localStorage.removeItem("search");
        window.localStorage.removeItem("search_type");
    }
    
    addUserToBar(yelp_id) {
        barController.addUserToBarsVisitors(yelp_id, this.getSelectedBars);
    }
    
    removeUserFromBar(yelp_id) {
        barController.removeUserFromBarsVisitors(yelp_id, this.getSelectedBars);
    }
    
    showLoginMessage(x, y) {
        if (!this.state.shownLoginMessage) this.setState({shownLoginMessage: true});
        this.setState({loginMessageCoords: [x, y]});
    }
    
    componentDidMount() {
        this.getUserData();
        this.getSelectedBars();
        
        const type = window.localStorage.getItem("search_type");
        if (type) this.sendRequestWithLastSavedData();
        
    }
    
    componentDidUpdate() {
        //console.log(this.state.lastSearch, this.state.lastYelpRequestUrl)
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
                        selectedBars={this.state.selectedBars} notFound={this.state.notFound}
                        addUserToBar={this.addUserToBar} removeUserFromBar={this.removeUserFromBar}
                        showLoginMessage={this.showLoginMessage}/>
                <Footer />
                        
                <LoginMessage shownLoginMessage={this.state.shownLoginMessage}
                              loginMessageCoords={this.state.loginMessageCoords}
                              saveLastSearchInStorage={this.saveLastSearchInStorage} />
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);
