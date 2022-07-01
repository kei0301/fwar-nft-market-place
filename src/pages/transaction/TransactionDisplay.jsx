import React, { useCallback } from 'react';
import { usePagination } from '@ajna/pagination';
import {
  Box,
  Grid,
  Icon,
  Image,
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
import { formatUnits } from '@ethersproject/units';
import TransactionCard from 'components/DisplayCard';
import PaginatorCustom from 'components/PaginatorCustom';
import moment from 'moment';
import { FiEye } from 'components/icon/feather';
import { BSC_TRANSACTION_URL } from 'utils/config';
import { useEthers } from '@usedapp/core';
import ipfs from "nano-ipfs-store"

const ipfsObject = ipfs.at("https://ipfs.infura.io:5001");
const useIPFS = () => {
  const handleCat = useCallback(
    async (key) => {
      return await ipfsObject.cat(key);
    },
    [],
  )
  return { cat: handleCat };
}

function TransactionDisplay({ isMine, Transactions, listTransaction, pagesQuantity, getTransaction }) {

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

  const { account } = useEthers();

  return (
    <>
      <Table variant="simple">
        <Thead bgColor="gray.200">
          <Tr>
            <Th>Token Name</Th>
            <Th>from</Th>
            <Th>owner</Th>
            <Th>price</Th>
            <Th>nfts</Th>
            <Th>tx</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Transactions &&
            Transactions.length > 0 &&
            Transactions.map((transaction) => {
              if (isMine === true) {
                if (transaction.currentOwner === account && transaction.previousOwner !== "0x0000000000000000000000000000000000000000") {
                  return (
                    <Tr key={transaction.tokenId}>
                      <Td w="20%">{transaction.tokenName}</Td>
                      <Td w="20%">
                        <Tooltip label={transaction.previousOwner} aria-label="A tooltip">
                          <Text>
                            {transaction.previousOwner.substr(0, 4)}...
                            {transaction.previousOwner.substr(transaction.previousOwner.length - 4, 4)}
                          </Text>
                        </Tooltip>
                      </Td>
                      <Td w="20%">
                        <Tooltip label={transaction.currentOwner} aria-label="A tooltip">
                          <Text>
                            {transaction.currentOwner.substr(0, 4)}...
                            {transaction.currentOwner.substr(transaction.currentOwner.length - 4, 4)}
                          </Text>
                        </Tooltip>
                      </Td>
                      <Td>{Number(formatUnits(transaction.price, 18))}</Td>
                      <Td>
                        <NftView nft={transaction.tokenURI} />
                      </Td>
                      <Td>
                        <Link href={`https://testnet.bscscan.com/address/${account}`} isExternal>
                          <Icon color="primary.base" as={FiEye} />
                        </Link>
                      </Td>
                    </Tr>
                  )
                }
              } else {
                if (transaction.previousOwner !== "0x0000000000000000000000000000000000000000") {
                  return (
                    <Tr key={transaction.tokenId}>
                      <Td w="20%">{transaction.tokenName}</Td>
                      <Td w="20%">
                        <Tooltip label={transaction.previousOwner} aria-label="A tooltip">
                          <Text>
                            {transaction.previousOwner.substr(0, 4)}...
                            {transaction.previousOwner.substr(transaction.previousOwner.length - 4, 4)}
                          </Text>
                        </Tooltip>
                      </Td>
                      <Td w="20%">
                        <Tooltip label={transaction.currentOwner} aria-label="A tooltip">
                          <Text>
                            {transaction.currentOwner.substr(0, 4)}...
                            {transaction.currentOwner.substr(transaction.currentOwner.length - 4, 4)}
                          </Text>
                        </Tooltip>
                      </Td>
                      <Td>{Number(formatUnits(transaction.price, 18))}</Td>
                      <Td>
                        <Box>
                          <NftView nft={transaction.tokenURI} />
                        </Box>
                      </Td>
                      <Td>
                        <Link href={`https://testnet.bscscan.com/address/${account}`} isExternal>
                          <Icon color="primary.base" as={FiEye} />
                        </Link>
                      </Td>
                    </Tr>
                  )
                }
              }
            })}
        </Tbody>
      </Table>
      {/* <Box my={5}>
        <PaginatorCustom
          pagesQuantity={pagesQuantity > 0 && pagesQuantity}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pagesCount={pagesCount}
          pages={pages}
        />
      </Box> */}
    </>
  );
}

function NftView(nft) {

  const { cat } = useIPFS()

  React.useEffect(async () => {
    const nftData = JSON.parse(await cat(nft.nft))
    setimgUrl(nftData.url)
  }, [])

  const [imgUrl, setimgUrl] = React.useState('');

  return (
    <>
      <Box>
        <Box position="relative">
          {nft && (
            <Image src={`${imgUrl}`} borderRadius='50%' width="100%" height="200px" padding='15px' alt='error' fallbackSrc='https://via.placeholder.com/150' />
          )}
        </Box>
      </Box>
    </>
  )
}

export default TransactionDisplay;
