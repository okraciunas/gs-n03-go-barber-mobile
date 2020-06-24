import React, { FunctionComponent } from 'react'

import { AuthProvider } from './auth'

const AppProvider: FunctionComponent = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

export default AppProvider
