import React from 'react';

import ScaleFadeCustom from 'components/ScaleFadeCustom';
import { FWK, FwarPool } from 'dapp/getEthersContract';
import { useAllMyKey, useDailyRewards, useTitle, useTotalStakedAndPendingKey } from 'dapp/hook';
import { Box, Grid, useColorMode, useTheme } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import AlertNews from './AlertNews';
import PoolContract from './pool';
import LPFBNBUSD from './pool/FBNB-Usdt';
import Statistics from './Statistics';

// fake data
const news = [
  { id: 1, content: 'new message 1' },
  { id: 2, content: 'new message 2' }
];
const listPool = [{ id: '0', address: LPFBNBUSD.address, abi: LPFBNBUSD.abi }];

const Farm = () => {
  useTitle('FWAR - FARM');

  const [newState, setNewSate] = React.useState([]);
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const { account } = useEthers();

  const [pendingKeyState, totalStake] = useTotalStakedAndPendingKey(FwarPool, listPool, 'lpSupply');

  const allMyKey = useAllMyKey(FWK);
  const dailyRewards = useDailyRewards(FwarPool);

  const handleCloseMessage = (id) => {
    const newList = newState.filter((i) => i.id !== id);
    setNewSate(newList);
  };

  const alerts = newState?.map((i) => (
    <AlertNews key={i.id} id={i.id} content={i.content} onClose={handleCloseMessage} />
  ));
  return (
    <>
      <ScaleFadeCustom>
        {alerts}

        {/* Statistics */}

        <Box
          bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
          marginBottom="2rem"
          borderRadius="md"
          boxShadow={theme.shadows.content}
        >
          <Statistics
            totalStake={totalStake}
            dailyRewards={dailyRewards}
            allMyKey={allMyKey}
            pendingKeyState={pendingKeyState}
          />
        </Box>
        <Box marginBottom="2rem">
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={6}
          >
            {listPool?.map((pool) => (
              <PoolContract
                key={pool.id}
                theme={theme}
                colorMode={colorMode}
                account={account}
                // signer={signer}
                FwarPool={FwarPool}
                pool={pool}
              />
            ))}
          </Grid>
        </Box>
      </ScaleFadeCustom>
    </>
  );
};
export default Farm;
