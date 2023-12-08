import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import socket from "../../websocket";
import { useNavigate } from 'react-router-dom';
const UserPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePlayerButtonClick = () => {
        console.log(`Le nom d'utilisateur est : ${username}`);
        if (username !== "") {
            const requestData = {
                event: "setUsername",
                username: username,
            };
            try {
                socket.send(JSON.stringify(requestData));
                navigate('/quiz');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={8} sm={6} md={4} lg={3}>
                <TextField
                    fullWidth
                    id="username-input"
                    label="Nom d'utilisateur"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{ width: 250 }}
                />
            </Grid>
            <Grid item xs={8} sm={6} md={4} lg={3}>
                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handlePlayerButtonClick}
                    style={{ width: 250 }}
                >
                    Jouer
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserPage;
