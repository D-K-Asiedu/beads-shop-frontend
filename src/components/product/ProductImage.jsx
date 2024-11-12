import { useRef, useEffect } from "react"

const placeHolderImage = "https://via.placeholder.com/150"

function ProductImage({ src, ...props }) {
  const imageRef = useRef(null)

  useEffect(() => {
    imageRef.current.src = `${import.meta.env.APP_API_URL}/image/${src}`
    imageRef.current.onerror = () => {
      if(imageRef.current.src === placeHolderImage) return
      imageRef.current.src = placeHolderImage
    }
  }, [src])

  return <img ref={imageRef} {...props} />
}

export default ProductImage