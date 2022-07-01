import { usePagination } from '@ajna/pagination';
import {
  Box,
  Input,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorMode,
  useTheme,
  Td,
  Tooltip,
  Text,
  Link,
  Icon,
  HStack
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import HistoryBuyTicketApi from 'apis/HistoryBuyTicket';
import ButtonSelect from 'components/ButtonSelect';
import { FwarTicket, BUSD } from 'dapp/getEthersContract';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { BSC_TRANSACTION_URL } from 'utils/config';
import moment from 'moment';
import { FiEye } from 'components/icon/feather';
import PaginatorCustom from 'components/PaginatorCustom';
import { existUser } from 'store/userSlice';

function Transaction() {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { account } = useEthers();
  const { user } = useSelector((state) => state.user);
  const [isApprove, setIsApprove] = React.useState(false);
  const dispatch = useDispatch();

  const [listMyTicket, setListMyTicket] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [pagesQuantity, setPagesQuantity] = React.useState(1);

  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pagesQuantity,
    initialState: { currentPage: 1 },
    limits: {
      outer: 2,
      inner: 2
    }
  });

  const getMyTicket = async (address, currentPage) => {
    const { data } = await HistoryBuyTicketApi.getTicket(address, currentPage);
    setListMyTicket(data.docs);
    // console.log('allTrans', data.docs);
  };

  const handleBuyTicket = async (USDTContract, amount) => {
    if (amount > 0) {
      setIsLoading(true);
      const result = await FwarTicket.buyTicket(USDTContract.address, amount);
      await result.wait();
      setIsLoading(false);
      getMyTicket(account, currentPage);
      dispatch(existUser(account));

      toast.success('buy success');
    } else {
      toast.error('Amount > 0 ');
      setIsLoading(false);
    }
  };
  const checkApprove = async (USDTContract, account, fwarTicket) => {
    try {
      const allowance = await USDTContract.allowance(
        account,
        fwarTicket.address // address FwarMarketDelegate
      );
      console.log('allowance', allowance);
      if (allowance > 0) setIsApprove(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (USDTContract, fwarTicketAddress) => {
    console.log();
    try {
      setIsLoading(true);
      const result = await USDTContract.approve(
        fwarTicketAddress,
        ethers.BigNumber.from(1e6).pow(3).mul(1000000)
      );
      const tx = await result.wait();
      console.log('tx', tx);
      checkApprove(USDTContract, account, FwarTicket);
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
  React.useEffect(() => {
    document.title = 'FWAR - TICKET';
    // console.log('1', currentPage);
    if (account && user) {
      checkApprove(BUSD, account, FwarTicket);
      getMyTicket(account, currentPage);
    }
  }, [account, user]);

  return (
    <>
      <HStack w="50%" mb={10}>
        <Input
          placeholder="count ticket"
          type="number"
          value={amount}
          onChange={(e) => handleChangeAmount(e)}
        />
        <ButtonSelect
          isLoading={isLoading}
          onClick={() => {
            isApprove
              ? handleBuyTicket(BUSD, amount)
              : handleApprove(BUSD, FwarTicket.address);
          }}
        >
          {isApprove ? `Buy Ticket` : `Approve`}
        </ButtonSelect>
        {/* <ButtonSelect onClick={handleSetTokenAdd}>Set Token add</ButtonSelect> */}
      </HStack>
      <Table variant="simple">
        <Thead bgColor="gray.200">
          <Tr>
            <Th>Create At</Th>
            <Th>Pay Token</Th>
            <Th>Amount</Th>
            <Th>Tx</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listMyTicket &&
            listMyTicket.length > 0 &&
            listMyTicket.map((ticket) => (
              <Tr key={ticket.transactionHash}>
                <Td w="25%">{moment(ticket.createdAt).format('DD/MM/YYYY HH:MM:ss')}</Td>
                <Td w="">
                  <Tooltip label={ticket.payToken} aria-label="A tooltip">
                    <Text>
                      {ticket.payToken}
                      {/* {ticket.payToken.substr(ticket.payToken.length - 4, 4)} */}
                    </Text>
                  </Tooltip>
                </Td>
                <Td w="">{ticket.amount}</Td>

                <Td>
                  <Link href={`${BSC_TRANSACTION_URL + ticket.transactionHash}`} isExternal>
                    <Icon color="primary.base" as={FiEye} />
                  </Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Box my={5}>
        <PaginatorCustom
          pagesQuantity={pagesQuantity > 0 && pagesQuantity}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pagesCount={pagesCount}
          pages={pages}
        />
      </Box>
    </>
  );
}

export default Transaction;
