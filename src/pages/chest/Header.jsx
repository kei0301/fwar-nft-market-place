import { Box, Text } from '@chakra-ui/react';
import GroupLeftIcon from '../farm/GroupLeftIcon';
import GroupRightIcon from '../farm/GroupRightIcon';

function Header({ totalStake, dailyRewards, allMyKeyState, pendingKeyState }) {
  return (
    <>
      <Box p={10} pos="relative">
        <Box pos="absolute" top={0} left={0}>
          <GroupLeftIcon />
        </Box>
        <Box pos="absolute" top={0} right={0}>
          <GroupRightIcon />
        </Box>
        <Box align="center">
          <Text
            as="h4"
            textTransform="capitalize"
            fontSize="50px"
            fontWeight="bold"
            lineHeight="60px"
          >
            Chest
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default Header;
