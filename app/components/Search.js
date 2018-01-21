import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        const value = e.target.value[0].toUpperCase() + e.target.value.slice(1);
        this.setState({value});
    }
    
    handleSubmit(e) {
        this.props.getBarsByLocation(this.state.value, 1);
        e.preventDefault();
    }
    
    componentDidMount() {
        const search = window.localStorage.getItem("search");
        if (search) this.setState({value: search});
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter city" required/>
                    <input type="submit" value="Search" />
                </form>
                <button onClick={() => this.props.getBarsByPosition(1)}>Find bars in your position</button>
            </div>
        );
    }
}

export default Search;