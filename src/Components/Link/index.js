import React from 'react';
import { Stack, Typography } from '@mui/material';
import { getColors } from './../../Core/Utilities/index';

export const CustomizedLink = (props) => {
    const { titile, onClick } = props;
    return (

        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={1}
        >
            <Typography variant="span" component="span" sx={{ color: getColors('blue') }} onClick={onClick}>
                {titile}
            </Typography>
        </Stack >
    )
}
