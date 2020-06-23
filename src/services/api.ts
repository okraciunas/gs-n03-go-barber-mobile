import axios, { AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const initSession = async (
  email: string,
  password: string,
): Promise<AxiosResponse<any>> =>
  await api.post('sessions', { email, password })

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<any>> =>
  await api.post('users', { name, email, password })

export default api
