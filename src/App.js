import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            currentPage: 1,
            listings: []
        };
    }

    render() {
        return (
        <div className="App">
            <p className="App-intro">
            </p>
        </div>
        );
    }
}

export default App;
