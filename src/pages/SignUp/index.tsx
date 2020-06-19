import React, { FunctionComponent } from 'react'
import {
  Image,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import logo from './../../assets/logo.png'
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInLabel,
} from './styles'

import Input from './../../components/Input'
import Button from './../../components/Button'

const SignIn: FunctionComponent = () => {
  const navigation = useNavigation()

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button>Entrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInLabel>Voltar paga logon</BackToSignInLabel>
      </BackToSignInButton>
    </>
  )
}

export default SignIn
