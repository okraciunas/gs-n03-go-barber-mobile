import React, { FunctionComponent, useCallback, useRef } from 'react'
import {
  Image,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
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
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)

  const handleFormOnSubmit = useCallback((data: object) => {
    console.log(data)
  }, [])

  const handleButtonOnPress = useCallback(() => {
    formRef.current?.submitForm()
  }, [formRef.current])

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

            <Form
              ref={formRef}
              onSubmit={handleFormOnSubmit}
              style={{ width: '100%' }}
            >
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={handleButtonOnPress}>Entrar</Button>
            </Form>

            <ForgotPasswordButton>
              <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
            </ForgotPasswordButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountLabel>Criar uma conta</CreateAccountLabel>
      </CreateAccountButton>
    </>
  )
}

export default SignIn
