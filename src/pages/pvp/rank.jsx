import {
  Box,
  Image,
  ScaleFade,
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
import React from 'react';
import { useSelector } from 'react-redux';
import RankApi from '../../apis/RankApi';

function Rank({ role }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { user } = useSelector((state) => state.user);
  const [listUsersRank, setListUsersRank] = React.useState([]); // list user
  const getRanks = async () => {
    if (user) {
      const { data: listUsers } = await RankApi.getAllRanks(role);
      setListUsersRank(listUsers);
      console.log('listUsers', listUsers);
      // setPagesQuantity(listCard.totalPages);
    }
  };

  React.useEffect(() => {
    getRanks();
  }, [user]);
  const rankPlayerTop3 = listUsersRank?.slice(0, 3);

  const listRankPlayer = listUsersRank?.map((item, index) => (
    <Tr key={item._id}>
      <Td padding="5px" textAlign="center" >{index + 1}</Td>
      <Td padding="5px" >
        <Image src={item.imageRegion} w="84px" />
      </Td>

      <Td padding="5px" >
        <Tooltip label={item.userId.address} aria-label="A tooltip">
          <Text>
            {item.userId.address.substr(1, 4)}...
            {item.userId.address.substr(item.userId.address.length - 4, 4)}
          </Text>
        </Tooltip>
      </Td>
      <Td padding="5px" > 
        <Text>{item.win}</Text>
      </Td>
      <Td padding="5px" >
        <Text>{item.lose}</Text>
      </Td>
      <Td padding="5px" >
        <Text>{item.score}</Text>
      </Td>
    </Tr>
  ));

  return (
    <>
      <ScaleFade initialScale={1.15} in>
        {/* {rankPlayerTop3.length && <RankPlayerImage data={rankPlayerTop3} />} */}
        <Box p={5} id={colorMode === 'dark' ? 'rank' : ''}>
          <Table variant="simple" size="md" >
            {/* <TableCaption>Paginate</TableCaption> */}
            <Thead bgColor={colorMode === 'dark' ? '#323663' : '#FEF3D9'}>
              <Tr h="53px">
                <Th padding="5px" color={colorMode === 'dark' ? 'white' : 'black'}>
                  Ranking
                </Th>
                <Th padding="5px" color={colorMode === 'dark' ? 'white' : 'black'}>
                  region
                </Th>
                <Th padding="5px" color={colorMode === 'dark' ? 'white' : 'black'}>
                  Player
                </Th>
                <Th padding="5px" color={colorMode === 'dark' ? 'white' : 'black'}>
                  Win
                </Th>
                <Th padding="5px" color={colorMode === 'dark' ? 'white' : 'black'}>
                  Lose
                </Th>
                <Th padding="5px" color={colorMode === 'dark' ? 'white' : 'black'}>
                  Score
                </Th>
              </Tr>
            </Thead>
            <Tbody>{listRankPlayer}</Tbody>
          </Table>
        </Box>
      </ScaleFade>
    </>
  );
}

export default Rank;
