import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
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
                    <GridListTile key="Subheader" className="subheader" cols={2}>
                        <ListSubheader className="subheader-title" component="div">Open Listings</ListSubheader>
                        <div className="page-btns">
                            <Button
                                onClick={() => this.prevPage()}
                                variant="raised"
                                color="primary"
                                className="prev-btn"
                                disabled={this.state.currentPage == 1}
                                >
                                Prev
                            </Button>
                            <Button
                                onClick={() => this.nextPage()}
                                variant="raised"
                                color="primary"
                                className="next-btn"
                                disabled={this.state.listings.length === 0}
                                >
                                Next
                            </Button>
                        </div>
                    </GridListTile>
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
                <div className="page-btns">
                    <Button
                        onClick={() => this.prevPage()}
                        variant="raised"
                        color="primary"
                        className="prev-btn"
                        disabled={this.state.currentPage == 1}
                        >
                        Prev
                    </Button>
                    <Button
                        onClick={() => this.nextPage()}
                        variant="raised"
                        color="primary"
                        className="next-btn"
                        disabled={this.state.listings.length === 0}
                        >
                        Next
                    </Button>
                </div>
            </div>;

        return (
        <div className="App">
            {listingTile}
        </div>
        );
    }
}

export default App;
