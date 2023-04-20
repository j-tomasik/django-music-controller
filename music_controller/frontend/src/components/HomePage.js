import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import {BrowserRouter as Router, Link, Switch, Route, Redirect} from 'react-router-dom';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <Switch>
                <Route  exact path="/">This is the home page</Route>
                <Route path='/join' component={RoomJoinPage}></Route>
                <Route path='/create' component={CreateRoomPage}></Route>
            </Switch>
        </Router>)
    }


}