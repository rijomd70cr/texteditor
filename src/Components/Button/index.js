import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';

export default function Button({loading = false, href="", type = "button", color = "primary", style = {}, size="small", fullWidth=false, icon = "", onClick = () => {}, ...props}) {
    const [isLoading, setIsLoading] = React.useState(loading);
    useEffect(() => {
        setIsLoading(loading);
    }, [loading])
    return (
        <Stack size="small" style={{marginTop: props?.top, ...style}} direction="row" spacing={2}>
            <LoadingButton href={href} type={type} loading={isLoading} onClick={e => onClick(e)} color={color} size={size} fullWidth={fullWidth} variant="contained">
                {icon} {props.label || 'Button'}
            </LoadingButton>
        </Stack>
  );
}