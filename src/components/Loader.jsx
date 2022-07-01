import { Spinner } from '@chakra-ui/react';
//-----------------------|| Loader ||-----------------------//

const Loader = (props) => {
  return (
    // <Box position="absolute" top="0" width="100%" height="100%">
    <Spinner color="primary.base" thickness="4px" speed="0.65s" {...props} />
    // </Box>
  );
};

export default Loader;
