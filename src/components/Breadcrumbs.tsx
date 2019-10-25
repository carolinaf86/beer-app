import React from 'react';
import {Box, Breadcrumbs as MUIBreadcrumbs} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CustomLink from './CustomLink';

export interface Breadcrumb {
    path: string,
    title: string
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[]
}

function Breadcrumbs(props: BreadcrumbsProps) {

    const {breadcrumbs} = props;

    return (
        <Box marginBottom={4}>
            <MUIBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs.map((breadcrumb, idx) => {
                    return (
                        <CustomLink key={idx} to={breadcrumb.path}>{breadcrumb.title}</CustomLink>
                    )
                })
                }
            </MUIBreadcrumbs>
        </Box>
    )

}

export default Breadcrumbs;