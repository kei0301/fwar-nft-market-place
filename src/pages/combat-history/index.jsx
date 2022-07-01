import React from 'react';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
  Tr,
  useColorMode,
  useTheme
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import CombatHistoryApi from 'apis/CombatHistoryApi';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PaginatorCustom from 'components/PaginatorCustom';
import { usePagination } from '@ajna/pagination';
import ScaleFadeCustom from 'components/ScaleFadeCustom';

function CombatHistory() {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { account } = useEthers();
  const { user } = useSelector((state) => state.user);
  const [listMyCombatHistory, SetListMyCombatHistory] = React.useState([]);

  // const [currentPage, setCurrentPage] = React.useState(1);

  const [pagesQuantity, setPagesQuantity] = React.useState(1);
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pagesQuantity,
    initialState: { currentPage: 1 },
    limits: {
      outer: 2,
      inner: 2
    }
  });
  console.log('currentPage', currentPage);
  const getMyCombatHistory = async () => {
    if (user) {
      // console.log(user._id);
      const { data: listCombatHistory } = await CombatHistoryApi.get({
        userId: user._id,
        page: currentPage
      });
      SetListMyCombatHistory(listCombatHistory.docs);
      console.log('listCombatHistory', listCombatHistory);
      setPagesQuantity(listCombatHistory.totalPages);
    }
  };

  React.useEffect(() => {
    document.title = 'FWAR - Combat History';
    if (account) {
      getMyCombatHistory();
    }
  }, [account, user, currentPage]);

  return (
    <>
      <ScaleFadeCustom>
        <Table variant="simple">
          <Thead bgColor="gray.200">
            <Tr>
              <Th>CREATE AT</Th>
              <Th>ACTION</Th>
              <Th>RESULT</Th>
              <Th>POINT</Th>
              <Th>PLAYER</Th>
              <Th>DURATION</Th>
              <Th>GROUP</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listMyCombatHistory &&
              listMyCombatHistory.length > 0 &&
              listMyCombatHistory.map((history) => (
                <Tr key={history._id}>
                  <Td w="20%">{moment(history.createdAt).format('DD/MM/YYYY HH:MM:ss')}</Td>

                  <Td w="20%">
                    {/* <Tooltip label={history.from} aria-label="A tooltip"> */}
                    <Text>
                      {history.winner.userId === user._id
                        ? history.winner.typeTeam
                        : history.loser.typeTeam}
                    </Text>
                    {/* </Tooltip> */}
                  </Td>
                  <Td w="20%">
                    <Text>{history.winner.userId === user._id ? `win` : `lose`}</Text>
                  </Td>
                  <Td w="20%">
                    <Text>{history.winner.userId === user._id ? `+10` : `-10`}</Text>
                  </Td>

                  <Td w="20%">
                    <Text>
                      {history.winner.userId === user._id
                        ? history.loser.userId
                        : history.winner.userId}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{history.duration}</Text>
                  </Td>
                  <Td>
                    <Text>{history.currentBoard}</Text>
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
      </ScaleFadeCustom>
    </>
  );
}

export default CombatHistory;
