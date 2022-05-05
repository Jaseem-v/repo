import { Typography, Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';



export const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
}));


export const GridBox = ({ children, sx, ...others }: { children: ReactNode } & BoxProps) => {

    return (
        <Box
            {...others}
            sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                ...sx
            }}
        >
            {children}
        </Box>
    )
}