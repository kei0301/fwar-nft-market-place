import { Alert, AlertDescription, AlertTitle } from '@chakra-ui/alert';
import { CloseButton } from '@chakra-ui/close-button';

function AlertNews({ content, id, onClose }) {
  return (
    <>
      <Alert
        status="success"
        color="success.base"
        borderRadius="0.4rem"
        fontSize="0.9rem"
        py="10px"
        mb="0.8rem"
        transition="all .25s ease"
      >
        {/* <AlertIcon />  */}
        <AlertTitle mr={2} fontWeight="medium">
          {content}
        </AlertTitle>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => onClose(id)}
        />
      </Alert>
    </>
  );
}

export default AlertNews;
