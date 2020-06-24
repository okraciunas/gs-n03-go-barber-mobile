import React, {
  useEffect,
  createContext,
  FunctionComponent,
  useCallback,
  useState,
  useContext,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { initSession } from './../services/api'

interface AuthContextData {
  loading: boolean
  user: object
  signIn(email: string, password: string): Promise<void>
  signOut(): void
}

interface AuthState {
  token: string
  user: object
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ])

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await initSession(email, password)

      await AsyncStorage.multiSet([
        ['@GoBarber:token', data.token],
        ['@GoBarber:user', JSON.stringify(data.user)],
      ])

      setData({
        token: data.token,
        user: data.user,
      })
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ loading, user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (context) return context

  throw new Error('useAuth must be used within an AuthProvider.')
}

export {}
