/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { DOTS } from '../../constant';
import usePagination from './usePagination';

function CustomPagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) {
  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [currentPage]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Pagination className="pagination-with-border">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink onClick={() => onPageChange(currentPage - 1)} previous />
      </PaginationItem>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <PaginationItem disabled key={index}>
              <PaginationLink>&#8230;</PaginationLink>
            </PaginationItem>
          );
        }
        return (
          <PaginationItem active={currentPage === pageNumber} key={index}>
            <PaginationLink onClick={() => onPageChange(pageNumber)}>{pageNumber}</PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={currentPage === lastPage}>
        <PaginationLink onClick={() => onPageChange(currentPage + 1)} next />
      </PaginationItem>
    </Pagination>
  );
}

export default CustomPagination;
