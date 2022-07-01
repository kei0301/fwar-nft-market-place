import { Box, Button, Image } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import UserApi from 'apis/UserApi';

const buildUrl = 'Build';

const loaderUrl = buildUrl + '/BuildGame.loader.js';

const config = {
  dataUrl: buildUrl + '/BuildGame.data',
  frameworkUrl: buildUrl + '/BuildGame.framework.js',
  codeUrl: buildUrl + '/BuildGame.wasm',
  streamingAssetsUrl: 'StreamingAssets',
  companyName: 'Fusion',
  productName: 'Fwar',
  productVersion: '1.1'
};

const unityContext = new UnityContext({
  loaderUrl,
  ...config,
  webGLContextAttributes: {
    preserveDrawingBuffer: true
  }
});
// console.log('unityContext', unityContext);
function ScreenGame() {
  const [user, setUser] = useState(null);

  const { account } = useEthers();

  const [progression, setProgression] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  function Start() {
    unityContext.send('GameManager', 'SetNumberOfLane', 1);
    unityContext.send('GameManager', 'SetPlayerId', user._id);
  }

  // React.useEffect(function () {

  //   return function () {
  //     unityContext.removeAllEventListeners();
  //   };
  // }, []);

  // window.addEventListener('beforeunload', (ev) => {
  //   ev.preventDefault();
  //   return (ev.returnValue = 'Are you sure you want to close?');
  // });
  unityContext.on('progress', function (progression) {
    setProgression(progression);
  });
  useEffect(
    function () {
      if (account) {
        const getUser = async () => {
          const { data: dataUser } = await UserApi.find(account);
          setUser(dataUser);
        };
        getUser();
      }
      unityContext.on('loaded', function () {
        setIsLoaded(true);
      });
    },
    [account]
  );

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }
  return (
    <>
      <Box pos="relative" my={10} overflow="hidden">
        <Button onClick={handleOnClickFullscreen}>Fullscreen</Button>
        <p>Loading... {progression * 100}%</p>
        {/* {!isLoaded && <Image src="/assets/bg-game.png" w="100%" />} */}
        <Box
          onClick={Start}
          // zIndex="docked"
          // bgImage="src('/assets/bg-game.png')"
        >
          <Box w="100%" h="100%">
            <Unity
              unityContext={unityContext}
              style={{
                height: '100%',
                width: '100%',
                border: '2px solid black',
                background: 'grey',
                visibility: isLoaded ? 'visible' : 'hidden'
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ScreenGame;
