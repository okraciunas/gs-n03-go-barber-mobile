import React, { FunctionComponent } from 'react'
import {
  Image,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import logo from './../../assets/logo.png'
import {
  Container,
  Title,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  CreateAccountButton,
  CreateAccountLabel,
} from './styles'

import Input from './../../components/Input'
import Button from './../../components/Button'

const SignIn: FunctionComponent = () => {
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
              <Title>Faça seu logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button>Entrar</Button>

            <ForgotPasswordButton>
              <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
            </ForgotPasswordButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountLabel>Criar uma conta</CreateAccountLabel>
      </CreateAccountButton>
    </>
  )
}

export default SignIn
