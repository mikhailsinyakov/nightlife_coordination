import React from 'react';
import ReactDOM from 'react-dom';
import userController from '../controllers/userController.client.js';
import BarController from '../controllers/barController.client.js';
import YelpController from '../controllers/yelpController.client.js';
import Header from '../components/Header.js';
import Search from '../components/Search.js';

const app = document.querySelector("#root");
const barController = new BarController();
const yelpController = new YelpController();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            bars: [],
            notFound: false
        };
        this.getBarsByLocation = this.getBarsByLocation.bind(this);
        this.getBarsByPosition = this.getBarsByPosition.bind(this);
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
    
    componentDidMount() {
        userController(user => {
            if (user._id) this.setState({user});
        });
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
                <Header username={this.state.user ? this.state.user.github.username
                                                  : null}/>
                <Search getBarsByLocation={this.getBarsByLocation}
                        getBarsByPosition={this.getBarsByPosition}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);
