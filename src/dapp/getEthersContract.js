import FwarCharJson from 'contracts/FwarChar/FWarChar.json';
import FwarCharDelegateJson from 'contracts/FwarChar/FwarCharDelegate.json';
import FwarMarketDelegateJson from 'contracts/FwarMarket/FwarMarketDelegate.json';
import FwarPoolJson from 'contracts/FwarPool/FwarPools.json';
import FwarTicketJson from 'contracts/FWarTicket/FwarTicket.json';
import Usdt from 'contracts/Usdt.json';
import FwarKeyJson from 'contracts/FwarKey/FWarKey.json';
import FWTVestingLockJson from 'contracts/FWarToken/FWTVestingLock.json'
import { ethers } from 'ethers';

export const getEthersContract = (address, abi) => {
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access if needed
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(address, abi, signer);
      // Accounts now exposed
    } catch (error) {
      // console.log(error);
      return;
    }
  }
};
export const networkChainId = (contract) => {
  console.log(process.env.REACT_APP_ISMAIN)
  if (process.env.REACT_APP_ISMAIN === "1") {
    return contract.networks[56].address;
  }
  return contract.networks[97].address;
};
export const FwarChar = getEthersContract(networkChainId(FwarCharJson), FwarCharJson.abi);
export const FwarCharDelegate = getEthersContract(
  networkChainId(FwarCharDelegateJson),
  FwarCharDelegateJson.abi
);

export const FwarMarketDelegate = getEthersContract(networkChainId(FwarMarketDelegateJson), FwarMarketDelegateJson.abi);
export const BUSD = getEthersContract(networkChainId(Usdt), Usdt.abi);

export const FWK = getEthersContract(networkChainId(FwarKeyJson), FwarKeyJson.abi);
export const FwarPool = getEthersContract(networkChainId(FwarPoolJson), FwarPoolJson.abi);
export const FwarTicket = getEthersContract(networkChainId(FwarTicketJson), FwarTicketJson.abi);
// export const FWTVestingLock = getEthersContract(networkChainId(FWTVestingLockJson), FWTVestingLockJson.abi);

