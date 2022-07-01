import React from "react";

import { Box, Image } from "@chakra-ui/react";
function RankPlayerImage({ data }) {
    const [top1, top2, top3] = data;
    const [w, setW] = React.useState(window.innerWidth);
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setW(window.innerWidth);
        });
    }, [w]);

    return (
        <>
            <Box
                bgImage="https://zoogame.app/chest/chest-bg.jpg"
                bgSize="cover"
                position="relative"
                w="100%"
                style={{ height: w / 2.167 }}
            >
                <Box position="absolute" top="4%" left="44%" h="30.7%" w="15%">
                    <Image src="https://zoogame.app/leadboard/flag-bg.png" position="absolute" top="0" w="100%" />
                    <Image src={top1.imageRegion} position="absolute" w="65%" h="40%" top="6.5%" left="17%" />
                    <Image
                        src="https://zoogame.app/leadboard/flag-cover.png"
                        position="absolute"
                        w="73%"
                        top="1.2%"
                        left="13%"
                    />
                    <Box position="absolute" w="100%" top="55%" align="center" color="white" fontWeight="bold">
                        {top1.name}
                    </Box>
                </Box>
                <Box position="absolute" top="11%" left="20%" h="30.7%" w="15%">
                    <Image src="https://zoogame.app/leadboard/flag-bg.png" position="absolute" top="0" w="100%" />
                    <Image src={top2.imageRegion} position="absolute" w="65%" h="40%" top="6.5%" left="17%" />
                    <Image
                        src="https://zoogame.app/leadboard/flag-cover.png"
                        position="absolute"
                        w="73%"
                        top="1.2%"
                        left="13%"
                    />
                    <Box position="absolute" w="100%" top="55%" align="center" color="white" fontWeight="bold">
                        {top2.name}
                    </Box>
                </Box>
                <Box position="absolute" top="14%" left="64%" h="30.7%" w="15%">
                    <Image src="https://zoogame.app/leadboard/flag-bg.png" position="absolute" top="0" w="100%" />
                    <Image src={top3.imageRegion} position="absolute" w="65%" h="40%" top="6.5%" left="17%" />
                    <Image
                        src="https://zoogame.app/leadboard/flag-cover.png"
                        position="absolute"
                        w="73%"
                        top="1.2%"
                        left="13%"
                    />
                    <Box position="absolute" w="100%" top="55%" align="center" color="white" fontWeight="bold">
                        {top3.name}
                    </Box>
                </Box>

                {/* podium award */}
                <Image src="https://zoogame.app/leadboard/stage.png" position="absolute" w="90%" top="52%" left="5%" />

                <Box position="absolute" w="16%" height="32%" top="26%" left="43.5%">
                    <Image src={top1.imageItem} position="absolute" top="0" left="0" zIndex="1" />
                    <Image
                        src="https://zoogame.app/leadboard/nft-shadow.png"
                        position="absolute"
                        w="75%"
                        bottom="-2%"
                        left="12.5%"
                    />
                </Box>
                <Box position="absolute" w="16%" height="32%" top="33%" left="21%">
                    <Image src={top2.imageItem} position="absolute" top="0" left="0" zIndex="1" />
                    <Image
                        src="https://zoogame.app/leadboard/nft-shadow.png"
                        position="absolute"
                        w="75%"
                        bottom="-2%"
                        left="12.5%"
                    />
                </Box>
                <Box position="absolute" w="16%" height="32%" top="35%" left="62%">
                    <Image src={top3.imageItem} position="absolute" top="0" left="0" zIndex="1" />
                    <Image
                        src="https://zoogame.app/leadboard/nft-shadow.png"
                        position="absolute"
                        w="75%"
                        bottom="-2%"
                        left="12.5%"
                    />
                </Box>
            </Box>
        </>
    );
}

export default RankPlayerImage;
