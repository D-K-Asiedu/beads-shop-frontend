import { useState, useRef } from "react"
import { useGlobalStore } from "../../stores/useGlobalStore"
import useOnClickOutside from "../../hooks/useOnClickOutside"
import ApiService from "../../services/api"
import { formatCedis } from "../../utils/format"

import ProductImage from "./ProductImage"
import Modal from "../Modal"
import LoadingIndicator from "../LoadingIndicator"
import {
  StyledProductCard,
  StyledDetailsButton,
  StyledIconButton,
  StyledPrice,
  StyledProductModal,
} from "../../styled/home"
import { StyledFlex } from "../../styled/layout"

import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosClose } from "react-icons/io"
import { useNavigate } from "react-router-dom"

function ProductCard({ product }) {
  const userToken = useGlobalStore(state => state.userToken)
  const isUserLoggedIn = userToken !== null

  const [showModal, setShowModal] = useState(false)
  const productDetailsRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const homeFlash = useGlobalStore(state => state.homeFlash)
  const navigate = useNavigate()

  function showProductDetails(){
    setShowModal(true)
  }

  function hideProductDetails(){
    setShowModal(false)
  }

  useOnClickOutside(productDetailsRef, hideProductDetails)

  async function handleAddToCart(){
    if(isUserLoggedIn) {
      setIsLoading(true)
      try {
        await ApiService.addToCart({
          token: userToken,
          productId: product.id,
        })

        if(showProductDetails) hideProductDetails()
        homeFlash?.showSuccess(`${product.name} added to cart`)
        window.scrollTo(0, 0)
      } catch (err) {
        homeFlash?.showError(`Failed to add ${product.name} to cart`)
      } finally {
        setIsLoading(false)
      }
    }

    else {
      if(showProductDetails) hideProductDetails()
      homeFlash?.showInfo("Login to add items to cart", {
        title: "Login",
        callback: () => {
          navigate("/login")
        }
      })
      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledProductCard>
      <ProductImage src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <StyledDetailsButton
        onClick={showProductDetails}
      ></StyledDetailsButton>

      <StyledFlex justifyContent="space-between" alignItems="center">
        <StyledPrice className="price">{formatCedis(product.cost)}</StyledPrice>
        <StyledIconButton 
          size="1.875em" 
          padding="0.25em"
          color="#1b8151"
          bgColor="#d4f0e3"
          style={{zIndex: 1}}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {!isLoading
            ? <AiOutlineShoppingCart />
            : <LoadingIndicator /> 
          }
        </StyledIconButton>
      </StyledFlex>

      <Modal 
        show={showModal} 
        parentElement={document.querySelector("#root")}
        onShow={() => productDetailsRef.current?.focus()}
      >
        <StyledProductModal>
          <article ref={productDetailsRef}>
            <ProductImage src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <StyledPrice className="price">{formatCedis(product.cost)}</StyledPrice>
            <button 
              className="cart-btn"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {!isLoading
                ? <span>Add to cart</span>
                : <LoadingIndicator scale={1.5} />
              }
            </button>
            <button className="close-btn" onClick={hideProductDetails}>
              <IoIosClose />
            </button>
          </article>
        </StyledProductModal> 
      </Modal>
    </StyledProductCard>
  )
}

export default ProductCard
