import { Box, Image, Text } from '@chakra-ui/react';
import ImageLoad from 'components/ImageLoad';

function DisplayOpened({ info }) {
  // console.log('info', info);
  return (
    <>
      <Box>
        <Box position="relative">
          {info && (
            <ImageLoad
              src={`/assets/card/rarity/${info['rarity']}.png`}
              width="100%"
              height="100%"
            />
          )}
          {info && (
            <ImageLoad
              src={`/assets/card/element/${info['element']}.png`}
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
            bottom="14%"
            left="0%"
            p="0"
            // color="white"
            align="center"
            color="#283046"
            fontSize={24}
            fontWeight="bold"
          >
            {/* <Text>NFT {info['tokenId']}</Text> */}
            <Text fontSize="13">NFT {info && info.nftId}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DisplayOpened;
