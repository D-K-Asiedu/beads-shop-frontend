import { useMemo } from "react"
import { useGlobalStore } from "../../stores/useGlobalStore"
import ProductCard from "./ProductCard"
import { StyledProductsSection } from "../../styled/home"
import PaginationControls, { usePagination } from "../PaginationControls"

function Products({ products }) {
  const searchQuery = useGlobalStore(state => state.searchQuery)

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const { name, description } = product
      const query = searchQuery.toLowerCase()
      return name.toLowerCase().includes(query) || description.toLowerCase().includes(query)
    })
  }, [products, searchQuery])

  const pagination = usePagination({
    totalItems: filteredProducts.length,
    itemsPerPage: 10,
  })

  const paginatedProducts = pagination.filter(filteredProducts)
  
  return (
    <>
      {/* // TODO: Add filter stuff */}
      {searchQuery !== ""
        ? (
          <p>Showing {filteredProducts.length} results for "{searchQuery}"</p>
        )
        : null
      }
      <StyledProductsSection>
        {paginatedProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </StyledProductsSection>
      <PaginationControls pagination={pagination} />
    </>
  )
}

export default Products

function nonEmptyStringProp(key, value){
  if(value === "") return {}
  return {[key]: value}
}