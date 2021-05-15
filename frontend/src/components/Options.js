import React, { useContext, useState } from 'react'
import { Grid, Paper, Button, TextField, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons'
import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
}));

export default function Options( { children } ) {

    const classes = useStyles()

    const { me, callAccepted, callEnded, name, setName, leaveCall, callUser } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')

    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}  >
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer} >

                        <Grid item className={classes.padding} xs={12} md={6}>
                            <Typography gutterBottom variant='h6'>Account Info</Typography>
                            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant="contained" color="secondary" fullWidth startIcon={<Assignment fontSize="large"/>} >Copy Your ID</Button>
                            </CopyToClipboard>
                        </Grid>

                        <Grid item className={classes.padding} xs={12} md={6}>
                            <Typography gutterBottom variant='h6'>Make a call</Typography>
                            <TextField label="ID to call" value={idToCall} onChange={e => setIdToCall(e.target.value)} fullWidth />
                            {(callAccepted && !callEnded) ? (
                                <Button variant="contained" color="secondary" className={classes.margin} startIcon={<PhoneDisabled fontSize="large"/>} fullWidth onClick={leaveCall} >Hang up</Button>
                            ): (
                                <Button variant="contained" color="primary" className={classes.margin} startIcon={<Phone fontSize="large"/>} fullWidth onClick={() => callUser(idToCall)} >
                                    Call
                                </Button>
                            )}
                        </Grid>

                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}