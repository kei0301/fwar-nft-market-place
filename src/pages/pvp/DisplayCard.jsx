import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { GiAlliedStar, GiCrossedSwords } from 'components/icon/game';

function DisplayCard({ info, text = false, mini }) {
  // console.log('info', info);

  return (
    <>
      <Box position="relative">
        <Stack position="absolute" top="0" right="0" zIndex="1"></Stack>
        {info && (
          <Image src={`/assets/card/rarity/${info['rarity']}.png`} width="100%" height="100%" />
        )}
        {info && (
          <Image
            src={`/assets/card/element/${info['element']}.png`}
            width="100%"
            height="100%"
            position="absolute"
            top="0"
          />
        )}
        {info && (
          <Image
            src={`/assets/char/T_${
              info['teamId'].teamId ? info['teamId'].teamId : info.teamId
            }.png`}
            width="100%"
            height="100%"
            position="absolute"
            top="0"
            left="11.5%"
            transform="translateX(-11.25%)"
          />
        )}

        {info && text && (
          <Box
            // bgRepeat="no-repeat"
            // bgSize="100% 100%"
            position="absolute"
            width="100%"
            bottom={mini ? "5.5%" : "11.5%"}
            left="0%"
            p="0"
            // color="white"
            align="center"
            color="#283046"
            fontSize={13}
            fontWeight="bold"
          >
            {!mini && (<Text>NFT {info['nftId']}</Text>)}
            <HStack justify="center" spacing={mini ? '0' : '24px'}>
              {/* <HStack fontSize={isDetail ? 23 : 13} spacing="5px"> */}
              {!mini && (
                <HStack fontSize={10} spacing="5px">
                  <GiAlliedStar />
                  <Text>{info && info.level}</Text>
                </HStack>
              )}
              <HStack fontSize={mini ? 7 : 10} spacing="5px">
                <GiCrossedSwords />
                <Text>{info && Math.floor(info.attack)}</Text>
              </HStack>
            </HStack>
          </Box>
        )}
      </Box>
    </>
  );
}

export default DisplayCard;
