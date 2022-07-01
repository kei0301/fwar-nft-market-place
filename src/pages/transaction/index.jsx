import React, { useEffect } from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useTheme } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import TransactionApi from 'apis/TransactionApi';
import { useSelector } from 'react-redux';
import TransactionDisplay from './TransactionDisplay';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

function Transaction() {
  const history = useHistory();
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { account } = useEthers();
  const { user } = useSelector((state) => state.user);
  const NftDatas = useSelector((state) => state.nftdata.NFT_Images);
  const [listMyTransaction, SetListMyTransaction] = React.useState([]);
  const [listAllTransaction, SetListAllTransaction] = React.useState([]);

  const [currentPageAll, setCurrentPageAll] = React.useState(1);
  const [currentPageMine, setCurrentPageMine] = React.useState(1);

  const [pagesQuantityMine, setMinePagesQuantity] = React.useState(1);
  const [pagesQuantityAll, setAllPagesQuantity] = React.useState(1);
  const [List_Transaction, setList_Transaction] = React.useState([]);

  const getMyTransaction = async () => {
    if (user) {
      const { data: listTrans } = await TransactionApi.getMyTrans({
        userId: user.address,
        page: currentPageMine
      });
      SetListMyTransaction(listTrans.docs);
      setMinePagesQuantity(listTrans.totalPages);
    }
  };
  const setPageAll = (page) => {
    setCurrentPageAll(page);
  };
  const setPageMine = (page) => {
    setCurrentPageMine(page);
  };
  const getAllTransaction = async (currentPageAll) => {
    if (user) {
      const { data: listTrans } = await TransactionApi.getAllTrans({
        page: currentPageAll
      });
      SetListAllTransaction(listTrans.docs);
      setAllPagesQuantity(listTrans.totalPages);
    }
    // console.log('allTrans', listTrans.docs);
  };

  useEffect(() => {
    if (NftDatas.length !== 0 && account) {
      setList_Transaction(NftDatas);
    } else {
      history.push('stand');
    }
  }, [account]);

  useEffect(() => {
    document.title = 'FWAR - TRANSACTIONS';
    getAllTransaction(currentPageAll);
    // console.log('1', currentPageAll);
    if (account) {
      getMyTransaction(currentPageMine);
    }
  }, [account, currentPageMine, user, currentPageAll]);

  return (
    <Tabs variant="unstyled">
      <TabList display="flex" justifyContent="center" mb={6}>
        <Tab _selected={{ color: 'white', bg: 'primary.base' }} borderRadius="6px">
          Mine
        </Tab>
        <Tab _selected={{ color: 'white', bg: 'primary.base' }} borderRadius="6px">
          All
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'} boxShadow="content">
          <TransactionDisplay
            isMine={true}
            Transactions={List_Transaction}
            listTransaction={listMyTransaction}
            getTransaction={setPageMine}
            pagesQuantity={pagesQuantityMine}
          />
        </TabPanel>
        <TabPanel bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'} boxShadow="content">
          <TransactionDisplay
            isMine={false}
            Transactions={List_Transaction}
            listTransaction={listAllTransaction}
            getTransaction={setPageAll}
            pagesQuantity={pagesQuantityAll}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Transaction;
