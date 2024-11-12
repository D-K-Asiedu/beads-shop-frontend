import { useState, useEffect, useRef } from "react"
import { useGlobalStore } from "../stores/useGlobalStore"
import { Link, useNavigate } from "react-router-dom"
import { formatCedis } from "../utils/format"
import { debounce } from "../utils/rate-limiters"

import Dropdown from "../components/Dropdown"
import ProductImage from "./product/ProductImage"
import { 
  StyledIconButton,
  StyledDropdown,
  StyledDropdownList,
  StyledCartDropdownContent,
  StyledSearchInput,
  StyledCartDropdownItem
} from "../styled/home"
import { StyledFlex, StyledHeader } from "../styled/layout"

import { IoIosSearch } from "react-icons/io"
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai"
import ApiService from "../services/api"
import { useResource } from "../utils/data-fetch"
import { Suspense } from "react"
import LoadingIndicator from "./LoadingIndicator"

function Header() {  
  return (
    <StyledHeader>
      <h1>Pharmasoft</h1>

      <StyledFlex gap="0.25em" alignItems="center">
        <Search />
        <Account />
        <Cart />
      </StyledFlex>
    </StyledHeader>
  )
}

export default Header

function Search(){
  const [isSearchActive, setIsSearchActive] = useState(false)
  const searchInputRef = useRef(null)
  const searchQuery = useGlobalStore(state => state.searchQuery)
  const setSearchQuery = useGlobalStore(state => state.setSearchQuery)

  useEffect(() => {
    if(isSearchActive){
      searchInputRef.current?.focus()
    }
  }, [isSearchActive])

  const handleSearch = debounce((e) => {
    setSearchQuery(e.target.value)
  }, 450)
  
  return (
    <div style={{position:"relative"}}>
      <StyledIconButton onClick={() => setIsSearchActive(true)}>
        <IoIosSearch />
      </StyledIconButton>
      {isSearchActive
        ? (
          <div style={{position:"absolute", right: 0, top: 0}}>
            <StyledSearchInput 
              type="search" 
              ref={searchInputRef} 
              defaultValue={searchQuery}
              onChange={handleSearch}
              onBlur={() => setIsSearchActive(false)}
            />
          </div>
        )
        : null
      }
    </div>
  )
}

function Account(){
  const userToken = useGlobalStore(state => state.userToken)
  const isUserLoggedIn = userToken !== null

  // TODO: Add error boundary
  const userResource = useResource(ApiService.getUser, {token: userToken})
  
  return (
    <Dropdown>
      <div style={{ position: "relative" }}>
        <Dropdown.button>
          {({ onClick, ref }) => (
            <StyledIconButton {...{ onClick, ref }}>
              <AiOutlineUser />
            </StyledIconButton>
          )}
        </Dropdown.button>
        <Dropdown.content>
          {({ ref }) => (
            <StyledDropdown ref={ref}>
              {isUserLoggedIn
                ? (
                  <Suspense 
                    fallback={(
                      <div style={{padding: "0.5em"}}>
                        <LoadingIndicator scale={1.5} />
                      </div>
                    )}
                  >
                    <AccountDropdownContent userResource={userResource} />
                  </Suspense>
                )
                : (
                  <StyledDropdownList>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </StyledDropdownList>
                )
              }
            </StyledDropdown>
          )}
        </Dropdown.content>
      </div>
    </Dropdown>
  )
}

function AccountDropdownContent({ userResource }){
  const user = userResource.read()
  const navigate = useNavigate()
  const clearUserToken = useGlobalStore(state => state.clearUserToken)

  function handleLogout(e){
    const shouldLogout = window.confirm("Are you sure you want to logout?")
    if(shouldLogout) {
      clearUserToken()
      navigate("/login")
    }
  }
  
  return (
    <StyledDropdownList maxWidth="17.5em">
      <li><p className="emphasis">Signed in as {user.name}</p></li>
      <div className="hr"></div>
      {/* <li><Link to="#">Orders</Link></li> */}
      <li><button onClick={handleLogout}>Logout</button></li>
    </StyledDropdownList>
  )
}

function Cart(){
  const userToken = useGlobalStore(state => state.userToken)
  const isUserLoggedIn = userToken !== null
  const cartResource = useResource(ApiService.getCart, {token: userToken})

  return (
    <Dropdown>
      <div style={{ position: "relative" }}>
        <Dropdown.button>
          {({ onClick, ref }) => (
            <StyledIconButton {...{ onClick, ref }}>
              <AiOutlineShoppingCart />
            </StyledIconButton>
          )}
        </Dropdown.button>
        <Dropdown.content>
          {({ ref }) => (
            <StyledDropdown ref={ref}>
              {isUserLoggedIn
                ? (
                  <Suspense 
                    fallback={(
                      <div style={{padding: "0.5em 2em"}}>
                        <LoadingIndicator scale={1.5} />
                      </div>
                    )}
                  >
                    <CartDropdownContent 
                      cartResource={cartResource} 
                    />
                  </Suspense>
                )
                : (
                  <p
                    style={{
                      minWidth: "12em",
                      padding: "0.5em"
                    }}
                  ><Link to="/login" style={{color: "#622bff"}}>Login</Link> to access cart</p>
                )
              }
            </StyledDropdown>
          )}
        </Dropdown.content>
      </div>
    </Dropdown>
  )
}

function CartDropdownContent({ cartResource }) {
  const [cartId, cart] = cartResource.read()
  
  return (
    <StyledCartDropdownContent as="section">
      <h3>Your Cart</h3>
      {(cart?.length ?? 0) === 0 
        ? (
          <p className="dim-text">Your cart is empty</p>
        ) 
        : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  <CartDropdownItem item={item}/>
                </li>
              ))}
            </ul>
            <StyledFlex justifyContent="space-between" style={{fontWeight: "bold"}}>
              <p>Total</p>
              <p>{formatCedis(cart.reduce((acc, item) => acc + item.totalPrice, 0))}</p>
            </StyledFlex>
            {cart.length > 0
              ? (
                <StyledFlex direction="column" gap="0.5em" alignItems="center" style={{marginTop: "1em"}}>
                  <Link to={`${import.meta.env.APP_API_URL}/create-checkout-session?cart-id=${cartId}`} className="btn">Checkout</Link>
                  <Link to="/cart" className="link">View cart in full page</Link>
                </StyledFlex>
              )
              : null
            }
          </>
        )
      }
    </StyledCartDropdownContent>
  )
}

function CartDropdownItem({ item }) {
  return (
    <StyledCartDropdownItem>
      <h3>{item.name}</h3>
      <p>{item.quantity}</p>
      <p>{formatCedis(item.totalPrice)}</p>
    </StyledCartDropdownItem>
  )
}