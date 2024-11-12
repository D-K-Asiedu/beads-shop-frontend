import { useState, useMemo, useEffect, useRef } from "react"
import useOnUpdateEffect from "../hooks/useOnUpdateEffect"
import styled from "styled-components"
import { StyledFlex } from "../styled/layout"

function PaginationControls({ pagination }) {
  useOnUpdateEffect(() => {
    window.scrollTo(0, 0)
  }, [pagination.currentPage])
  
  function generatePageNumbers() {
    const { currentPage, totalPages } = pagination
    const pageNumbers = []
    const MAX_PAGE_NUMBERS = 5

    if(currentPage === 1) {
      for (let i = 1; i <= Math.min(MAX_PAGE_NUMBERS, totalPages); i++) {
        if(MAX_PAGE_NUMBERS === i && totalPages > MAX_PAGE_NUMBERS + 1){
          pageNumbers.push(null)
          pageNumbers.push(totalPages)
          continue
        }
        pageNumbers.push(i)
      }
    }
    else if(currentPage === totalPages) {
      for (let i = Math.max(1, totalPages - MAX_PAGE_NUMBERS + 1); i <= totalPages; i++) {
        if(Math.max(1, totalPages - MAX_PAGE_NUMBERS + 1) === i && totalPages > MAX_PAGE_NUMBERS + 1){
          pageNumbers.push(1)
          pageNumbers.push(null)
          continue
        }
        pageNumbers.push(i)
      }
    }
    else {
      const start = Math.max(1, currentPage - Math.floor(MAX_PAGE_NUMBERS / 2))
      const end = Math.min(totalPages, currentPage + Math.floor(MAX_PAGE_NUMBERS / 2))
      let count = 0
      if(start > 1 + 1) {
        pageNumbers.push(1)
        pageNumbers.push(null)
        count++
      }
      for (let i = start; i <= end; i++) {
        if(count >= MAX_PAGE_NUMBERS) continue
        if(count >= MAX_PAGE_NUMBERS - 1 && end < totalPages - 1) continue
        pageNumbers.push(i)
        count++
      }
      if(end < totalPages - 1) {
        pageNumbers.push(null)
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const pageNumbers = generatePageNumbers()

  function handleNextPage() {
    if(!pagination.hasNextPage) return
    pagination.setPage(prev => prev + 1)
  }

  function handlePrevPage() {
    if(!pagination.hasPrevPage) return
    pagination.setPage(prev => prev - 1)
  }

  function jumpToPage(pageNumber) {
    return () => {
      pagination.setPage(pageNumber)
    }
  }
  
  return (
    <StyledFlex justifyContent="center" gap="0.25em" style={{marginBlock: "1em"}}>
      <StyledPaginationControl 
        disabled={!pagination.hasPrevPage}
        onClick={handlePrevPage}
      >Prev</StyledPaginationControl>
      {pageNumbers.map(pageNumber => {
        if (pageNumber === null) {
          return <StyledPaginationControl as="span" disabled key={Math.random()}>...</StyledPaginationControl>
        } else {
          return (
            <StyledPaginationControl 
              selected={pageNumber === pagination.currentPage}
              onClick={jumpToPage(pageNumber)} 
              key={pageNumber}
            >{pageNumber}</StyledPaginationControl>
          )
        }
      })}
      <StyledPaginationControl
        disabled={!pagination.hasNextPage}
        onClick={handleNextPage}
      >Next</StyledPaginationControl>
    </StyledFlex>
  )
}

export default PaginationControls

export function usePagination({ totalItems, itemsPerPage = 10, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const pagination = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    function filter(data){
      const start = (currentPage - 1) * itemsPerPage
      const end = start + itemsPerPage
      return data.slice(start, end)
    }
    function setPage(pageNumber) {
      if(pageNumber < 1 || pageNumber > totalPages) setPage(1)
      setCurrentPage(pageNumber)
    }

    return {
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      setPage,
      filter
    }
  }, [totalItems, itemsPerPage, currentPage])

  return pagination
}

const StyledPaginationControl = styled.button`
  background: ${props => !props.disabled ? props.selected ? props.theme.color.accent: "#ccc" : "#eee"};
  padding-inline: 0.5em;
  padding-block: 0.1em;
  border: 1px solid ${props => props.selected ? props.theme.color.accentDark : "#aaa"};
  color: ${props => !props.disabled ? props.selected ? "#fff" : "currentColor": "#aaa"};

  &:first-child {
    border-top-left-radius: 0.25em;
    border-bottom-left-radius: 0.25em;
  }

  &:last-child {
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
  }
`