import React from 'react';
import { isMetaMaskInstalled } from 'dapp/metamask';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useClipboard
} from '@chakra-ui/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useEthers } from '@usedapp/core';
import { useSelector } from 'react-redux';

function ModalWalletConnect({ onClose }) {
  const onboarding = React.useRef();

  // const { active, error, account, library, connector, activate, deactivate } = useWeb3React();
  const { isOpenModalWallet } = useSelector((state) => state.metamask);

  const { activateBrowserWallet, deactivate, account } = useEthers();
  const { hasCopied, onCopy } = useClipboard(account);
  function handleDeactivateAccount() {
    deactivate();
  }
  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  React.useEffect(() => {
    if (isMetaMaskInstalled()) activateBrowserWallet();
  }, []);
  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((newAccounts) => {
        activateBrowserWallet();
      });
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <>
      <Modal isOpen={isOpenModalWallet} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="26rem">
          <ModalHeader>{account ? `Connect To Wallet` : `Your Wallet Address`} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {account ? (
              <Stack direction="column" align="center" mb={4}>
                <Text fontSize="14px" mb={2}>
                  {account}
                </Text>
                <Flex alignContent="center" m={3}>
                  <Button
                    variant="link"
                    color="gray.400"
                    fontWeight="normal"
                    fontSize="sm"
                    _hover={{
                      textDecoration: 'none',
                      color: 'primary.base'
                    }}
                    onClick={onCopy}
                  >
                    <CopyIcon mr={1} />
                    {hasCopied ? 'Copied' : 'Copy Address'}
                  </Button>
                  <Link
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    href={`https://testnet.bscscan.com/address/${account}`}
                    isExternal
                    color="gray.400"
                    ml={6}
                    _hover={{
                      color: 'primary.base',
                      textDecoration: 'underline'
                    }}
                  >
                    <ExternalLinkIcon mr={1} />
                    View on Explorer
                  </Link>
                </Flex>
                <Button borderRadius="10rem" onClick={handleDeactivateAccount}>
                  Logout
                </Button>
              </Stack>
            ) : (
              <Box mb={4} borderRadius="4px">
                <Stack
                  direction="row"
                  align="center"
                  justify="start"
                  border="1px solid rgba(34,41,47,.125)"
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{
                    bg: '#f8f8f8'
                  }}
                  onClick={onClick}
                >
                  <Image src="/assets/token/metamaskicon.svg" />
                  <Text>Metamask</Text>
                </Stack>
                <Stack
                  direction="row"
                  align="center"
                  justify="start"
                  border="1px solid rgba(34,41,47,.125)"
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{
                    bg: '#f8f8f8'
                  }}
                >
                  <Image src="/assets/token/binanceWallet.svg" />
                  <Text>Binance Chain Wallet</Text>
                </Stack>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalWalletConnect;
