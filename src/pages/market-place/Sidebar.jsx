import {
  Box,
  Text,
  useColorMode,
  useTheme,
  Stack,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useState } from 'react';
import TeamApi from 'apis/TeamApi';

const dataRarity = [
  { id: '', name: 'All' },
  { id: '1', name: 'Junk' },
  { id: '2', name: 'Normal' },
  { id: '3', name: 'Rare' },
  { id: '4', name: 'Epic' },
  { id: '5', name: 'Legendary' },
];

function Sidebar({
  handleChangeRarity,
  valueState,
  handleChangeTeam,
  valueTeam,
}) {
  const [teamDropdown, setTeamDropdown] = React.useState([]);
  const { colorMode } = useColorMode();
  const theme = useTheme();
  console.log(teamDropdown);
  //Get Team Dropdown
  const getTeams = async () => {
    const { data: listTeams } = await TeamApi.getALl();
    let teams = [{ id: '', name: 'All' }];
    listTeams.map((i) => teams.push({ id: i.teamId, name: i.name }));
    console.log('listTeams', listTeams);
    setTeamDropdown(teams);
  };
  React.useEffect(() => {
    getTeams();
  }, [valueTeam]);
  return (
    <>
      <Text fontSize="0.9rem" fontWeight="medium" marginBottom="1rem">
        Filters
      </Text>
      <Box
        w="16.25rem"
        p={5}
        bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
        boxShadow="content"
        borderRadius="6px"
      >
        <Box>
          <Text marginTop={10} marginBottom={3}>
            Rarity
          </Text>
          <RadioGroup onChange={handleChangeRarity} value={valueState}>
            <Stack>
              {dataRarity.map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <Text marginTop={10} marginBottom={3}>
            Teaming
          </Text>
          <RadioGroup onChange={handleChangeTeam} value={valueTeam}>
            <Stack>
              {teamDropdown.map((item) => (
                <Radio key={item.name} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
