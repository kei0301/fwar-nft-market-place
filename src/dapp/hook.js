import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

export function useAllMyKey(FWK) {

  const { account } = useEthers();
  const [allMyKey, setAllMyKey] = useState(0);

  useEffect(() => {
    if (account) {


      (async () => {

        try {
          const allMyKeyBigNumber = await FWK.balanceOf(account);
          const allMyKey = ethers.utils.formatEther(allMyKeyBigNumber._hex);
          setAllMyKey(allMyKey);
        } catch (error) {
           console.log(error);
        }
      })();
    }
  }, [account, FWK]);
  return allMyKey;
}

export function useDailyRewards(fwarPool) {
  const { account } = useEthers();
  const [dailyRewards, setDailyRewards] = useState(0);
  useEffect(() => {
    if (account) {
      (async () => {
        try {
          const key = await fwarPool.keyPerBlock();
          const dailyReward = ethers.utils.formatEther(key._hex) * 20 * 60 * 24;
          setDailyRewards(dailyReward);
        } catch (error) {

        }
      })();
    }
  }, [account, fwarPool]);
  return dailyRewards;
}
export function useTotalStakedAndPendingKey(fwarPool, listPool, namePool) {
  const { account } = useEthers();
  const [pendingKeyState, setPendingKeyState] = useState(0);
  const [totalStake, setTotalStake] = useState(0);
  useEffect(() => {
    if (account) {
      (async () => {
        try {
          let totalStake = 0;
          let totalPendingKey = 0;
          for (let i = 0; i < listPool.length; i++) {
            const pool = await fwarPool.poolInfo(listPool[i].id);
            const pendingKey = await fwarPool.pendingKey(listPool[i].id, account);
            const numberPendingKey = ethers.utils.formatEther(pendingKey._hex);
            const lpSupply = ethers.utils.formatEther(pool[namePool]._hex);
            totalStake += Number(lpSupply);
            totalPendingKey += Number(numberPendingKey);
          }
          setTotalStake(totalStake * 5);
          setPendingKeyState(totalPendingKey);
        } catch (error) { }
      })();
    }
  }, [account, fwarPool, listPool, namePool]);
  return [pendingKeyState, totalStake];
}

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}
