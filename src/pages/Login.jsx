import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useGlobalStore } from "../stores/useGlobalStore"
import ApiService from "../services/api"

import Flash, { useFlash } from "../components/Flash"
import LoadingIndicator from "../components/LoadingIndicator"
import {
  StyledPage,
  StyledMain,
  StyledTitle,
  StyledForm,
  StyledFormField,
  StyledButton,
  StyledLink,
  StyledSeparator,
  StyledDimText
} from "../styled/auth"
import { StyledFlex } from "../styled/layout"

import { AiOutlineInfoCircle } from "react-icons/ai"

function Login() {
  const flash = useFlash()
  const setUserToken = useGlobalStore(state => state.setUserToken)
  const navigate = useNavigate()
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(state?.type === "success") flash.showSuccess(state.message)
  }, [state?.message])
  
  async function handleLogin(e) {
    e.preventDefault()
    
    if(isLoading) return
    setIsLoading(true)
    try {
      const data = Object.fromEntries(new FormData(e.target).entries())
      const token = await ApiService.login(data)
      setUserToken(token)
      navigate("/")
    } catch(err) {
      flash.showError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <StyledPage>
      <StyledMain>
        <StyledTitle>Login</StyledTitle>

        <div style={{marginBottom: "1em"}}>
          <Flash controller={flash} />
        </div>

        <StyledForm onSubmit={handleLogin}>
          <StyledFormField>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </StyledFormField>
          <StyledFormField>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </StyledFormField>

          <StyledButton type="submit" disabled={isLoading}>
            {!isLoading
              ? <span>Login</span>
              : (
                <LoadingIndicator scale={1.5} />
              )
            }
          </StyledButton>
        </StyledForm>

        {/* <StyledSeparator>or</StyledSeparator>
        <StyledButton type="button">Login with google</StyledButton> */}

        <StyledFlex alignItems="center" gap="0.5em" style={{marginTop: "2em", marginLeft: "1em"}}>
          <AiOutlineInfoCircle color="#888" />
          <StyledDimText>Don't have an account? <StyledLink to="/register">Register</StyledLink></StyledDimText>
        </StyledFlex>
      </StyledMain>
    </StyledPage>
  )
}

export default Login