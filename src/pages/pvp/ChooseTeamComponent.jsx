import React from 'react';

import CharacterApi from 'apis/CharacterApi';
import PlayerApi from 'apis/PlayerApi';
import ButtonSelect from 'components/ButtonSelect';
import Loadable from 'components/Loadable';
import PaginatorCustom from 'components/PaginatorCustom';
import { elementDropdown } from 'utils/dataFilter';
import { usePagination } from '@ajna/pagination';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useTheme,
  VStack,
  Image
} from '@chakra-ui/react';
import { lazy } from 'react';
import toast from 'react-hot-toast';
import CardClose from './CardClose';

const DisplayCard = Loadable(lazy(() => import('./DisplayCard')));

function ChooseTeamComponent({ user, role }) {
  const [listSelectCard, setListSelectCard] = React.useState([]);
  const [pagesQuantity, setPagesQuantity] = React.useState(1);
  const [selected, setSelected] = React.useState([]);
  const [teamChoose, setTeamChoose] = React.useState([]);

  const { colorMode } = useColorMode();
  const theme = useTheme();
  const isRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pagesQuantity,
    initialState: { currentPage: 1 },
    limits: {
      outer: 2,
      inner: 2
    }
  });

  const getListCard = async (id, role) => {
    const { data: listCardSelect } = await CharacterApi.getMyList({
      userId: id,
      isListed: false,
      page: currentPage,
      rarity: 4,
      typeCard: role
    });
    setListSelectCard(listCardSelect.docs);
    setPagesQuantity(listCardSelect.totalPages);
  };
  const getTeam = async (id, role) => {
    const { data } = await PlayerApi.getTeam(id, role);
    // console.log('data', data);
    return data;
  };
  const getTeamRegistration = async (userId, role) => {
    const teamReg = await getTeam(userId, role);

    if (teamReg) setTeamChoose(teamReg.team);
  };
  React.useEffect(() => {
    isRef.current = true;
    if (user && isRef.current) {
      (async () => {
        const teamReg = await getTeam(user._id, role);
        if (teamReg) {
          setSelected(teamReg.team);
          setTeamChoose(teamReg.team);
        }
      })();
    }
  }, [user]);

  React.useEffect(() => {
    isRef.current = true;

    if (isRef.current) {
      (async function () {
        if (user) {
          getListCard(user._id, role);
          // getTeamRegistration(user._id, role);
        }
      })();
    }

    return () => {
      setListSelectCard([]); // This worked for me
    };
  }, [user, currentPage, setTeamChoose]);
  const handleClick = (event, card) => {
    const selectedIndex = selected.map((i) => i.nftId).indexOf(card.nftId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, card);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    if (newSelected.length > 3) {
      toast.error('Please select at most 3');
    } else {
      // setTeamChoose(newSelected);
      setSelected(newSelected);
    }
    // console.log('selectedIndex', selectedIndex);
  };

  const handleCleanTeam = async (event) => {
    try {
      // let newPlayer = {};
      // newPlayer = { userId: user._id, role, team: [] };
      setTeamChoose([]);
      setSelected([]);
      // const { data } = await PlayerApi.registration(newPlayer);
      toast.success('clear team');
    } catch (error) {
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  const handleSubmitTeam = async (userId, role) => {
    try {
      let newPlayer = {};
      const team = selected.map((item) => item._id);
      newPlayer = { userId, team, role };
      const { data } = await PlayerApi.registration(newPlayer);
      getTeamRegistration(userId, role);
      toast.success(data);
    } catch (error) {
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <VStack spacing="8">
        <VStack
          w="100%"
          pos="relative"
          spacing="1"
          p={5}
          // bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
          borderRadius="8px"
          // boxShadow={theme.shadows.content}
          // bgImage="url('assets/03.png')"
          // bgSize="100% 100%"
        >
          <Image
            pos="absolute"
            top="0"
            h="100%"
            src="assets/03.png"
            transform={role === 'attacker' && 'rotateY(0.5turn)'}
          />
          <Text
            color={theme.colors.cyan.base}
            fontSize="30px"
            fontWeight="bold"
            zIndex="base"
            textTransform="uppercase"
          >
            {role}
          </Text>
          <Text color={theme.colors.cyan.base} fontSize="21px" fontWeight="medium" zIndex="base">
            ( +3 Cards )
          </Text>
          {teamChoose && !teamChoose.length && (
            <Grid templateColumns="repeat(3, 1fr)" gap={5} px={{ base: 20, md: 15, lg: 10 }} py={3}>
              <CardClose />
              <CardClose />
              <CardClose />
            </Grid>
          )}
          {teamChoose && teamChoose.length && (
            <Grid templateColumns="repeat(3, 1fr)" gap={5} px={{ base: 20, md: 15, lg: 10 }} py={3}>
              {teamChoose.map((card) => (
                <DisplayCard key={card._id} info={card} text={true} mini={false} />
              ))}
            </Grid>
          )}
          <ButtonSelect onClick={onOpen} title="Select" />
          {/*<Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={5}>
						<ButtonSelect
							onClick={handleCleanTeam}
							title="Clean"
							isDisabled={teamChoose && !teamChoose.length > 0}
						/>

						<ButtonSelect
							onClick={() => handleSubmitTeam(user._id, role)}
							title="Registration"
							isDisabled={selected && selected.length < 1}
						/>
					</Grid>*/}
        </VStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent w="1000px" color={colorMode === 'dark' && 'white'}>
          <ModalHeader paddingTop="5px" paddingBottom="5px" >Select Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" id="selectTeam">
              <Thead>
                <Tr>
                  <Th color={colorMode === 'dark' && 'white'}>Card</Th>
                  <Th color={colorMode === 'dark' && 'white'}>Level</Th>
                  <Th color={colorMode === 'dark' && 'white'}>Team</Th>
                  <Th color={colorMode === 'dark' && 'white'}>Rarity</Th>
                  <Th color={colorMode === 'dark' && 'white'}>Element</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listSelectCard &&
                  listSelectCard.map((card, index) => (
                    <Tr
                      key={card._id}
                      _hover={{
                        cursor: 'pointer',
                        bg: colorMode === 'dark' ? theme.colors.dark.light : theme.colors.light.bg
                      }}
                      onClick={(e) => handleClick(e, card)}
                      bg={
                        selected &&
                        selected.length &&
                        selected.map((i) => i.nftId).includes(card.nftId) &&
                        (colorMode === 'dark' ? theme.colors.dark.bg : theme.colors.light.bg)
                      }
                    >
                      <Td w="15%" paddingBottom="0" paddingTop="0">
                        <DisplayCard info={card} text={true} mini={true} />
                      </Td>
                      <Td>{card.level}</Td>
                      <Td>{card.teamId.name}</Td>
                      <Td>{card.rarity}</Td>
                      <Td>{elementDropdown.find((i) => i.value === card.element).label}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Box w="100%">
              <PaginatorCustom
                pagesQuantity={pagesQuantity > 0 && pagesQuantity}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pagesCount={pagesCount}
                pages={pages}
              />
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={5}>
                <ButtonSelect
                  onClick={handleCleanTeam}
                  isDisabled={teamChoose && !teamChoose.length > 0}
                >
                  Clear
                </ButtonSelect>
                <ButtonSelect
                  onClick={() => handleSubmitTeam(user._id, role)}
                  title="Registration"
                  isDisabled={selected && selected.length < 1}
                />
              </Grid>
              <Link to="/market-place">
                <ButtonSelect w="100%" my={4}>
                  Shop
                </ButtonSelect>
              </Link>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChooseTeamComponent;
