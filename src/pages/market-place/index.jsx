import React, { useCallback, useEffect, useRef, useState } from 'react';
import Loader from 'components/Loader';
import ScaleFadeCustom from 'components/ScaleFadeCustom';
import { useTitle } from 'dapp/hook';
import { Box, Button, Grid, GridItem, Spinner, Stack, useColorMode, useTheme } from '@chakra-ui/react';
import FilterComponent from 'components/FilterComponent';
import { useEthers } from '@usedapp/core';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplayOrderCards from './DisplayOrderCards';
import { useContact } from 'utils/usecontract';
import { SetNfts } from 'store/nftData';
import { formatUnits } from '@ethersproject/units';
import { cardTypeDropdown, sortDropdown } from 'utils/dataFilter';
import ipfs from "nano-ipfs-store"
import { useHistory } from 'react-router-dom';

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

function MarketPlace() {

  const history = useHistory();
  const contract = useContact();
  const { cat } = useIPFS()
  useTitle('Elemental Crystals - NFT Marketplace');
  const dispatch = useDispatch();
  const NftDatas = [...useSelector((state) => state.nftdata.NFT_Images)];

  const { account } = useEthers();
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const [isLoading, setIsLoading] = useState(false);

  const [nftData, setnftData] = useState([]);
  const [typeCardState, setTypeCardState] = useState('');
  const [sortState, setSortState] = useState('');

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

    if (typeCardState !== '') {
      if (typeCardState === 'character') {
        NftDatas.map(async (nft) => {
          const data = JSON.parse(await cat(nft.tokenURI))
          if (data.gen) {
            setnftData(preState => [...preState, nft])
          }
        })
      } else {
        NftDatas.map(async (nft) => {
          const data = JSON.parse(await cat(nft.tokenURI))
          if (data.strength) {
            setnftData(preState => [...preState, nft])
          }
        })
      }
    } else {
      setnftData(NftDatas)
    }
  }

  const buyNFT = async (id, price) => {
    setIsLoading(true);
    try {
      if (account) {
        await contract.methods.buyToken(id)
          .send({ from: account, value: price })
          .once('transactionhash', (hash) => {
            console.log(hash)
          });
        toast.success('Buying NFT is Success!');
        nftData[id - 1].previousOwner = nftData[id - 1].currentOwner;
        nftData[id - 1].currentOwner = account;
        nftData[id - 1].forSale = false;
        dispatch(SetNfts(nftData));
        setIsLoading(false);
      } else {
        toast.error('Connect Wallet!');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleChangeSort = (sort) => {
    setSortState(sort ? sort.order : '');
  };
  const handleChangeCardType = (typeCard) => {
    setTypeCardState(typeCard ? typeCard.value : '');
  };

  useEffect(() => {
    console.log('----------market effect-------', NftDatas);
    if (account) {
      getNftData();
    } else {
      history.push('stand')
    }
  }, [NftDatas.length, typeCardState, sortState, account]);

  return (
    <>
      <ScaleFadeCustom>
        <Box
          bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
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
        <Box display="flex" alignItems="start">
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
                nftData.map((card, index) =>
                  <Box
                    key={card.tokenId}
                    w="100%"
                    bg={colorMode === 'dark' ? 'transparent' : 'white'}
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
                        {
                          card.forSale === false ?
                            <Box bg="#ff4e4f" py={3} fontSize={13}>
                              Sold
                            </Box>
                            :
                            card.currentOwner === account ?
                              <Box bg="#00d8fb" py={3} fontSize={13}>
                                Selling
                              </Box>
                              :
                              <Grid gridTemplateColumns="repeat(2, 1fr)">
                                <Box bg="secondary.base" py={2} fontSize={13}>
                                  {Number(formatUnits(card.price, 18))} BNB
                                </Box>
                                <Button
                                  bg={theme.colors.primary.base}
                                  py={2}
                                  _hover={{
                                    background: theme.colors.light,
                                    color: 'red',
                                    border: '1px',
                                    borderColor: theme.colors.primary.base
                                  }}
                                  fontSize={13}
                                  fontWeight="bold"
                                  borderRadius="0"
                                  onClick={() => buyNFT(card.tokenId, card.price)}
                                >
                                  Buy
                                </Button>
                              </Grid>

                        }
                      </Box>
                    </Stack>
                  </Box>
                )
              }
            </Grid>
          </Box>
        </Box>

        {
          isLoading && (
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
          )
        }

      </ScaleFadeCustom >
    </>
  );
}

export default MarketPlace;
