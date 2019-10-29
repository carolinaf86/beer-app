import React from 'react';
import {Breadcrumbs as MUIBreadcrumbs, makeStyles, useTheme} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CustomLink from './CustomLink';

export interface Breadcrumb {
    path: string,
    title: string
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props: BreadcrumbsProps) => {

    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            marginBottom: theme.spacing(4),
        },
        link: {
            color: theme.palette.text.secondary,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        currentLink: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        }
    });

    const {breadcrumbs} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIBreadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                {breadcrumbs.map((breadcrumb, idx) => {
                    const linkClasses = idx === breadcrumbs.length - 1 ? classes.currentLink : classes.link;
                    return (
                        <CustomLink key={idx} to={breadcrumb.path}
                                    className={linkClasses}>{breadcrumb.title}</CustomLink>
                    )
                })
                }
            </MUIBreadcrumbs>
        </div>
    )

};

export default Breadcrumbs;