import React, { FunctionComponent } from 'react'
import { View, Button } from 'react-native'

import { useAuth } from './../../hooks/auth'

const Dashboard: FunctionComponent = () => {
  const { signOut } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Sair" onPress={signOut} />
    </View>
  )
}

export default Dashboard
