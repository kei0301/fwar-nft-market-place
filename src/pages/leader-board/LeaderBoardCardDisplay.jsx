import ImageLoad from "components/ImageLoad";
import { GiAlliedStar, GiCrossedSwords } from 'components/icon/game';
import { Box, HStack, Text } from "@chakra-ui/react";
function LeaderBoardCardDisplay({ info, width }) {
    // console.log('info', info);

    return (
        <>
            <Box width={width}>
                <Box position="relative">
                    {info && (
                        <ImageLoad
                            src={`/assets/card/rarity/${info["rarity"]}.png`}
                            placeholder="loading"
                            alt="rarity"
                            width="100%"
                            height="100%"
                        />
                    )}
                    {info && (
                        <ImageLoad
                            src={`/assets/card/element/${info["element"]}.png`}
                            placeholder="loading"
                            alt="element"
                            width="100%"
                            height="100%"
                            position="absolute"
                            top="0"
                        />
                    )}
                    {info && (
                        <ImageLoad
                            src={`/assets/char/T_${info["teamId"].teamId ? info["teamId"].teamId : info.teamId}.png`}
                            placeholder="loading"
                            alt="element"
                            width="100%"
                            height="100%"
                            position="absolute"
                            top="0"
                            left="11.5%"
                            transform="translateX(-11.25%)"
                        />
                    )}

                    <Box
                        position="absolute"
                        width="100%"
                        bottom="11%"
                        left="0%"
                        // color="white"
                        align="center"
                        color="#283046"
                        fontWeight="bold"
                    >
                        <Text fontSize="80%">NFT {info && info.nftId}</Text>
                        <HStack justify="center" spacing="24px" fontSize="70%">
                            <HStack spacing="5px">
                                <GiAlliedStar />
                                <Text>{info && info.level}</Text>
                            </HStack>
                            <HStack spacing="5px">
                                <GiCrossedSwords />
                                <Text>{info && info.attack}</Text>
                            </HStack>
                        </HStack>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default LeaderBoardCardDisplay;
