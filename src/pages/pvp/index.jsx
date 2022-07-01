import {
  Box,
  Grid,
  Image,
  Stack,
  useColorMode,
  useTheme,
  VStack,
  Button,
  Text
} from '@chakra-ui/react';
import ButtonSelect from 'components/ButtonSelect';
import Loadable from 'components/Loadable';
import ScaleFadeCustom from 'components/ScaleFadeCustom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import Rank from './rank';
import { GAME_URL } from 'utils/config';

// import ChooseTeamComponent from './ChooseTeamComponent';

// import ScreenGame from './ScreenGame';

const Header = Loadable(lazy(() => import('./Header')));
const ChooseTeamComponent = Loadable(lazy(() => import('./ChooseTeamComponent')));

function Pvp() {
  const { user } = useSelector((state) => state.user);
  // console.log('user', user);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  // console.log('colyseus', Colyseus);
  // console.log(user);
  const handleOpenGame = () => {
    window.open(
      '/game',
      'Fwar-Window',
      'width=800,height=600'

      // 'location=yes,height=%100,width=%100,left=0,location=0,scrollbars=yes,status=yes'
    );
  };
  return (
    <>
      <ScaleFadeCustom>
        {/* <Header /> */}
        {/* <Button onClick={joinRoom}>join room</Button> */}
        <Stack align="center" justify="center" mb={10}>
          {/* <ButtonSelect
            onClick={handleOpenGame}
            fontSize="50px"
            title="Play PVP"
            py="2rem"
            my="1rem"
          /> */}
          <Image w="30%" src="assets/button-play.png" cursor="pointer" onClick={handleOpenGame} />
        </Stack>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={5} mb={10}>
          <ChooseTeamComponent user={user} role="attacker" />
          <ChooseTeamComponent user={user} role="defender" />
        </Grid>
        <Stack align="center" justify="center" mb={10}>
          <Image src="assets/01.png" w="50%" cursor="pointer" align="center"></Image>
        </Stack>
        <Box
          // align="center"
          // justify="center"
          // p={5}
          // bg={colorMode === 'dark' ? theme.colors.dark.light : 'white'}
          borderRadius="8px"
          // boxShadow={theme.shadows.content}
          overflow="scroll"
        >
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
            // justifyContent="center"
          >
            <Box>
              <Text fontSize="30px" fontWeight="bold" align="center" color={theme.colors.cyan.base}>
                TOP 100 ATTACKER
              </Text>
              <Rank role="attacker" />
            </Box>
            <Box>
              <Text fontSize="30px" fontWeight="bold" align="center" color={theme.colors.cyan.base}>
                TOP 100 DEFENDER
              </Text>
              <Rank role="defender" />
            </Box>
          </Grid>
        </Box>
        {/* <ScreenGame /> */}
      </ScaleFadeCustom>
    </>
  );
}

export default Pvp;
