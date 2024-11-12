const ServerRedirect = ({ to }) => {
  if(to === undefined) throw new Error(`ServerRedirect: "to" prop is required`)
  window.location.href = to
  
  return null
}

export default ServerRedirect