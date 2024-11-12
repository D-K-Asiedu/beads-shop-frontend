import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.APP_API_URL
})

const Endpoints = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  USER: '/auth/user',
  PRODUCTS: '/products',
  CART: "/cart",
  ADD_CART: "cart/add",
  UPDATE_CART_ITEM: "/cart-item/update"
}

const Status = {
  OK: "OK",
  ERROR: "Error"
}

class ApiService {
  static async getUser({token}){
    try {
      const res = await api.post(Endpoints.USER, {token})

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }
      
      return res.data.data
    } catch (err) {
      throw err.message
    }
  }
  static async login({email, password}){
    try {
      const res = await api.post(Endpoints.LOGIN, {email, password})

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }

      return res.data.token
    } catch (err) {
      throw err.message
    }
  }
  static async register({email, password, "first-name": firstName, "last-name": lastName}){
    try {
      const res = await api.post(Endpoints.REGISTER, {
        email,
        password,
        "first-name": firstName,
        "last-name": lastName
      })

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }

      return true
    } catch(err) {
      throw err.message
    }
  }
  // Requires token
  static async getProducts(){
    try {
      const res = await api.get(Endpoints.PRODUCTS)

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }

      return res.data.data
    } catch(err) {
      throw err.message
    }
  }
  static async getCart({token}){
    try {
      const res = await api.post(Endpoints.CART, {token})

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }

      return res.data.data
    } catch(err) {
      throw err.message
    }
  }
  static async addToCart({token, productId}){
    try {
      const res = await api.post(Endpoints.ADD_CART, {token, productId})

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }

      return res.data.data
    } catch(err) {
      throw err.message
    }
  } 
  static async updateCartItem({token, cartItemId, quantity}){
    try {
      const res = await api.post(Endpoints.UPDATE_CART_ITEM, {token, cartItemId, quantity})

      if(res.data.status === Status.ERROR){
        throw new Error(res.data.msg)
      }

      return res.data.data
    } catch(err) {
      throw err.message
    }
  }
}

export default ApiService