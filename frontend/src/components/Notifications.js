import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../SocketContext'

export default function Notifications() {

    const { callAccepted, call, answerCall } = useContext(SocketContext)

    return (
        <>
        {call.isReceivedCall && !callAccepted && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{call.name} is calling</h1>
                <Button variant="contained" color="primary" style={{ marginLeft: '1em' }} onClick={answerCall} >
                    Answer
                </Button>
            </div>
        )}
        </>
    )
}
