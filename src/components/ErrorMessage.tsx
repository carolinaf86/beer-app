import {Box, Card, CardContent, makeStyles, Typography, useTheme} from '@material-ui/core';
import React from 'react';
import WarningRounded from '@material-ui/icons/WarningRounded';

export interface ErrorMessageProps {
    message?: string | any[]
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props: ErrorMessageProps) => {

    const theme = useTheme();
    const useStyles = makeStyles({
       root: {
           marginBottom: theme.spacing(2)
       }
    });
    const classes = useStyles();

    const message = props.message || 'Oops, something went wrong!';

    return (
            <Card className={classes.root}>
                <CardContent>
                    <Box display="flex" m={2} flexDirection={{xs: 'column', md: 'row'}} alignItems="center">
                        <WarningRounded color="error" style={{fontSize: 100}} titleAccess="Warning"/>
                        <Box marginLeft={{md: 4}}>
                            <Typography variant={'h6'}>{message}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
    );
};

export default ErrorMessage;