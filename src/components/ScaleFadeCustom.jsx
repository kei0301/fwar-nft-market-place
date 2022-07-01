import { ScaleFade } from '@chakra-ui/react';

function ScaleFadeCustom({ children }) {
  return (
    <ScaleFade initialScale={1.15} in>
      {children}
    </ScaleFade>
  );
}

export default ScaleFadeCustom;
