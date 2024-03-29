import React, { Component} from 'react';
import {Grid, Button, Typography} from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';


export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {}
        }
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSetttingsButton = this.renderSetttingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
        this.getCurrentSong()
    }

    componentDidMount(){
        this.interval = setInterval(this.getCurrentSong, 2000)
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
        .then((response) => {
            if(!response.ok) {
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json();
        })
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
            if(this.state.isHost) {
            this.authenticateSpotify()
            }
        });
    }
//Checks if user is authenticated by hitting /is-authenticated route in spotify backend of django app
//if the user is not authenticated it will request the spotify URL from this projects backend and then redirect to that url
    authenticateSpotify() {
    fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        
        if (!data.status) {
            fetch("/spotify/get-auth-url")
                .then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url);
            });
        }
        });
    }
    
    getCurrentSong(){
        fetch('/spotify/current-song').then((response) => {
            console.log('curr song response', response)
            if (response.status != 204) {
                console.error('response not ok', response);
                return {}
            } else {
                return response.json()
            }
        }).then((data) => {
            this.setState({song: data});
        });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/api/leave-room', requestOptions).then(_response => {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
        })
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        })
    }

    renderSettings(){
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <CreateRoomPage update={true} votesToSkip={this.state.votesToSkip} guestCanPause={this.state.guestCanPause} roomCode={this.roomCode}
                    updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button color="secondary" variant="contained" onClick={() => this.updateShowSettings(false)}>
                        close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderSetttingsButton() {
        return(
            <Grid item xs={12} align='center'>
                <Button variant="contained" color='primary' onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        )
    }

    render(){
        if(this.state.showSettings) {
            return this.renderSettings();
        } 
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song}/>
                {this.state.isHost ? this.renderSetttingsButton() : null}
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' onClick={this.leaveButtonPressed} >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
            ) 
    }
}