
import { Tooltip, IconButton, Stack, InputAdornment, TextField, Button, Box } from '@mui/material';
import Iconify from 'src/components/Iconify'
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const StyledSearchBar = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        minWidth: '500px',
    }
}))

type props = {
    onSearch: (value: string) => void
}

export default function Toolbar({ onSearch }: props) {


    const [search, setSearch] = useState('')

    return (


        <Box sx={{ display: 'flex', py: 2.5, px: 3 }}>

            <StyledSearchBar
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onSearch(search)
                    }
                }}
                onBlur={() => {
                    if (!search) onSearch('')
                }}
                placeholder="Search product..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify
                                icon={'eva:search-fill'}
                                sx={{ color: 'text.disabled', width: 20, height: 20 }}
                            />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    onSearch('')
                                    setSearch('')
                                }}
                            >x</IconButton>
                        </InputAdornment>)
                }}
            />

            <Button
                onClick={() => onSearch(search)}
                variant="contained" color="primary" sx={{ ml: 1 }} >
                <Iconify
                    icon={'eva:search-fill'}
                    sx={{ width: 20, height: 20 }}
                />
            </Button>
        </Box>
    )
}