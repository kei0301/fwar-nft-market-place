import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useColorMode,
  useDisclosure,
  useTheme,
  GridItem
} from '@chakra-ui/react';
import { cardTypeDropdown, sortDropdown } from 'utils/dataFilter';
import FilterComponent from 'components/FilterComponent';
import { useEthers } from '@usedapp/core';
import ScaleFadeCustom from 'components/ScaleFadeCustom';
import { useTitle } from 'dapp/hook';
import toast from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DisplayOrderCards from 'pages/market-place/DisplayOrderCards';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useContact } from 'utils/usecontract';
import { SetNfts } from 'store/nftData';
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

function Card() {

  const history = useHistory();
  const contract = useContact();
  const dispatch = useDispatch();
  const { cat } = useIPFS()

  useTitle('FWAR - MY CARDS');
  const NftDatas = [...useSelector((state) => state.nftdata.NFT_Images)]
  const Theme = useTheme();
  const { colorMode } = useColorMode();
  const { account } = useEthers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const [nftData, setnftData] = React.useState([]);
  const [cur_nft, setcur_nft] = React.useState([]);
  const [new_price, setnew_price] = React.useState();

  const [typeCardState, setTypeCardState] = useState('');
  const [sortState, setSortState] = useState('');

  const handleChangeSort = (sort) => {
    setSortState(sort ? sort.order : '');
  };
  const handleChangeCardType = (typeCard) => {
    setTypeCardState(typeCard ? typeCard.value : '');
  };

  const getNftData = async () => {
    setnftData([]);
    if (sortState === 'asc') {
      await NftDatas.sort(function (a, b) {
        return a.price - b.price
      });
    } else if (sortState === 'desc') {
      await NftDatas.sort(function (a, b) {
        return b.price - a.price
      });
    }
    console.log(NftDatas, '--------my card')
    if (typeCardState !== '') {
      if (typeCardState === 'character') {
        NftDatas.map(async (nft) => {
          const data = JSON.parse(await cat(nft.tokenURI))
          if (data.gen) {
            if (nft.currentOwner === account && nft.forSale === false) {
              setnftData(preState => [...preState, nft]);
            }
          }
        })
      } else {
        NftDatas.map(async (nft) => {
          const data = JSON.parse(await cat(nft.tokenURI))
          if (data.strength) {
            if (nft.currentOwner === account && nft.forSale === false) {
              setnftData(preState => [...preState, nft]);
            }
          }
        })
      }
    } else {
      for (let k = 0; k < NftDatas.length; k++) {
        const element = NftDatas[k];
        if (element.currentOwner === account && element.forSale === false) {
          await setnftData(preState => [...preState, element]);
        }
      }
    }
  }

  const Change_price = async (id) => {
    for (let k = 0; k < nftData.length; k++) {
      const element = nftData[k];
      if (element.tokenId === id) {
        onOpen();
        setcur_nft(element);
      }
    }
  }

  const Change_Nft_Price = async () => {
    if (contract?.methods === undefined || !cur_nft.tokenId) return;
    setIsLoading(true);
    const price = parseUnits(new_price, 18)
    try {
      await contract.methods.changeTokenPrice(cur_nft.tokenId, price)
        .send({ from: account })
        .once('transactionhash', (hash) => {
          toast.success('Hash:' + hash);
        });
      NftDatas[cur_nft.tokenId - 1].price = price;
      dispatch(SetNfts(NftDatas));
      setIsLoading(false);
      toast.success('Price Change is Success!');
    }
    catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
    onClose();
  }

  const Sell_Nft = async (id) => {
    setIsLoading(true);
    try {
      await contract.methods.toggleForSale(id)
        .send({ from: account })
        .once('transactionhash', (hash) => {
          toast.success('Hash:' + hash);
        });
      NftDatas[id - 1].forSale = true;
      getNftData();
      setIsLoading(false);
      toast.success('Selling Nft is Success!');
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (account) {
      getNftData();
    } else {
      history.push('stand');
    }
  }, [NftDatas.length, typeCardState, sortState, account]);

  return (
    <>
      <ScaleFadeCustom>
        <Box>
          <Box
            bg={colorMode === 'dark' ? Theme.colors.dark.light : 'white'}
            p={8}
            boxShadow="content"
            borderRadius={8}
            position="relative"
          >
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(2, 1fr)'
              }}
              alignItems="center"
              gap={4}
            >
              <GridItem>
                <FilterComponent
                  placeholder="CardType"
                  handleChange={handleChangeCardType}
                  valueState={typeCardState}
                  optionDropdown={cardTypeDropdown}
                />
              </GridItem>
              <GridItem>
                <FilterComponent
                  placeholder="Sort"
                  handleChange={handleChangeSort}
                  valueState={sortState}
                  optionDropdown={sortDropdown}
                />
              </GridItem>
            </Grid>
          </Box>
          <Box width="100%" marginLeft={6}>
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(5, 1fr)'
              }}
              gap={6}
              mt={6}
            >
              {nftData &&
                nftData.length > 0 &&
                nftData.map((card) => (
                  <Box
                    key={card.tokenId}
                    w="100%"
                    bg={colorMode === 'dark' ? 'white' : 'white'}
                    boxShadow="content"
                    borderRadius="6px"
                    overflow="hidden"
                    pos="relative"
                    _hover={{ boxShadow: '0 4px 25px 0 rgba(34,41,47,.25)' }}
                  >
                    <Stack direction="column" justify="space-between" h="100%">
                      <Grid>
                        <Link to={`/card/detail/${card.tokenId}`} key={card.tokenId}>
                          <DisplayOrderCards
                            info={card}
                            token_name={card.tokenName}
                            text={true}
                            isOne={true}
                          />
                        </Link>
                      </Grid>
                      <Box color="white" align="center">
                        <Grid gridTemplateColumns="repeat(1, 1fr)">
                          <Button
                            bg='#ff4e4f'
                            py={2}
                            fontSize={13}
                            fontWeight="bold"
                            borderRadius="0"
                            onClick={() => Change_price(card.tokenId)}
                          >
                            Change Price
                          </Button>
                        </Grid>
                        <Grid gridTemplateColumns="repeat(2, 1fr)">
                          <Box bg="secondary.base" py={2} fontSize={13}>
                            {Number(formatUnits(card.price, 18))} BNB
                          </Box>
                          <Button
                            bg={Theme.colors.primary.base}
                            py={2}
                            _hover={{
                              background: Theme.colors.light,
                              color: 'red',
                              border: '1px',
                              borderColor: Theme.colors.primary.base
                            }}
                            fontSize={13}
                            fontWeight="bold"
                            borderRadius="0"
                            onClick={() => Sell_Nft(card.tokenId)}
                          >
                            Sell
                          </Button>
                        </Grid>
                      </Box>
                    </Stack>
                  </Box>
                ))}
            </Grid>
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent w="300px">
            <ModalHeader>Change Price</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(1, 1fr)',
                  lg: 'repeat(1, 1fr)'
                }}
                gap={4}
                mt={4}
              >
                <Box
                  key={cur_nft.tokenId}
                  w="100%"
                  bg={colorMode === 'dark' ? '#98989d' : 'white'}
                  boxShadow="content"
                  borderRadius="6px"
                  overflow="hidden"
                  pos="relative"
                  _hover={{ boxShadow: '0 4px 25px 0 rgba(34,41,47,.25)' }}
                >
                  <DisplayOrderCards
                    info={cur_nft}
                    text={true}
                    isCart={true}
                  />
                  <Stack spacing={4}>
                    {
                      cur_nft.price &&
                      <InputGroup>
                        <Input
                          defaultValue={Number(formatUnits(cur_nft.price, 18))}
                          readOnly
                        />
                        <InputRightAddon
                          backgroundColor={Theme.colors.primary.base}
                          children="BNB"
                        />
                      </InputGroup>
                    }
                  </Stack>
                  <Stack spacing={4}>
                    <InputGroup>
                      <Input
                        type='number'
                        placeholder='Input New Price!'
                        defaultValue={new_price}
                        onChange={event => setnew_price(event.target.value)}
                      />
                      <InputRightAddon
                        backgroundColor={Theme.colors.primary.base}
                        children="BNB"
                      />
                    </InputGroup>
                  </Stack>
                </Box>
              </Grid>
            </ModalBody>

            <ModalFooter textAlign='center'>
              <Button
                variant="solid"
                colorScheme="yellow"
                onClick={Change_Nft_Price}
              >
                Change
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {isLoading && (
          <Stack
            direction="row"
            justify="center"
            align="center"
            pos="absolute"
            zIndex="docked"
            bg="#98989d"
            opacity="0.85"
            inset="0"
            position='fixed'
            zIndex='9999'
          >
            <Spinner
              thickness='15px'
              speed='0.25s'
              emptyColor='gray.200'
              color='#fec443'
              size='xl'
              position='absolute'
              left='48%'
              top='48%'
            />
          </Stack>
        )}
      </ScaleFadeCustom>
    </>
  );
}

export default Card;
