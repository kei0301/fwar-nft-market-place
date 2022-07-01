import ImageLoad from 'components/ImageLoad';
import { MinusIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { GiAlliedStar, GiCrossedSwords } from 'components/icon/game';
function DisplayOpenedCards({ info, isCart = false, onremove }) {
  // console.log('info', info);

  return (
    <>
      <Box>
        <Box position="relative">
          <Stack position="absolute" top="0" right="0" zIndex="1">
            {isCart && (
              <IconButton
                position="relative"
                icon={<MinusIcon />}
                colorScheme="red"
                onClick={onremove}
              ></IconButton>
            )}
          </Stack>
          {info && (
            <ImageLoad
              src={`/assets/card/rarity/${info['rarity']}.png`}
              placeholder="loading"
              alt="rarity"
              width="100%"
              height="100%"
            />
            // <Image src={`/assets/card/rarity/${info['rarity']}.png`} width="100%" height="100%" />
          )}
          {info && (
            <ImageLoad
              src={`/assets/card/element/${info['element']}.png`}
              placeholder="loading"
              alt="element"
              width="100%"
              height="100%"
              position="absolute"
              top="0"
            />
          )}
          {info && (
            <ImageLoad
              src={`/assets/char/T_${
                info['teamId'].teamId ? info['teamId'].teamId : info.teamId
              }.png`}
              placeholder="loading"
              alt="element"
              width="100%"
              height="100%"
              position="absolute"
              top="0"
              left="11.5%"
              transform="translateX(-11.25%)"
            />
          )}

          <Box
            // bgRepeat="no-repeat"
            // bgSize="100% 100%"
            position="absolute"
            width="100%"
            bottom="12%"
            left="0%"
            p="0"
            // color="white"
            align="center"
            color="#283046"
            fontSize={24}
            fontWeight="bold"
          >
            {/* <Text>NFT {info['tokenId']}</Text> */}
            <Text fontSize="60%">NFT {info && info.nftId}</Text>
            <HStack justify="center" spacing="24px" fontSize="50%">
              <HStack spacing="5px">
                <GiAlliedStar />
                <Text>{info && info.level}</Text>
              </HStack>
              <HStack spacing="5px">
                <GiCrossedSwords />
                <Text>{info && info.attack}</Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DisplayOpenedCards;
