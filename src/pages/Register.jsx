import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

function Register() {
  const flash = useFlash()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleRegister(e) {
    e.preventDefault()

    if(isLoading) return
    setIsLoading(true)
    try {
      const data = Object.fromEntries(new FormData(e.target).entries())
      await ApiService.register(data)
      navigate("/login", {
        state: {
          message: "Registration successful",
          type: "success"
        }
      })
    } catch(err) {
      flash.showError(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <StyledPage>
      <StyledMain>
        <StyledTitle>Register</StyledTitle>

        <div style={{marginBottom: "1em"}}>
          <Flash controller={flash} />
        </div>
        
        <StyledForm onSubmit={handleRegister}>
          <div style={{display: "flex", gap: "1em"}}>
            <StyledFormField>
              <label htmlFor="first-name">First name</label>
              <input name="first-name" id="first-name" required />
            </StyledFormField>
            <StyledFormField>
              <label htmlFor="last-name">Last name</label>
              <input name="last-name" id="last-name" required />
            </StyledFormField>
          </div>

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
              ? <span>Register</span>
              : (
                <LoadingIndicator scale={1.5} />
              )
            }
          </StyledButton>
        </StyledForm>

        {/* <StyledSeparator>or</StyledSeparator>
        <StyledButton type="button">Register with google</StyledButton> */}

        <StyledFlex alignItems="center" gap="0.5em" style={{marginTop: "2em", marginLeft: "1em"}}>
          <AiOutlineInfoCircle color="#888" />
          <StyledDimText>Already have an account? <StyledLink to="/login">Login</StyledLink></StyledDimText>
        </StyledFlex>
      </StyledMain>
    </StyledPage>
  )
}

export default Register