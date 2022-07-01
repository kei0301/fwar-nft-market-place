import React from 'react';

import { Box, useColorMode, useColorModeValue, useTheme, ScaleFade, Stack, Spinner } from '@chakra-ui/react';
import ModalWalletConnect from 'components/ModalWalletConnect';
import ScrollButton from 'components/ScrollButton';
import toast, { Toaster } from 'react-hot-toast';

import { useEthers, useEtherBalance, useTransactions } from '@usedapp/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalWalletConnect } from 'store/metamaskSlice';
import DrawerMain from './Drawer';
import NavBar from './NavBar';

import { useContact } from 'utils/usecontract';
import { FlagF, SetNfts } from 'store/nftData';
import { useHistory } from 'react-router-dom';

export default function MainLayout({ children }) {

  const history = useHistory();
  const contract = useContact();
  const dispatch = useDispatch();
  const NftDatas = [...useSelector((state) => state.nftdata.NFT_Images)]
  const AddFlag = useSelector((state) => state.nftdata.NewFlag);

  const { colorMode } = useColorMode();
  const theme = useTheme();
  const { account } = useEthers();

  const bg = useColorModeValue('white', theme.colors.dark.light);
  const color = useColorModeValue('#6e6b7b', 'white');

  const closeModalWallet = () => {
    dispatch(closeModalWalletConnect());
  };
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(async () => {
    if (account) {
      if (AddFlag === true || NftDatas.length === 0) {
        if (contract?.methods === undefined) return;
        setIsLoading(true);
        const nftData = [];
        const counter = await contract.methods.elementCrystalCounter().call();
        for (let i = 1; i <= counter; i++) {
          const nft = await contract.methods.allElementCrystals(i).call();
          nftData.push(nft);
        }
        dispatch(FlagF());
        dispatch(SetNfts(nftData));
        setIsLoading(false);
      }
    } else {
      toast.error('Connect Wallet')
      history.push('stand')
    }
  }, [AddFlag, account])

  return (
    <React.Fragment>
      <Box bg={colorMode === 'dark' ? theme.colors.dark.base : 'white'} color={color} h="100%">
        <Box
          w="16.25rem"
          // h="100%"
          bg={bg}
          boxShadow={theme.shadows.content}
          display={{
            base: 'none',
            xl: 'block'
          }}
          position="fixed"
          zIndex="10"
          h="100%"
        >
          <DrawerMain />
        </Box>

        {/* Nav bar */}
        <NavBar />

        {/* Content */}
        <Box
          position="relative"
          bg={colorMode === 'dark' ? theme.colors.dark.base : 'light'}
          w={{
            base: 'full',
            xl: 'calc(100% - 260px)'
          }}
          ml={{
            base: '0px',
            xl: '260px'
          }}
          p="7rem 28px 0"
        // overflowY="scroll"
        >
          <Box
            position="fixed"
            w="100%"
            pt="2.2rem"
            left="0"
            top="0"
            bgGradient={
              colorMode === 'dark'
                ? 'linear-gradient(180deg,rgba(22,29,49,.9) 44%,rgba(22,29,49,.43) 73%,rgba(22,29,49,0))'
                : 'linear-gradient(180deg,hsla(0,0%,97.3%,.95) 44%,hsla(0,0%,97.3%,.46) 73%,hsla(0,0%,100%,0))'
            }
            zIndex="8"
          />

          {children}
          <ModalWalletConnect onClose={closeModalWallet} />
          <ScrollButton />
        </Box>
      </Box>
      <Box zIndex="toast">
        <Toaster />
      </Box>
      {isLoading && (
        <Stack
          direction="row"
          justify="center"
          align="center"
          pos="absolute"
          zIndex="docked"
          bg="#98989d"
          opacity="1"
          inset="0"
          position='fixed'
          zIndex='9999'
        >
          <Spinner
            thickness='5px'
            speed='0.45s'
            emptyColor='yellow'
            color='red'
            size='xl'
            position='absolute'
            left='50%'
            top='50%'
          />
        </Stack>
      )}
    </React.Fragment>
  );
}
