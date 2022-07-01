import ScaleFadeCustom from 'components/ScaleFadeCustom';
import React from 'react';
import { Box, Text, Flex, Icon, Stack } from '@chakra-ui/react';

function CombatReward() {
  return (
    <>
      <ScaleFadeCustom>
        <Box
          p="1.5rem"
          pos="relative"
          bg="linear-gradient(118deg,#FEBE43,rgba(247,196,87,.7))"
          color="white"
          borderRadius="8px"
          mb={7}
        >
          {/* <Box pos="absolute" top={0} left={0}>
          <GroupLeftIcon />
        </Box>
        <Box pos="absolute" top={0} right={0}>
          <GroupRightIcon />
        </Box> */}
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Flex
              justifyContent="center"
              alignItems="center"
              w={{ base: '40px', md: '50px', lg: '70px' }}
              h={{ base: '40px', md: '50px', lg: '70px' }}
              borderRadius="100%"
              bg="primary.base"
              boxShadow="0 4px 24px 0 rgba(34,41,47,.1)"
              // mb="1.5rem"
            >
              {/* <Icon as={FiAward} w="28px" h="28px" /> */}
              asdfasdf
            </Flex>
            <Text
              as="h4"
              textTransform="capitalize"
              // mb="1.5rem"
              fontSize={{
                base: '24px',
                md: '36px',
                lg: '50px'
              }}
              fontWeight="bold"
              lineHeight="60px"
            >
              Play To Earn
            </Text>
          </Flex>
        </Box>
      </ScaleFadeCustom>
    </>
  );
}

export default CombatReward;
