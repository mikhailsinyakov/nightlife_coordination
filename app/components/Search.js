import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.value;
        value = value ? value[0].toUpperCase() + value.slice(1) : "";
        this.setState({value});
    }
    
    handleSubmit(e) {
        this.props.getBarsByLocation(this.state.value, 1);
        e.preventDefault();
    }
    
    componentDidMount() {
        const query = window.localStorage.getItem("query");
        if (query) this.setState({value: query});
    }
    
    render() {
        return (
            <div className="search text-center">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <input className="form-control form-control-lg col-sm-9"type="text" 
                                value={this.state.value} onChange={this.handleChange} 
                                placeholder="Enter city" required/>
                        <button className="btn btn-primary col-sm-3" type="submit">Submit</button><br/>
                    </div>
                    <button className="btn btn-secondary" type="button" 
                            onClick={() => this.props.getBarsByPosition(1)}>
                        Find bars in your position
                    </button>
                </form>
            </div>
        );
    }
}

export default Search;