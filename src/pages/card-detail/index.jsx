import React, { useCallback, useRef, useState } from 'react';

import DisplayOrderCards from '../market-place/DisplayOrderCards';
import Loadable from 'components/Loadable';
import PaginatorCustom from 'components/PaginatorCustom';
import { usePagination } from '@ajna/pagination';
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Grid,
  GridItem,
  Image,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  Spinner,
  Stack,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useTheme,
  HStack
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import CharacterApi from 'apis/CharacterApi';
import { FwarChar, FwarCharDelegate } from 'dapp/getEthersContract';
import { lazy } from 'react';
import toast from 'react-hot-toast';
import { FiArrowUp, FiDisc, FiPlus } from 'components/icon/feather';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { elementDropdown, rarityDropdown } from 'utils/dataFilter';
import ipfs from "nano-ipfs-store"
import { formatUnits } from '@ethersproject/units';

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

const DisplayCardSelect = Loadable(lazy(() => import('./DisplayCardForUpgrade')));
// const DisplayCardSelect = Loadable(lazy(() => import('./DisplayCardSelect')));

function CardDetail() {
  const { cat } = useIPFS()
  const ref = useRef(null);
  const NftDatas = [...useSelector((state) => state.nftdata.NFT_Images)];
  const [infoNft, setInfoNft] = React.useState(null);
  const [Nft, setNft] = React.useState(null);
  const [isMyNft, setIsMyNft] = React.useState(false);

  const [isApprove, setIsApprove] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [needUpgrade, setNeedUpgrade] = React.useState({});
  const [pagesQuantity, setPagesQuantity] = React.useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listSelectCard, setListSelectCard] = React.useState([]);

  const [selected, setSelected] = React.useState([]);
  const [isUpgrade, setIsUpgrade] = React.useState(false);
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pagesQuantity,
    initialState: { currentPage: 1 },
    limits: {
      outer: 2,
      inner: 2
    }
  });
  const { user } = useSelector((state) => state.user);

  const { account } = useEthers();

  const { id } = useParams();
  const theme = useTheme();
  const { colorMode } = useColorMode();
  let history = useHistory();

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      const burnedNfts = selected.map((i) => i.nftId);

      const upgraded = await FwarCharDelegate.upgrade(id, burnedNfts);
      const tx = await upgraded.wait();
      setIsLoading(false);
      setIsUpgrade(false);
      setSelected([]);
      getNftDetail();
      console.log('tx', tx);
    } catch (error) {
      error.data ? toast.error(error.data.message) : toast.error(error.message);
      setIsLoading(false);
    }
  };
  const handleApproveForAll = async () => {
    try {
      setIsLoading(true);
      const result = await FwarChar.setApprovalForAll(FwarCharDelegate.address, true);
      const tx = await result.wait();
      setIsApprove(true);
      setIsLoading(false);
      toast.success('Approve successfully');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const handleClick = (event, card) => {
    const selectedIndex = selected.indexOf(card);

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
    const result = newSelected.reduce(function (acc, curr, index) {
      if (typeof acc[curr.rarity] == 'undefined') {
        acc[curr.rarity] = 1;
      } else {
        acc[curr.rarity] += 1;
      }
      return acc;
    }, {});
    for (let i = 1; i <= 4; i++) {
      if (!result[i]) result[i] = 0;
    }
    needUpgrade['junkAmount'] === result['1'] &&
      needUpgrade['normalAmount'] === result['2'] &&
      needUpgrade['rareAmount'] === result['3'] &&
      needUpgrade['baseAmount'] === result['4']
      ? setIsUpgrade(true)
      : setIsUpgrade(false);
    setSelected(newSelected);
  };

  async function getNftDetail() {
    // const nft = await getNftDetail();
    // const { data: nft } = await CharacterApi.getOne(id);
    for (let k = 0; k < NftDatas.length; k++) {
      const element = NftDatas[k];
      if (element.tokenId === id) {
        const nft_data = JSON.parse(await cat(element.tokenURI))
        console.log(element, nft_data, 888999)
        setInfoNft(element);
        setNft(nft_data);
      }
    }
    // if (nft) {
    //   // console.log('nft', nft);
    //   try {
    //     const burnInfo = await FwarCharDelegate.getBurnInfo(nft.rarity, nft.level);
    //     const baseAmount = burnInfo['baseAmount'];
    //     const junkAmount = burnInfo['junkAmount'];
    //     const normalAmount = burnInfo['normalAmount'];
    //     const rareAmount = burnInfo['rareAmount'];
    //     setNeedUpgrade({ baseAmount, junkAmount, normalAmount, rareAmount });
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   // console.log('burnInfo', burnInfo);
    // }
  }

  React.useEffect(() => {
    // getNftDetail();
    ref.current = true;
    if (account && ref.current) {
      getNftDetail();
    }
  }, [account]);

  React.useEffect(() => {
    ref.current = true;
    if (account && ref.current) {
      (async function () {
        if (user && infoNft && isMyNft && infoNft['rarity'] > 3) {
          const rarity = [];
          const burnArray = Object.entries(needUpgrade).filter((i) => i[1] > 0);
          burnArray.forEach((i) => {
            if (i[0] === 'junkAmount') rarity.push(1);
            if (i[0] === 'normalAmount') rarity.push(2);
            if (i[0] === 'rareAmount') rarity.push(3);
            if (i[0] === 'baseAmount') rarity.push(4);
          });
          // console.log('rarity', rarity);
          let { data: listCardSelect } = await CharacterApi.getMyList({
            userId: user._id,
            isListed: false,
            teamId: infoNft.teamId._id,
            page: currentPage,
            element: infoNft.element,
            rarity: JSON.stringify(rarity)
          });

          setListSelectCard(listCardSelect.docs);
          setPagesQuantity(listCardSelect.totalPages);
          // console.log('listCardSelect', listCardSelect);
        }
        return () => {
          setListSelectCard([]); // This worked for me
        };
      })();
    }
  }, [user, infoNft, needUpgrade, currentPage]);

  React.useEffect(() => {
    ref.current = true;
    if (account && ref.current) {
      (async function () {
        try {
          const isApproveForAll = await FwarChar.isApprovedForAll(
            account,
            FwarCharDelegate.address
          );
          setIsApprove(isApproveForAll);

          const ownerOf = await FwarChar.ownerOf(+id);

          if (ownerOf === account) {
            setIsMyNft(true);
          } else {
            setIsMyNft(false);
          }
        } catch (error) {
          setIsMyNft(false);
          console.log(error);
        }
      })();
    }
    // console.log(FwarChar);
  }, [account, isMyNft, isApprove]);

  return (
    <>
      <ScaleFade initialScale={0.9} in>
        {/* bread crumb */}
        <Stack direction="row" align="center" mb="21px">
          <Text
            as="h2"
            fontWeight="medium"
            fontSize={25}
            lineHeight="shorter"
            pr={2}
            borderRight="1px solid #d6dce1"
          >
            NFT Details
          </Text>
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <Link to="/market-place">
                <Text color={theme.colors.primary.base}>Market-Place</Text>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text>NFT</Text>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>

        {/*  */}
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={10}>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Button
              leftIcon={<ArrowBackIcon />}
              // colorScheme="purple"
              variant="solid"
              onClick={() => history.goBack()}
            >
              Back
            </Button>
            {infoNft && <DisplayOrderCards
              info={infoNft}
              token_name={infoNft.tokenName}
              text={true}
              isOne={true}
            />
            }
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 2 }}>
            <Tabs>
              <TabList>
                <Tab>Details</Tab>
                {/* {isMyNft && infoNft && Number(infoNft['rarity']) >= 4 && !infoNft.isListed && (
                  <Tab>Upgrade</Tab>
                )} */}
                {/* {isMyNft && <Tab>Upgrade</Tab>} */}
              </TabList>

              <TabPanels>
                <TabPanel
                  mt={4}
                  bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
                  boxShadow="content"
                  borderRadius="6px"
                >
                  <Box>Owner : {infoNft && infoNft.currentOwner}</Box>
                  <Grid templateColumns="repeat(12, 1fr)" gap={4} mt={10}>
                    <GridItem colSpan={{ base: 12, lg: 5 }}>
                      <List spacing={3} paddingBottom={5}>
                        <ListItem>
                          <HStack>
                            <ListIcon as={FiDisc} />
                            <Text>NFT Token ID = {infoNft && infoNft.tokenId}</Text>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack>
                            <ListIcon as={FiDisc} />
                            <Text>NFT Token Name = {infoNft && infoNft.tokenName}</Text>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack>
                            <ListIcon as={FiDisc} />
                            <Text>NFT Token Price = {infoNft && Number(formatUnits(infoNft.price, 18))} BNB</Text>
                          </HStack>
                        </ListItem>
                        {Nft &&
                          Nft.gen ?
                          <>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Class = {Nft && Nft.classs}</Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Gen = {Nft && Nft.gen}</Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Gender = {Nft && Nft.gender}</Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>
                                  Rarity = {Nft && Nft.rarity}
                                </Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Release No = {Nft && Nft.release_no}</Text>
                              </HStack>
                            </ListItem>
                          </>
                          :
                          <>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Overall Rarity = {Nft && Nft.overall_rarity}</Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Availability = {Nft && Nft.availability}</Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>Strength = {Nft && Nft.strength}</Text>
                              </HStack>
                            </ListItem>
                            <ListItem>
                              <HStack>
                                <ListIcon as={FiDisc} />
                                <Text>
                                  Bloodline Crystal = {Nft && Nft.bloodline_crystal}
                                </Text>
                              </HStack>
                            </ListItem>
                          </>
                        }
                      </List>
                    </GridItem>
                  </Grid>
                </TabPanel>
                <TabPanel
                  mt={4}
                  bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
                  boxShadow="content"
                  borderRadius="6px"
                >
                  <Stack direction="row" align="center" justify="space-between">
                    <Box>Upgrade to Level {infoNft && Number(infoNft['level']) + 1}</Box>
                  </Stack>
                  <Stack direction="row" align="center" justify="space-between">
                    <Box>
                      {needUpgrade && Object.keys(needUpgrade).length > 0 && (
                        <>
                          {Object.entries(needUpgrade)
                            .filter((item) => Number(item[1]) > 0)
                            .map((i, index) => (
                              // { i[1] > 0 &&
                              <Stack key={index} direction="row" align="center">
                                {selected && selected.length ? (
                                  selected.map((item) => (
                                    <>
                                      {i[0] === 'baseAmount' && item.rarity === '4' && (
                                        <DisplayCardSelect info={item} w="10%" />
                                      )}
                                      {i[0] === 'junkAmount' && item.rarity === '1' && (
                                        <DisplayCardSelect info={item} w="10%" />
                                      )}
                                      {i[0] === 'normalAmount' && item.rarity === '2' && (
                                        <DisplayCardSelect info={item} w="10%" />
                                      )}
                                      {i[0] === 'rareAmount' && item.rarity === '3' && (
                                        <DisplayCardSelect info={item} w="10%" />
                                      )}
                                    </>
                                  ))
                                ) : (
                                  ////////////////////////////////
                                  <Image
                                    src={`/assets/card/rarity/${i[0] === 'baseAmount'
                                      ? 4
                                      : i[0] === 'junkAmount'
                                        ? 1
                                        : i[0] === 'normalAmount'
                                          ? 2
                                          : i[0] === 'rareAmount' && 3
                                      }.png`}
                                    w="50px"
                                  />
                                )}
                                <Box>x {i[1]}</Box>
                              </Stack>
                              // }
                            ))}
                        </>
                      )}
                    </Box>

                    <Button
                      leftIcon={<FiPlus />}
                      onClick={onOpen}
                      fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                    >
                      Select
                    </Button>
                  </Stack>
                  <Box pt={6}>
                    {isApprove && (
                      <Button
                        // leftIcon={<FiArrowUp />}
                        leftIcon={
                          isLoading ? (
                            <Spinner
                              thickness="5px"
                              speed="0.65s"
                              emptyColor={theme.colors.primary.base}
                              color="blue.500"
                            />
                          ) : (
                            <FiArrowUp />
                          )
                        }
                        w="full"
                        bg={theme.colors.primary.base}
                        color="white"
                        _hover={{ boxShadow: theme.shadows.button }}
                        isDisabled={isLoading || !isUpgrade}
                        onClick={handleUpgrade}
                      >
                        Upgrade
                      </Button>
                    )}

                    {!isApprove && (
                      <Button
                        // leftIcon={<FiArrowUp />}
                        leftIcon={
                          isLoading ? (
                            <Spinner
                              thickness="5px"
                              speed="0.65s"
                              emptyColor={theme.colors.primary.base}
                              color="blue.500"
                            />
                          ) : (
                            <FiArrowUp />
                          )
                        }
                        w="full"
                        bg={theme.colors.primary.base}
                        color="white"
                        _hover={{ boxShadow: theme.shadows.button }}
                        isDisabled={isLoading}
                        onClick={handleApproveForAll}
                      >
                        Approve
                      </Button>
                    )}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>
      </ScaleFade>
    </>
  );
}

export default CardDetail;
