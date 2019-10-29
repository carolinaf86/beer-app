import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Custom styling wrapper for react-router-dom Link component
 */
const CustomLink = styled(Link)`
    text-decoration: none;
    color: #000;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props: any) => <CustomLink {...props} />;