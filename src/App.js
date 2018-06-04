import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            currentPage: 1,
            listings: []
        };
    }

    componentWillMount() {
        request
            .get('https://thisopenspace.com/lhl-test')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .query({ page: this.state.currentPage })
            .end(function(err, res){
                if (res.body) {
                    this.setState({ listings: res.body });
                }
        }.bind(this)); 
    }

    render() {
        const allListings = this.state.listings;

        let listingTile = (allListings.length === 0) ? '' :
            <div className="grid-div">
                <GridList cellHeight={180} className="grid-list">
                    {allListings.data.map(tile => (
                        <GridListTile 
                            className="grid-list-tile"
                            key={tile.id}>
                            <img src={tile.primary_photo_css_url_small} alt={tile.name} />
                            <GridListTileBar
                                title={tile.name}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>;

        return (
        <div className="App">
            {listingTile}
        </div>
        );
    }
}

export default App;
