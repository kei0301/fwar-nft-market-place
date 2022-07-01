import React from 'react';
import './App.css';
import { ChainId, DAppProvider } from '@usedapp/core';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Routes from './routes';
import Loader from 'components/Loader';

const config = {
  // readOnlyChainId:  ChainId.BSC : ChainId.BSCTESTNET,
  // readOnlyUrls: {
  //   [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  //   [ChainId.BSCTESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  // },
  multicallAddresses: {
    97: '0x334b708c94b9Dc62F7AB6708450Eb90b2903375a',
    56: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
  },
  supportedChains: [97, 56, 3]
};

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <DAppProvider config={config}>
        <ChakraProvider theme={theme}>
          <Routes />
        </ChakraProvider>
      </DAppProvider>
    </React.Suspense>
  );
}
export default App;
