import React from 'react';

import { FiChevronLeft, FiChevronRight } from 'components/icon/feather';
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious
} from '@ajna/pagination';
import { useTheme } from '@chakra-ui/react';

function PaginatorCustom({ pagesQuantity, currentPage, onPageChange, pagesCount, pages }) {

  const theme = useTheme();
  console.log(pagesQuantity, currentPage, onPageChange, pages, pagesCount, 999)

  return (
    <>
      <Pagination
        pagesCount={pagesQuantity > 0 && pagesQuantity}
        currentPage={currentPage}
        onPageChange={onPageChange}
      >
        <PaginationContainer align="center" justify="center">
          <PaginationPrevious
            variant="link"
            _hover={{
              bg: 'yellow.200'
            }}
            p={2}
            borderRadius="50%"
          >
            <FiChevronLeft color={theme.colors.iconPaginator} strokeWidth={4} size={24} />
            {/* Or an icon from `react-icons` */}
          </PaginationPrevious>
          {/* <PaginationPageGroup isInline align="center" /> */}
          <PaginationPageGroup>
            {pages &&
              pages.map((page) => (
                <PaginationPage
                  key={`pagination_page_${page}`}
                  page={page}
                  w={10}
                  borderRadius="50%"
                  _current={{
                    bg: 'orange.300',
                    fontSize: 'sm',
                    _hover: {
                      bg: 'orange.200'
                    }
                  }}
                  _hover={{
                    bg: 'orange.200'
                  }}
                />
              ))}
          </PaginationPageGroup>
          <PaginationNext
            variant="link"
            _hover={{
              bg: 'orange.100'
            }}
            p={2}
            borderRadius="50%"
          >
            <FiChevronRight color={theme.colors.iconPaginator} strokeWidth={4} size={24} />
            {/* Or an icon from `react-icons` */}
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </>
  );
}

export default PaginatorCustom;
