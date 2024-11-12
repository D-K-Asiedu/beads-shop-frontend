import styled from "styled-components"
import { StyledPage } from "../styled/layout"
import LoadingIndicator from "./LoadingIndicator"

function PageLoader() {
  return (
    <StyledPageLoader>
      <LoadingIndicator scale={3} />
    </StyledPageLoader>
  )
}

const StyledPageLoader = styled(StyledPage)`
  display: grid;
  place-content: center;
`

export default PageLoader