import React, {useState} from 'react';
import { Grid, Button, Typography, IconButton} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Link} from 'react-router-dom';

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create',
}

export default function Info(props){
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo(){
        return <Grid container>
            <Grid item align='center' xs={12}>
                <Typography component='h2' variant='h4'>Join a Room Info!</Typography>
                <Typography variant='body1'>
                Once someone else has created a room and generated a key and shared it with you...</Typography>
            
            <Typography variant='body2'>
                Hit join a room, enter the room key code then enjoy their music and exercise your ability to play, pause and skip the song!
            </Typography>
            </Grid>
        </Grid>
    }

    function createInfo(){
        return <Grid container>
            <Grid item align='center' xs={12}>
                <Typography component='h2' variant='h4'>Create a Room Info!</Typography>
                <Typography variant='body1'>
                    Allow for shared control of a what song your Spotify is playing.
                </Typography>
            
            <Grid item>
                <Typography>1. Play a song or playlist on your Spotify.</Typography>
                <Typography>2. Create a Room and pick your settings.</Typography>
                <Typography>3. Set up how many votes by room members are needed to skip a song.</Typography>
                <Typography>4. Decide if room members are allowed to pause and play the current song.</Typography>
                <Typography>5. Your room code can now be shared with others who can join and have the music play for them remotely.</Typography>
                <Typography>6. As the host you can edit the room settings to enable or disable previous settings and change the votes needed to skip.</Typography>
                <Typography>7. If you created the room you are the host. If the host leaves the room, the room will be deleted automatically.</Typography>
                <Typography>8. Enjoy!</Typography>
            </Grid>
            </Grid>
        </Grid>
    }

    return(
        <Grid container spacing={12}>
            <Grid item xs={12} align='center'>
                <Typography component='h2' variant='h4'>
                    What is House Party?
                </Typography>
                <Grid item xs={12} align='center'>
                    <Typography variant='body1'>
                        {page === pages.JOIN ? joinInfo() : createInfo() }
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <IconButton onClick={() => {
                        page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
                    }}>
                        {page === pages.CREATE ? <NavigateBeforeIcon/> : <NavigateNextIcon/>}
                    </IconButton>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button color="secondary" variant='contained' to='/' component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}