import { List, ListItem, ListIcon, OrderedList, UnorderedList, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { admin } from '../menu-item';
import { user } from '../menu-item';
import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import { useState } from 'react';

function MenuList({ handleCloseDrawer }) {
  const { account } = useEthers();
  const [navItems, setNavItems] = useState('user');
  useEffect(() => {
    if (account && account === '0x8B6e132456BEA45954befF3488B4c7e245128b7d') {
      setNavItems('admin');
    } else {
      setNavItems('user');
    }
  }, [account])

  return (
    <>
      <List spacing={2}>
        {
          navItems === 'admin' ?
            admin.map((item) => {
              return (
                // _hover={{ background: 'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))' }}
                <ListItem key={item.id}>
                  {/* {item.type === 'group' &&  } */}
                  <NavLink to={item.url} onClick={handleCloseDrawer} exact activeClassName="menu-item-active">
                    <Box
                      display="flex"
                      alignItems="center"
                      p={2}
                      role="group"
                      cursor="pointer"
                      borderRadius="0.4rem"
                      // overflow="hidden"
                      textTransform="capitalize"
                      _hover={{
                        backgroundColor: 'primary.light',
                        color: 'primary.base',

                        transition: 'all .25s ease'
                      }}
                    >
                      <ListIcon
                        as={item.icon}
                        _groupHover={{ transform: 'translateX(5px)' }}
                        transition="transform .25s ease"
                      />
                      <Box
                        as="span"
                        _groupHover={{ transform: 'translateX(5px)' }}
                        transition="transform .25s ease"
                      >
                        {item.title}
                      </Box>
                    </Box>
                  </NavLink>
                </ListItem>
              );
            })
            :
            user.map((item) => {
              return (
                // _hover={{ background: 'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))' }}
                <ListItem key={item.id}>
                  {/* {item.type === 'group' &&  } */}
                  <NavLink to={item.url} onClick={handleCloseDrawer} exact activeClassName="menu-item-active">
                    <Box
                      display="flex"
                      alignItems="center"
                      p={2}
                      role="group"
                      cursor="pointer"
                      borderRadius="0.4rem"
                      // overflow="hidden"
                      textTransform="capitalize"
                      _hover={{
                        backgroundColor: 'primary.light',
                        color: 'primary.base',

                        transition: 'all .25s ease'
                      }}
                    >
                      <ListIcon
                        as={item.icon}
                        _groupHover={{ transform: 'translateX(5px)' }}
                        transition="transform .25s ease"
                      />
                      <Box
                        as="span"
                        _groupHover={{ transform: 'translateX(5px)' }}
                        transition="transform .25s ease"
                      >
                        {item.title}
                      </Box>
                    </Box>
                  </NavLink>
                </ListItem>
              );
            })
        }
      </List>
    </>
  );
}

export default MenuList;
