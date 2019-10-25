import React from 'react';
import {IconButton} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

interface FavouriteToggleProps {
    onClick: () => any,
    isFavourite: boolean
}

function FavouriteToggle(props: FavouriteToggleProps) {

    const { isFavourite, onClick } = props;

    const icon = isFavourite ? <Favorite/> : <FavoriteBorder/>;

    return (
        <IconButton color="secondary" onClick={() => onClick()}>
            {icon}
        </IconButton>
    )
}
export default FavouriteToggle;