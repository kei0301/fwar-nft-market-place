import ABI from 'assets/abi.json';
import { useEthers } from '@usedapp/core'
import Web3 from 'web3';
import { NETWORK } from 'constants/index';

export const useDefaltContact = () => {
  if (NETWORK[3] === undefined) return;
  const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK[3].rpcUrls[0]));
  const dcontract = new web3.eth.Contract(ABI, NETWORK[3].contractAddress);
  return { web3, dcontract };
};

export const useContact = () => {
  const { library, account, chainId } = useEthers();
  if (account) {
    const web3 = new Web3(library.provider);
    return new web3.eth.Contract(ABI, '0x1cC0FdAc4733D60BfDd1777A18155b0683304B79');
  }
};