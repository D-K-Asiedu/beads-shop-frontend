import { Navigate } from "react-router-dom"
import { useGlobalStore } from "../../stores/useGlobalStore"

function PrivateRoute({ children }) {
  const userToken = useGlobalStore(state => state.userToken)

  if(userToken === null){
    return <Navigate to="/" />
  }

  else {
    return children
  } 
}

export default PrivateRoute