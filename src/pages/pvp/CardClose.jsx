import { Box, Image } from '@chakra-ui/react';

function CardClose({}) {
  // console.log('info', info);

  return (
    <>
      <Box>
        <Box position="relative">
          <Image
            src={`/assets/card-close/3.png`}
            width="100%"
            height="100%"
            // position="absolute"
            // top="0"
          />
        </Box>
      </Box>
    </>
  );
}

export default CardClose;
