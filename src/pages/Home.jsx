import { Suspense } from "react"
import { useLoaderData, Await } from "react-router-dom"

import Header from "../components/Header"
import Products from "../components/product/Products"
import { StyledPage } from "../styled/home"
import LoadingIndicator from "../components/LoadingIndicator"
import Flash, { useFlash } from "../components/Flash"
import { useEffect } from "react"
import { useGlobalStore } from "../stores/useGlobalStore"
import { useSearchParams } from "react-router-dom"

function Home() {  
  const data = useLoaderData()
  const flash = useFlash()
  const setHomeFlash = useGlobalStore(state => state.setHomeFlash)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setHomeFlash(flash)
  }, [flash])

  useEffect(() => {
    if(searchParams.get("status") === "success") {
      flash.showSuccess(searchParams.get("message"))
    }
    else if(searchParams.get("status") === "error") {
      flash.showError(searchParams.get("message"))
    }
  }, [])
  
  return (
    <StyledPage>
      <Header />

      <main style={{paddingInline: "1em", paddingBlock: "1em", position: "relative"}}>
        <div style={{paddingBlock: "0.5em"}}>
          <Flash controller={flash} />
        </div>
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
              <p style={{color: "#888"}}>Fetching products...</p>
            </div>
          )}
        >
          <Await
            resolve={data.products}
            errorElement={<p>Failed to load products</p>}
          >
            {products => (<Products products={products} />)}
          </Await>
        </Suspense>
      </main>
    </StyledPage>
  )
}

export default Home