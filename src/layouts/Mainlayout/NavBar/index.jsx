import FilterComponent from 'components/FilterComponent';
import { openDrawer } from 'store/customizationSlice';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useTheme,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FiSettings } from 'components/icon/feather';
import { useDispatch, useSelector } from 'react-redux';
import { Account } from './Account';
import { regionDropdown } from './regionDropdown';
import UserApi from 'apis/UserApi';
import { useEffect, useState } from 'react';
import ButtonSelect from 'components/ButtonSelect';
import toast from 'react-hot-toast';
import { existUser } from 'store/userSlice';
import { useEthers } from '@usedapp/core';

function NavBar() {
  const { account } = useEthers();

  const [name, setName] = useState('');
  const [existName, setExistName] = useState(true);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(user);
  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);
  // const { ethereum } = window;
  // if (ethereum) {
  //   // ethereum.request({ method: 'eth_requestAccounts' });
  // } else {
  //   // const onboarding = new MetaMaskOnboarding({ forwarderOrigin: 'http://localhost:3000' });
  //   // onboarding.startOnboardizng();
  // }
  const handleChangeName = async (e) => {
    setName(e.target.value);
    if (e.target.value.length > 4) {
      const { data: existName } = await UserApi.existUser(user._id, e.target.value);
      setExistName(existName);
    } else {
      setExistName(true);
    }
  };
  const handleSaveSettingAccount = async () => {
    try {
      await UserApi.updateName({ userId: user._id, name: name });
      toast.success('Setting success');
      dispatch(existUser(account));
      onClose();
    } catch (error) {
      error.data ? toast.error(error.data.message) : toast.error(error.message);
    }
  };
  const handleCloseModal = () => {
    setName(user.name);
    setExistName(true);
  };
  return (
    <>
      <Box
        as="nav"
        bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
        pos="fixed"
        top="0"
        right="0"
        w={{
          base: 'calc(100% - 56px)',
          xl: 'calc(100% - 56px - 260px)'
        }}
        m="1.3rem 28px 0"
        borderRadius="md"
        zIndex="100"
        boxShadow={theme.shadows.content}
      >
        <Stack direction="row" align="center" justify="space-between" p="0.8rem 1rem">
          <Stack direction="row" align="center">
            <IconButton
              variant="ghost"
              color={colorMode === 'dark' ? 'white.base' : 'primary.dark'}
              aria-label="color mode"
              onClick={handleOpenDrawer}
              icon={<HamburgerIcon />}
              display={{
                base: 'block',
                xl: 'none'
              }}
            />
            {/* <Text>English</Text> */}
            {/* <IconButton
              variant="ghost"
              color={colorMode === 'dark' ? 'white.base' : 'primary.base'}
              aria-label="color mode"
              onClick={toggleColorMode}
              icon={<MoonIcon />}
            /> */}
          </Stack>
          <Stack direction="row" align="center">
            {user && (
              <Box
                bg="primary.base"
                px={4}
                py={1.5}
                borderRadius="10rem"
                color="white.base"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ boxShadow: '0 8px 25px -8px #FEBE43;' }}
                transition="color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,background 0s,border 0s"
                fontSize={{
                  base: '11px',
                  sm: '13px',
                  md: '15px'
                }}
              >
                Tickets: {user.ticket}
              </Box>
            )}
            <Account />

          </Stack>
        </Stack>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleCloseModal();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="row" align="center">
              <Image src="favicon.ico" h="50px" />
              <Stack w="100%">
                {/* <FilterComponent placeholder="Select Region" optionDropdown={regionDropdown} /> */}
                {/* <Text>You can choose your region now</Text> */}

                <InputGroup>
                  <Input
                    value={name}
                    placeholder="Name"
                    size="md"
                    onChange={(e) => handleChangeName(e)}
                  // isInvalid={existName}
                  />
                  <InputRightElement
                    children={
                      (user && user.name === name) || !existName ? (
                        <CheckIcon color="green.600" />
                      ) : (
                        <CloseIcon color="red.600" />
                      )
                    }
                  />
                </InputGroup>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonSelect
              // variant="ghost"
              w="100%"
              isDisabled={existName || (user && user.name === name)}
              onClick={handleSaveSettingAccount}
            >
              Save
            </ButtonSelect>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NavBar;
