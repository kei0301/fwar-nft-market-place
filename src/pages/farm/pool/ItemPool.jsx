import {
  Badge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';

function ItemPool({ color, title, reward, total, handleGetKey, isLoading }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack direction="row" justify="space-between" mt={6} mb={2}>
        <Stack direction="row" align="center">
          <Box p={1} border="4px" borderColor={color} borderRadius="50%" />
          <Text fontWeight="medium" fontSize="0.9rem">
            {title}
          </Text>
        </Stack>
        {total && <Text>{total}</Text>}
        {reward && (
          <>
            <Badge
              display="flex"
              alignItems="center"
              variant="solid"
              colorScheme="cyan"
              borderRadius="1rem"
              px={2}
              cursor="pointer"
              onClick={onOpen}
            >
              {reward} key
            </Badge>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Get Keys</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>KEY: {reward}</Box>
                </ModalBody>

                <ModalFooter>
                  <Button variant="solid" isLoading={isLoading} onClick={handleGetKey}>
                    Get key
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Stack>
    </>
  );
}

export default ItemPool;
