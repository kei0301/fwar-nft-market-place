import React from "react";
import { useRef } from "react";
import {
    Box,
    Image,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorMode,
    useTheme,
    ScaleFade,
    Tooltip,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import LeaderBoardApi from "../../apis/LeaderBoardApi";
import TeamApi from "../../apis/TeamApi";

import { elementDropdown } from "utils/dataFilter";
import FilterLeaderBoard from "./FilterLeaderBoard";
import LeaderBoardCardDisplay from "./LeaderBoardCardDisplay";

function LeaderBoard({ role }) {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const { user } = useSelector((state) => state.user);
    const ref = useRef(true);
    const [listUsersRank, setListUsersRank] = React.useState([]); // list user
    const [elementState, setElementState] = React.useState("");
    const [teamIdState, setTeamIdState] = React.useState("");
    const [teamDropdown, setTeamDropdown] = React.useState([]);

    //Get Team Dropdown
    const getTeams = async () => {
        const { data: listTeams } = await TeamApi.getALl();
        const teams = listTeams.map((i) => ({
            value: i.teamId,
            _id: i._id,
            label: i.name,
        }));
        setTeamDropdown(teams);
        console.log(teams)
        return teams;
    };

    const getLeaderBoard = async (teamIdState, elementState) => {
        const { data: listUsers } = await LeaderBoardApi.GetLeaderBoard({ teamId: teamIdState ? teamIdState._id : '', element: elementState.value });
        setListUsersRank(listUsers.docs);
    };

    const handleChangeElement = (element) => {
        setElementState(element);
    };
    const handleChangeTeamId = (teamId) => {
        setTeamIdState(teamId);
    };

    React.useEffect(() => {
        ref.current = true;
        if (ref.current) {
            if (teamIdState) {
                getLeaderBoard(teamIdState, elementState ? elementState : elementDropdown[0])
            }
            else {
                getTeams().then(data => {
                    getLeaderBoard(teamIdState ? teamIdState : data[0], elementState ? elementState : elementDropdown[0])
                });
            }
        }
        return () => {
            ref.current = false;
        };
    }, [user, teamIdState, elementState]);
    const listRankPlayer = listUsersRank?.map((item, index) => (
        <Tr key={item._id}>
            <Td>{index + 1}</Td>
            <Td>
                <Image src={item.imageRegion} w="84px" />
            </Td>

            <Td>
                <Tooltip label={item.userId.address} aria-label="A tooltip">
                    <Text>
                        {item.userId.address}
                    </Text>
                </Tooltip>
            </Td>
            <Td>
                <Link to={`/card/detail/${item.nftId}`} key={item.nftId}>
                    <LeaderBoardCardDisplay info={item}>
                    </LeaderBoardCardDisplay>
                </Link>

            </Td>
            <Td>
                <Text>{item.attack}</Text>
            </Td>
        </Tr>
    ));

    return (
        <>
            <ScaleFade initialScale={1.15} in>
                <Box
                    bg={colorMode === "dark" ? theme.colors.dark.light : "white"}
                    p={8}
                    boxShadow="content"
                    borderRadius={8}
                    position="relative"
                >
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem colSpan={{ base: 2, md: 2 }}>
                            <Grid
                                templateColumns={{
                                    base: "repeat(1, 1fr)",
                                    md: "repeat(2, 1fr)",
                                    lg: "repeat(2, 1fr)",
                                }}
                                gap={4}
                            >
                                {teamDropdown.length && (

                                    <GridItem>
                                        <FilterLeaderBoard
                                            placeholder="Team"
                                            handleChange={handleChangeTeamId}
                                            optionDropdown={teamDropdown}
                                            defaultValue={teamDropdown[0]}
                                        />
                                    </GridItem>)}
                                <GridItem>
                                    <FilterLeaderBoard
                                        placeholder="Element"
                                        handleChange={handleChangeElement}
                                        optionDropdown={elementDropdown}
                                        defaultValue={elementDropdown[0]}
                                    />
                                </GridItem>

                            </Grid>
                        </GridItem>
                    </Grid>
                </Box>
                <Box p={5}>
                    <Table variant="simple" size="sm" overflowX="scroll">
                        {/* <TableCaption>Paginate</TableCaption> */}
                        <Thead bgColor="gray.100">
                            <Tr>
                                <Th>Ranking</Th>
                                <Th>region</Th>
                                <Th width="30%">Player</Th>
                                <Th width="15%">Card</Th>
                                <Th>Attack</Th>
                            </Tr>
                        </Thead>
                        <Tbody>{listRankPlayer}</Tbody>
                    </Table>
                </Box>
            </ScaleFade>
        </>
    );
}

export default LeaderBoard;
