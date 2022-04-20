import { useMutation } from '@apollo/client'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Grid, TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack';

import { CREATE_USER } from 'src/graphql/home'
/**
 * This for for graphql demo purpose only need to add form validation with react-hook-form/formik with
 * Yup schema validator Please refer Template for example
 */

export default function CreateUser() {

    const { enqueueSnackbar } = useSnackbar()
    const [createUser, { loading }] = useMutation(CREATE_USER)
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const { name, email, username } = user
        createUser({
            variables: {
                input: {
                    name,
                    email,
                    username,
                }
            }
        })
            .then(res => {
                enqueueSnackbar('User created successfully', { variant: 'success' })
            })
            .catch(err => {
                enqueueSnackbar(err.message, { variant: 'error' })
            })
    }

    return (
        <Box sx={{ mt: 2, p: 2 }}>
            <form onSubmit={handleSubmit}>
                <h2>Create User</h2>
                <TextField
                    sx={{ m: 2 }}
                    label="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                />
                <TextField
                    sx={{ m: 2 }}
                    label="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
                <TextField
                    sx={{ m: 2 }}
                    label="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    required
                />
                <LoadingButton
                    variant="contained"
                    sx={{ m: 3 }}
                    loading={loading}
                    type="submit"
                >Create</LoadingButton>
            </form>
        </Box>
    )
}