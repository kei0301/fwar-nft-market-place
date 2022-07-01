import React from 'react';

import { usePagination } from '@ajna/pagination';
import {
  Box,
  Grid,
  Icon,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr
} from '@chakra-ui/react';
import TransactionCard from 'components/DisplayCard';
import PaginatorCustom from 'components/PaginatorCustom';
import moment from 'moment';
import { FiEye } from 'components/icon/feather';
import { BSC_TRANSACTION_URL } from 'utils/config';

function TransactionDisplay({ listTransaction, pagesQuantity, getTransaction }) {
  // console.log('listTransactions', listTransaction);
  // paginate
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pagesQuantity,
    initialState: { currentPage: 1 },
    limits: {
      outer: 2,
      inner: 2
    }
  });

  React.useEffect(() => {
    getTransaction(currentPage);
  }, [currentPage]);
  return (
    <>
      <Table variant="simple">
        <Thead bgColor="gray.200">
          <Tr>
            <Th>createdAt</Th>
            <Th>from</Th>
            <Th>owner</Th>
            <Th>price</Th>
            <Th>nfts</Th>
            <Th>tx</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listTransaction &&
            listTransaction.length > 0 &&
            listTransaction.map((transaction) => (
              <Tr key={transaction.tx}>
                <Td w="20%">{moment(transaction.createdAt).format('DD/MM/YYYY HH:MM:ss')}</Td>
                <Td w="20%">
                  <Tooltip label={transaction.from} aria-label="A tooltip">
                    <Text>
                      {transaction.from.substr(1, 4)}...
                      {transaction.from.substr(transaction.from.length - 4, 4)}
                    </Text>
                  </Tooltip>
                </Td>
                <Td w="20%">
                  <Tooltip label={transaction.owner} aria-label="A tooltip">
                    <Text>
                      {transaction.owner.substr(1, 4)}...
                      {transaction.owner.substr(transaction.owner.length - 4, 4)}
                    </Text>
                  </Tooltip>
                </Td>
                <Td>{transaction.price}</Td>
                <Td>
                  <Grid templateColumns="repeat(4 , 1fr)">
                    {transaction.nfts.map((c) => (
                      <Link href={`/card/detail/${c.nftId}`} key={c.nftId}>
                        <TransactionCard info={c} text={false} />
                      </Link>
                    ))}
                  </Grid>
                </Td>
                <Td>
                  <Link href={`${BSC_TRANSACTION_URL + transaction.tx}`} isExternal>
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

export default TransactionDisplay;
