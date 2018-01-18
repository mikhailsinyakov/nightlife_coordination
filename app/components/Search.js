import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    
    handleSubmit(e) {
        this.props.getBarsByLocation(this.state.value);
        e.preventDefault();
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter city" required/>
                    <input type="submit" value="Search" />
                </form>
                <button onClick={this.props.getBarsByPosition}>Find bars in your position</button>
            </div>
        );
    }
}

export default Search;