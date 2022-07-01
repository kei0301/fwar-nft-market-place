import { FiActivity, FiAward, FiKey, FiTrendingUp } from 'components/icon/feather';
import { Box, Grid, Icon, Stack, Text } from '@chakra-ui/react';
import GroupLeftIcon from './GroupLeftIcon';
import GroupRightIcon from './GroupRightIcon';

function Statistics({ totalStake, dailyRewards, allMyKey, pendingKeyState }) {
  const dataStatistics = [
    {
      id: 1,
      icon: FiTrendingUp,
      iconColor: 'primary.base',
      bgIcon: 'rgba(115,103,240,.12)',
      total: totalStake && Intl.NumberFormat().format(totalStake),
      content: 'Total Staked'
    },
    {
      id: 2,
      icon: FiActivity,
      iconColor: 'blue.base',
      bgIcon: 'rgba(0,207,232,.12)',
      total: `${Intl.NumberFormat().format(dailyRewards)} KEYS`,
      content: 'Daily Rewards'
    },
    {
      id: 3,
      icon: FiAward,
      iconColor: 'red.base',
      bgIcon: 'rgba(234,84,85,.12)',
      total: `${Intl.NumberFormat().format(pendingKeyState)} KEY`,
      content: 'Pending Rewards'
    },
    {
      id: 4,
      icon: FiKey,
      iconColor: 'green.base',
      bgIcon: 'rgba(40,199,111,.12)',
      total: Intl.NumberFormat().format(allMyKey),
      content: 'All My Keys'
    }
  ];
  const itemStatistic = dataStatistics.map((item) => {
    return (
      <Stack key={item.id} w="100%" direction="row">
        <Stack direction="row" align="center">
          <Stack
            w={12}
            h={12}
            direction="row"
            justify="center"
            align="center"
            bg={item.bgIcon}
            marginRight={4}
            borderRadius="50%"
          >
            <Icon as={item.icon} w={6} h={6} color={item.iconColor} />
          </Stack>
        </Stack>
        <Stack direction="column">
          <Text fontWeight="semibold">$ {item.total}</Text>
          <Text fontSize="0.8rem">{item.content}</Text>
        </Stack>
      </Stack>
    );
  });
  return (
    <>
      <Box p={10} pos="relative">
        <Box pos="absolute" top={0} left={0}>
          <GroupLeftIcon />
        </Box>
        <Box pos="absolute" top={0} right={0}>
          <GroupRightIcon />
        </Box>
        <Box mb={10} align="center">
          <Text as="h4" textTransform="capitalize" fontSize="50px" fontWeight="bold">
            statistics
          </Text>
        </Box>
        <Box>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            }}
            gap={6}
            alignItems="center"
          >
            {itemStatistic}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Statistics;
