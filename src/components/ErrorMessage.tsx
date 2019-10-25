import {Box, Card, CardContent, Typography} from '@material-ui/core';
import React from 'react';
import WarningRounded from '@material-ui/icons/WarningRounded';

interface ErrorMessageProps {
    message?: string | any[]
}

function ErrorMessage(props: ErrorMessageProps) {

    const message = props.message || 'Oops, something went wrong!';

    return (
        <Box m={2}>
            <Card>
                <CardContent>
                    <Box display="flex" m={2} flexDirection={{xs: 'column', md: 'row'}} alignItems="center">
                        <WarningRounded color="error" style={{fontSize: 100}} titleAccess="Warning"/>
                        <Box marginLeft={{md: 4}}>
                            <Typography variant={'h6'}>{message}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ErrorMessage;