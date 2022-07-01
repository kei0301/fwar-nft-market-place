import { Box, Button, Container, Image, Input, Radio, RadioGroup, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useState, useRef, useCallback } from 'react';
import { useEthers } from '@usedapp/core';
import ScaleFadeCustom from 'components/ScaleFadeCustom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CreateNFT = () => {

    const { account } = useEthers();
    const history = useHistory();

    useEffect(() => {
        console.log(account)
        if (account) {
            toast.success('Welcome to Connect')
            history.push('market-place')
        }
    }, [account])

    return (
        <>
            <ScaleFadeCustom>
                <Container maxW='xl' centerContent>
                    <Image
                        textAlign='center'
                        borderRadius='full'
                        boxSize='150px'
                        src='assets/logo.png'
                        alt='Dan Abramov'
                    />
                </Container>
                <Container>
                    <Box padding='4' bg='blue.400' maxW='3xl'>
                        There are many benefits to a joint design and development system. Not only
                        does it bring benefits to the design team, but it also brings benefits to
                        engineering teams. It makes sure that our experiences have a consistent look
                        and feel, not just in our design specs, but in production
                    </Box>
                    <Box padding='4' bg='red.400' maxW='3xl'>
                        There are many benefits to a joint design and development system. Not only
                        does it bring benefits to the design team, but it also brings benefits to
                        engineering teams. It makes sure that our experiences have a consistent look
                        and feel, not just in our design specs, but in production
                    </Box>
                    <Box padding='4' bg='yellow.400' maxW='3xl'>
                        There are many benefits to a joint design and development system. Not only
                        does it bring benefits to the design team, but it also brings benefits to
                        engineering teams. It makes sure that our experiences have a consistent look
                        and feel, not just in our design specs, but in production
                    </Box>
                </Container>
            </ScaleFadeCustom>
        </>
    )
}

export default CreateNFT;