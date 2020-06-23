import React, { FunctionComponent, useRef, useCallback } from 'react'
import {
  Image,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
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
  const formRef = useRef<FormHandles>(null)
  const inputEmailRef = useRef<TextInput>(null)
  const inputPasswordRef = useRef<TextInput>(null)

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
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleFormOnSubmit}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => inputEmailRef.current?.focus()}
              />

              <Input
                ref={inputEmailRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />

              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={handleButtonOnPress}
              />

              <Button onPress={handleButtonOnPress}>Entrar</Button>
            </Form>
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
