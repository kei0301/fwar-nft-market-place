import React from 'react';

import { ListItem, ListIcon, Text } from '@chakra-ui/react';
import { FiDisc } from 'components/icon/feather';

function ItemListComponent({ name, value, infoNft }) {
  console.log('infoNft', infoNft);
  return (
    <>
      <ListItem>
        <ListIcon as={FiDisc} />
        {name} = {value}{' '}
        <Text color="green">{infoNft && `( + ${Math.floor(infoNft.attack)})`}</Text>
        {/* {+value ? Intl.NumberFormat().format(value) : value} */}
      </ListItem>
    </>
  );
}

export default ItemListComponent;
