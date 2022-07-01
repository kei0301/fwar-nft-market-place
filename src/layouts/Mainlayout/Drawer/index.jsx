import { FiMoon, FiSun } from 'components/icon/feather';
import { closeDrawer } from 'store/customizationSlice';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Stack,
  useColorMode
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuList from './MenuList';

export default function DrawerMain() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { openState } = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  return (
    <>
      <Box>
        <Box>
          <Flex justifyContent="center" alignItems="center">
            <Box></Box>
            <Link to="/">
              <Stack direction="row" justify="center" align="center">
                <Image h="36px" src="/assets/favicon.svg" alt="LOGO" />
              </Stack>
            </Link>
            <Link to="/">
              <Stack direction="row" justify="center" align="center">
                <Image h="100px" src="/assets/logo.png" alt="LOGO" />
              </Stack>
            </Link>
            <Box>
              {/* <Switch colorScheme="orange" /> */}
              <IconButton
                variant="ghost"
                // color={colorMode === 'dark' ? 'white.base' : 'primary.base'}
                color="primary.base"
                aria-label="color mode"
                onClick={toggleColorMode}
                icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
              />
            </Box>
          </Flex>
        </Box>

        <Box p={(2, 3)}>
          {/* <Text m="0.8rem" textTransform="uppercase" fontWeight="medium" fontSize="0.9rem">
            menu
          </Text> */}
          <MenuList />
        </Box>

        <Box></Box>
      </Box>

      <Drawer isOpen={openState} placement="left" onClose={handleCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Box></Box>
              <Stack direction="row" justify="center" align="center">
                <Image h="100px" src="/assets/logo.png" alt="LOGO" />
              </Stack>
              <IconButton
                variant="ghost"
                // color={colorMode === 'dark' ? 'white.base' : 'primary.base'}
                color="primary.base"
                aria-label="color mode"
                onClick={toggleColorMode}
                icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
              />
              {/* <IconButton
                variant="ghost"
                color={colorMode === 'dark' ? 'white.base' : 'primary.dark'}
                aria-label="color mode"
                onClick={handleCloseDrawer}
                icon={<CloseIcon />}
              /> */}
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            {/* <Text
                m="0.8rem"
                textTransform="uppercase"
                fontWeight="medium"
                fontSize="0.9rem"
                color="secondary.base"
              >
                menu
              </Text> */}
            <MenuList handleCloseDrawer={handleCloseDrawer} />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
