import React, { FunctionComponent, useCallback, useRef } from 'react'
import {
  Image,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as validation from 'yup'
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

import { useAuth } from './../../hooks/auth'
import getValidationErrors from './../../utils/get-validation-errors'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: FunctionComponent = () => {
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const inputPasswordRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = validation.object().shape({
          email: validation
            .string()
            .email('Digite um e-mail válido')
            .required('E-mail é um campo obrigatório'),
          password: validation
            .string()
            .required('Senha é um campo obrigatório'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn(data.email, data.password)
      } catch (error) {
        if (error instanceof validation.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        )

        // addToast({
        //   type: ToastTypes.error,
        //   title: 'Erro na autenticação',
        //   message: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        // })
      }
    },
    [signIn],
  )

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
              onSubmit={handleSignIn}
              style={{ width: '100%' }}
            >
              <Input
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
                returnKeyType="send"
                onSubmitEditing={handleButtonOnPress}
              />

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
