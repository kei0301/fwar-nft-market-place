import { Button } from '@chakra-ui/react';
export default function ButtonSelect({ onClick, title, children, ...props }) {
  // const theme = useTheme();
  // const { colorMode } = useColorMode();
  return (
    <>
      <Button
        bg="primary.base"
        px={12}
        py={1.5}
        borderRadius="10rem"
        color="white.base"
        fontWeight="medium"
        cursor="pointer"
        _hover={{ boxShadow: '0 8px 25px -8px #FEBE43;' }}
        transition="color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,background 0s,border 0s"
        onClick={onClick}
        align="center"
        {...props}
      >
        {title}
        {children}
      </Button>
    </>
  );
}
