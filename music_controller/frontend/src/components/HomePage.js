import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Router>
            <div>
                <div>Please help me</div>
                <Routes>
                    <Route  exact path="/">
                    <p>This is the Home Page</p>
                    </Route>
                    <Route path='/join' element={<RoomJoinPage />} />
                    <Route path='/create' component={CreateRoomPage} />
                </Routes>
            </div>
        </Router>
        )
    // }
    }

}