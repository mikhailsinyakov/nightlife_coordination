import React from 'react';
import ReactDOM from 'react-dom';
import userController from '../controllers/userController.client.js';
import BarController from '../controllers/barController.client.js';
import YelpController from '../controllers/yelpController.client.js';
import Header from '../components/Header.js';
import Search from '../components/Search.js';
import Results from '../components/Results.js';

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
            notFound: false
        };
        this.getUserData = this.getUserData.bind(this);
        this.getSelectedBars = this.getSelectedBars.bind(this);
        this.getBarsByLocation = this.getBarsByLocation.bind(this);
        this.getBarsByPosition = this.getBarsByPosition.bind(this);
        this.addUserToBar = this.addUserToBar.bind(this);
        this.removeUserFromBar = this.removeUserFromBar.bind(this);
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
        yelpController.getBarsByLocation(search, bars => {
                if (bars.length) this.setState({
                    bars,
                    notFound: false
                });
                else this.setState({notFound: true});
            });
    }
    
    getBarsByPosition() {
        yelpController.getBarsByPosition(bars => {
                if (bars.length) this.setState({
                    bars,
                    notFound: false
                });
                else this.setState({notFound: true});
            });
    }
    
    addUserToBar(yelp_id) {
        barController.addUserToBarsVisitors(yelp_id, this.getSelectedBars);
    }
    
    removeUserFromBar(yelp_id) {
        barController.removeUserFromBarsVisitors(yelp_id, this.getSelectedBars);
    }
    
    componentDidMount() {
        this.getUserData();
        this.getSelectedBars();
    }
    
    render() {
        return (
            <div>
                <Header username={this.state.user ? this.state.user.github.username
                                                  : null}/>
                <Search getBarsByLocation={this.getBarsByLocation}
                        getBarsByPosition={this.getBarsByPosition}/>
                <Results user={this.state.user} bars={this.state.bars} 
                        selectedBars={this.state.selectedBars} notFound={this.state.notFound}
                        addUserToBar={this.addUserToBar} removeUserFromBar={this.removeUserFromBar}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);
