
import { formatCedis } from "../utils/format"

import { Link } from "react-router-dom"
import ProductImage from "../components/product/ProductImage"
import { StyledPage } from "../styled/cart"
import { StyledFlex, StyledHeader } from "../styled/layout"

import { MdDeleteForever } from "react-icons/md"
import { useResource } from "../utils/data-fetch"
import ApiService from "../services/api"
import { useGlobalStore } from "../stores/useGlobalStore"
import { Suspense } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import styled from "styled-components"
import { StyledButton } from "../styled/auth"
import { useState } from "react"
import { startTransition } from "react"

function Cart() {
  const userToken = useGlobalStore(state => state.userToken)
  const cartResource = useResource(ApiService.getCart, { token: userToken })

  const [_, set_] = useState(0)
  function triggerUpdate(){
    set_(prev => prev + 1)
  }

  return (
    <StyledPage>
      <StyledHeader>
        <h1>Cart</h1>
      </StyledHeader>

      <main style={{ paddingInline: "1em", paddingBlock: "1em", position: "relative" }}>
        <Suspense
          fallback={(
            <div 
              style={{
                position: "absolute", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%, -50%)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <LoadingIndicator scale={1.75} />
              <p style={{color: "#888"}}>Fetching cart...</p>
            </div>
          )}
        >
          <CartContent cartResource={cartResource} triggerUpdate={triggerUpdate} />
        </Suspense>
      </main>
    </StyledPage>
  )
}

export default Cart

function CartContent({ cartResource, triggerUpdate }) {
  const [cartId, cart] = cartResource.read()
  const userToken = useGlobalStore(state => state.userToken)

  function handleIncrement(item){
    return async () => {
      await ApiService.updateCartItem({
        token: userToken,
        cartItemId: item.id,
        quantity: item.quantity + 1,
      })
      triggerUpdate()
    }
  }
  
  function handleDecrement(item){
    return async () => {
      await ApiService.updateCartItem({
        token: userToken,
        cartItemId: item.id,
        quantity: item.quantity - 1,
      })
      triggerUpdate()
    }
  }

  return (
    (cart?.length ?? 0) > 0
      ? (
        <>
          <StyledCartList>
            {cart.map(item => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <StyledFlex alignItems="center" gap="0.5em">
                  <button onClick={handleDecrement(item)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={handleIncrement(item)}>+</button>
                </StyledFlex>
                <p>{formatCedis(item.totalPrice)}</p>
              </li>
            ))}
          </StyledCartList>
          <StyledFlex justifyContent="space-between" style={{ fontWeight: "bold", marginTop: "3em" }}>
            <p>Total</p>
            <p>{formatCedis(cart.reduce((acc, item) => acc + item.totalPrice, 0))}</p>
          </StyledFlex>

          <div style={{ marginTop: "2em" }}>
            <StyledButton as="a" href={`${import.meta.env.APP_API_URL}/create-checkout-session?cart-id=${cartId}`}>Checkout</StyledButton>
          </div>
        </>
      )
      : (
        <p>Your cart is empty</p>
      )
  )
}

const StyledCartList = styled.ul`
  & > li {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto auto;
    gap: 2.5em;
    padding-inline: 0.5em;
    padding-block: 1em;
    border-bottom: 1px solid #ccc;
  }

  & > li  button {
    width: 1.5ch;
    height: 1.5ch;
    display: grid;
    place-content: center;
    font-weight: bold;
    border-radius: 0.25em;
    color: ${props => props.theme.color.accentDark};
    background-color: #ddd;
  }
`