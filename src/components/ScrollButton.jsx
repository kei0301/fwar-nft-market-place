import React, { useState } from 'react';
import { FiArrowUpCircle } from 'components/icon/feather';
import { Box, Button, useColorMode, useTheme } from '@chakra-ui/react';

const ScrollButton = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <>
      <Box
        onClick={scrollToTop}
        position="fixed"
        bottom={10}
        right={2}
        display={visible ? 'inline' : 'none'}
      >
        <Button bgColor={colorMode === 'dark' ? '#febe43' : '#febe43'} color="white">
          <FiArrowUpCircle />
        </Button>
      </Box>
    </>
  );
};

export default ScrollButton;
