import React from 'react';
import { Text } from '../Text/Text';
import Style from '../ErrorPage/Error.module.css';
import { Heading } from '../Heading/Heading';
import { Button } from '../Button/Button';

export const Error = () => {

    return(
        <div id={Style.errorDiv}>
            <div id={Style.mainDiv}>
                <Text>Logo</Text>
            </div>
            <div id={Style.mainContainer}>
                <div id={Style.errorText}>
                    <Text>404</Text>
                </div>
                <div id={Style.errorPara}>
                    <Text id={Style.errorMessage}>Something went wrong</Text>
                    <Heading id={Style.errorPnf}>Page not found</Heading>
                </div>
                <div id={Style.errorButton}>
                    <Button id={Style.button}>Go Home</Button>
                </div>
            </div>
        </div>
    )
}