import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { GiAlliedStar, GiCrossedSwords } from 'components/icon/game';
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

function DisplayOrderCards({ info, token_name, text = true, isOne = true }) {

  const { cat } = useIPFS()

  const imageEl = useRef(null);

  const [imgUrl, setimgUrl] = useState('');
  const [classs, setclasss] = useState('')
  const [gen, setgen] = useState('')
  const [gender, setgender] = useState('')
  const [rarity, setrarity] = useState('')
  const [release_no, setrelease_no] = useState('')

  const [overall_rarity, setoverall_rarity] = useState('');
  const [availability, setavailability] = useState('');
  const [strength, setstrength] = useState('');
  const [bloodline_crystal, setbloodline_crystal] = useState('');

  useEffect(async () => {
    const data = JSON.parse(await cat(info.tokenURI))
    setimgUrl(data.url)
    if (data.classs) {
      setclasss(data.classs)
      setgen(data.gen)
      setgender(data.gender)
      setrarity(data.rarity)
      setrelease_no(data.release_no)
    } else {
      setoverall_rarity(data.overall_rarity);
      setavailability(data.availability)
      setstrength(data.strength);
      setbloodline_crystal(data.bloodline_crystal)
    }
  }, []);

  return (
    <>
      <Box>
        <Box position="relative">
          {/* {info && (
            <Image src={`/assets/card/rarity/3.png`} width="100%" height="100%" />
          )} */}
          {info && (
            <Image
              src={`/assets/card/element/3.png`}
              width="100%"
              height="100%"
            />
          )}
          {info && (
            <Image
              src={`${imgUrl}`}
              width="100%"
              height="100%"
              position="absolute"
              top="0"
              left="11.5%"
              transform="translateX(-11.25%)"
            />
          )}

          {text && (
            <Box
              position="absolute"
              width="100%"
              bottom={isOne ? '13.5%' : '13.5%'}
              left="0%"
              p="0"
              // color="white"
              align="center"
              color="#283046"
              fontSize={36}
              fontWeight="bold"
            >
              {/* <Text>NFT {info['tokenId']}</Text> */}
              <Text fontSize={isOne ? '60%' : '30%'}>{token_name}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default DisplayOrderCards;
