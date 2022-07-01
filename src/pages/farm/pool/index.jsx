import React from 'react';

import {
  Badge,
  Box,
  Button,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
// -------------
// import FBNBUSD from './FBNB-Usdt';
import { getEthersContract } from 'dapp/getEthersContract';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { FiArrowUp, FiUnlock } from 'components/icon/feather';

import { useDispatch } from 'react-redux';
import { openModalWalletConnect } from 'store/metamaskSlice';
import ItemPool from './ItemPool';

async function requestAccount() {
  if (window.ethereum?.request) return window.ethereum.request({ method: 'eth_requestAccounts' });
  throw new Error(
    'Missing install Metamask. Please access https://metamask.io/ to install extension on your browser'
  );
}
function PoolContract({ theme, colorMode, account, FwarPool, pool }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit } = useDisclosure();
  const { isOpen: isOpenDraw, onOpen: onOpenDraw, onClose: onCloseDraw } = useDisclosure();
  const [totalSupply, setTotalSupply] = React.useState(0);
  const [myStake, setMyStake] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [key, setKey] = React.useState(0);
  // const { isOpenDraw, onOpenDraw, onCloseDraw } = useDisclosure();
  const Pool = getEthersContract(pool.address, pool.abi);

  const dispatch = useDispatch();
  const [isAllowance, setIsAllowance] = React.useState(false);
  const [amountWithdraw, setAmountWithdraw] = React.useState('');
  const [amountDeposit, setAmountDeposit] = React.useState('');

  const handleDeposit = async (contract, id, amount) => {
    try {
      if (amount) {
        setIsLoading(true);
        const result = await contract.poolStake(id, ethers.BigNumber.from(1e6).pow(3).mul(amount));
        await result.wait();
        setIsLoading(false);
        onCloseDeposit();
      }
      // await requestAccount();
    } catch (error) {
      if (error.code === -32603) {
        // console.log(error.code);
      }
      toast.error(error.message);
      setIsLoading(false);

      onCloseDeposit();
    }
  };
  const handleApprove = async (contract, spender) => {
    try {
      setIsLoading(true);

      await requestAccount();
      const result = await contract.approve(
        spender,
        ethers.BigNumber.from(1e6).pow(3).mul(1000000)
      );
      await result.wait();
      setIsLoading(false);

      // allowance && allowance > 0 ? setIsAllowance(true) : setIsAllowance(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);

      // console.error('message', error.message);
    }
  };
  const handleWithdraw = async (contract, id, amount) => {
    console.log(contract);
    // id pool, amount
    // id pool trong poolinfo
    try {
      setIsLoading(true);

      const poolWithdraw = await contract.poolWithdraw(
        id,
        ethers.BigNumber.from(1e6).pow(3).mul(amount)
      );
      await poolWithdraw.wait();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.data) {
        // console.log(error);
        toast.error(error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  const handleGetKey = async (contract, amount) => {
    try {
      console.log(pool);
      setIsLoading(true);
      const result = await FwarPool.getKey(pool.id);
      await result.wait();
      setIsLoading(false);
    } catch (error) {
      if (error.code === -32603) {
        console.log(error.code);
      }
      toast.error(error.message);
      setIsLoading(false);

      onCloseDeposit();
    }
  };
  React.useEffect(() => {
    const init = async () => {
      try {
        // const Contract = new ethers.Contract(FBNBUSD.address, FBNBUSD.abi, signer);
        if (account) {
          const allowance = await Pool.allowance(
            account,
            FwarPool.address // address fwar pool
          );

          allowance && allowance > 0 ? setIsAllowance(true) : setIsAllowance(false);

          const totalSupplyValue = await FwarPool.poolInfo('0');
          const numberTotalSupply = ethers.utils.formatEther(totalSupplyValue['lpSupply']._hex);

          setTotalSupply(numberTotalSupply);

          const myStakeInfo = await FwarPool.userInfo(pool.id, account);
          const numberMyStake = ethers.utils.formatEther(myStakeInfo.amount._hex);
          setMyStake(numberMyStake);

          const balanceOf = await Pool.balanceOf(account);
          const numberBalanceOf = ethers.utils.formatEther(balanceOf._hex);
          // console.log(balanceOf);

          setBalance(numberBalanceOf);
          const reward = await FwarPool.pendingKey(pool.id, account);
          const numberKey = ethers.utils.formatEther(reward._hex);
          setKey(numberKey);
          // console.log(reward);
        }
      } catch (error) { }
    };

    init();
  }, [account, handleDeposit, handleGetKey]);
  const handleSetMaxDeposit = () => {
    setAmountDeposit(Number(balance));
  };
  const handleSetMaxWithdraw = () => {
    setAmountWithdraw(Number(myStake));
  };
  return (
    <React.Fragment>
      <Box
        bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
        p={6}
        boxShadow={theme.shadows.content}
        position="relative"
      >
        {/* <Box position="absolute" w="100%" h="100%">
          <Spinner />
        </Box> */}

        {/* card header */}
        <Box display="flex" justifyContent="space-between">
          <Stack direction="row" spacing={-4}>
            <Tooltip label="USDT" hasArrow placement="top">
              <Box
                boxSize="50px"
                borderRadius="50%"
                border="2px solid white"
                cursor="pointer"
                transition="transform .25s ease"
                _hover={{ transform: 'scale(1.1)' }}
              >
                <Image src="/assets/token/usdt.png" />
              </Box>
            </Tooltip>
            <Tooltip label="BNB" hasArrow placement="top">
              <Box
                boxSize="50px"
                borderRadius="50%"
                border="2px solid white"
                cursor="pointer"
                transition="transform .25s ease"
                _hover={{ transform: 'scale(1.1)' }}
              >
                <Image src="/assets/token/bnb.png" />
              </Box>
            </Tooltip>
          </Stack>
          <Box textAlign="right">
            <Stack direction="row" justify="end">
              <Text fontWeight="semibold">USDT-BNB LP</Text>
              <Image boxSize="20px" borderRadius="50%" src="/assets/token/pancake.png" />
            </Stack>
            <Badge
              variant="solid"
              colorScheme="cyan"
              borderRadius="1rem"
              px={2}
              marginLeft="0.25rem"
            >
              15X
            </Badge>
            <Badge
              variant="solid"
              colorScheme="green"
              borderRadius="1rem"
              px={2}
              marginLeft="0.25rem"
            >
              APY: 64995 %
            </Badge>
            <Badge
              variant="solid"
              colorScheme="green"
              borderRadius="1rem"
              px={2}
              marginLeft="0.25rem"
            >
              APR: 653 %
            </Badge>
          </Box>
        </Box>

        {/* card body */}
        <ItemPool
          color="#28c76f"
          title="Total Staked"
          total={Intl.NumberFormat().format(totalSupply)}
        />
        <ItemPool
          color="#6610f2"
          title="Total USD Value"
          total={Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(totalSupply * 5)}
        />
        <ItemPool color="#ea5455" title="My Staked" total={Number(myStake).toFixed(6)} />
        <ItemPool color="#ff9f43" title="Balance" total={Number(balance).toFixed(6)} />
        <ItemPool
          color="#00cfe8"
          title="Key"
          reward={Number(key).toFixed(6)}
          handleGetKey={handleGetKey}
          isLoading={isLoading}
        />

        {/* action body */}
        {account ? (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)'
            }}
            gap={{ base: 1, sm: 4 }}
            mt={4}
          >
            <Button
              leftIcon={<FiUnlock />}
              isLoading={isLoading}
              w="full"
              color="white"
              bgColor="blue.base"
              borderRadius="2rem"
              _hover={{ boxShadow: theme.shadows.button }}
              onClick={
                isAllowance ? onOpenDeposit : () => handleApprove(Pool, FwarPool.address)
              }
            >
              {isAllowance ? `Deposit` : `Approve`}
            </Button>
            <Button
              leftIcon={<FiArrowUp />}
              w="full"
              color="white"
              bgColor="primary.base"
              borderRadius="2rem"
              marginRight="14px"
              _hover={{ boxShadow: theme.shadows.button }}
              onClick={onOpenDraw}
            >
              Withdraw
            </Button>
            {/* <Button
              w="full"
              // color="white"
              // bgColor="blue.base"
              borderRadius="2rem"
              _hover={{ boxShadow: theme.shadows.button }}
            >
              Swap
            </Button>
            <Button
              w="full"
              // color="white"
              // bgColor="primary.base"
              borderRadius="2rem"
              marginRight="14px"
              _hover={{ boxShadow: theme.shadows.button }}
            >
              Add Liquidity
            </Button> */}
          </Grid>
        ) : (
          <Button
            w="full"
            color="white"
            bgColor="primary.base"
            borderRadius="2rem"
            marginRight="14px"
            _hover={{ boxShadow: theme.shadows.button }}
            onClick={() => dispatch(openModalWalletConnect())}
          >
            Unlock
          </Button>
        )}
      </Box>

      {/* Modal Withdraw */}
      <Modal
        isOpen={isOpenDraw}
        onClose={() => {
          onCloseDraw();
          setAmountWithdraw(0);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
              <InputGroup size="sm">
                <InputLeftAddon children="Amount" />
                <Input
                  placeholder="0"
                  value={amountWithdraw}
                  type="number"
                  onChange={(e) => setAmountWithdraw(e.target.value)}
                />
                <Button onClick={handleSetMaxWithdraw}>Max</Button>
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              variant="solid"
              onClick={() => handleWithdraw(FwarPool, pool.id, amountWithdraw)}
            >
              Withdraw
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal Deposit */}

      <Modal
        isOpen={isOpenDeposit}
        onClose={() => {
          onCloseDeposit();
          setAmountWithdraw(0);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
              <InputGroup size="sm">
                <InputLeftAddon children="Amount" />
                <Input
                  placeholder="0"
                  value={amountDeposit}
                  type="number"
                  onChange={(e) => setAmountDeposit(e.target.value)}
                />
                <Button onClick={handleSetMaxDeposit}>Max</Button>
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              isLoading={isLoading}
              colorScheme="teal"
              loadingText="Depositing"
              onClick={() => handleDeposit(FwarPool, pool.id, amountDeposit)}
            >
              {isAllowance ? `Deposit` : `Approve`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default PoolContract;
