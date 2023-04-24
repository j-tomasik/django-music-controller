import React, { Component } from 'react';
import{ Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormLabelControl } from'@mui/material'
import {Link } from 'react-router-dom'


export default class CreateRoomPage extends Component {
    defaultVotes = 2

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>Create A Room</Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <FormControl component='fieldset'>
                        <FormHelperText>
                            <div align='center'>
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValye='true'>
                            <FormLabelControl value='true' 
                            control={<Radio color='primary' />} 
                            label='Play/Pause'
                            labelPlacement='bottom'
                            />
                            <FormLabelControl value='true' 
                            control={<Radio color='secondary' />} 
                            label="No Control"
                            labelPlacement='bottom'
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }


}