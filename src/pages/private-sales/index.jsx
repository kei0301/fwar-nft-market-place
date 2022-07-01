import {
  Input,
  Text,
  HStack
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import ButtonSelect from 'components/ButtonSelect';
import { getEthersContract, BUSD } from 'dapp/getEthersContract';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { existUser } from 'store/userSlice';
import FWTVestingLockJson from 'contracts/FWarToken/FWTVestingLock.json'

function PrivateSales() {
  const { account } = useEthers();
  const { user } = useSelector((state) => state.user);
  const [isApprove, setIsApprove] = React.useState(false);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [investorInfo, setInvestorInfo] = React.useState([]);
  const FWTVestingLock = getEthersContract(FWTVestingLockJson.address,FWTVestingLockJson.abi);
  const getAmount = async (address) => {
    const data = await FWTVestingLock.getInvestor(address);
    setInvestorInfo(data);
    console.log(data);
  };


  const handleBuy = async (amount) => {
    try {
      if (amount > 0) {
        setIsLoading(true);
        amount = ethers.BigNumber.from(1e9).pow(2).mul(amount);
        const result = await FWTVestingLock.buy(amount);
        await result.wait();
        setIsLoading(false);
        getAmount(account);
        dispatch(existUser(account));

        toast.success('buy success');
      } else {
        toast.error('Amount > 0 ');
        setIsLoading(false);
      }
    } catch (error) {
      error.data ? toast.error(error.data.message) : toast.error(error.message);
      setIsLoading(false);
    }
  };
  const checkApprove = async (BUSD, account, FWTVestingLock) => {
    try {
      const allowance = await BUSD.allowance(
        account,
        FWTVestingLock.address // address FwarMarketDelegate
      );
      console.log('allowance', allowance);
      if (allowance > 0) setIsApprove(true);
    } catch (error) { console.log(error) }
  };

  const handleApprove = async (BUSD, fwtVestingLockAddress) => {
    console.log();
    try {
      setIsLoading(true);
      const result = await BUSD.approve(
        fwtVestingLockAddress,
        ethers.BigNumber.from(1e6).pow(3).mul(1000000)
      );
      const tx = await result.wait();
      console.log('tx', tx);
      checkApprove(BUSD, account, FWTVestingLock);
      setIsLoading(false);
      toast.success('approve successfully!');
    } catch (error) {
      error.data ? toast.error(error.data.message) : toast.error(error.message);
      setIsLoading(false);
    }
  };
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      const result = await FWTVestingLock.claim();
      await result.wait();
      setIsLoading(false);
      getAmount(account);
      dispatch(existUser(account));
      toast.success('buy success');
    } catch (error) {
      error.data ? toast.error(error.data.message) : toast.error(error.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (account && user) {
      checkApprove(BUSD, account, FWTVestingLock);
      getAmount(account);
    }
  }, [account, user]);

  return (
    <>
      <HStack w="50%" mb={10}>
        <Input
          placeholder="Token Amount"
          type="number"
          value={amount}
          onChange={(e) => handleChangeAmount(e)}
        />
        <ButtonSelect
          isLoading={isLoading}
          onClick={() => {
            isApprove
              ? handleBuy(amount)
              : handleApprove(BUSD, FWTVestingLock.address);
          }}
        >
          {isApprove ? `Buy` : `Approve`}
        </ButtonSelect>
      </HStack>

      <Text>Amount Of Month: {Number(investorInfo.amountOfMonth) / (1e18)}</Text>
      <Text>Claimed Amount: {Number(investorInfo.claimedAmount) / (1e18)}</Text>

      <HStack>
        <Text>Total Amount: {Number(investorInfo.totalAmount) / (1e18)}</Text>
        <ButtonSelect
          isLoading={isLoading}
          onClick={handleClaim}
        >
          Claim
        </ButtonSelect>
      </HStack>
    </>
  );
}

export default PrivateSales;
