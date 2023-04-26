import React , { Component } from 'react';
import {createRoot} from 'react-dom/client';
import Homepage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                hello
                <Homepage />
            </div>
        )

    }
}

const appDiv = document.getElementById('app');
const root = createRoot(appDiv)
root.render(<App tab='home' />)