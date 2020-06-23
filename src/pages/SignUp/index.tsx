import React, { FunctionComponent, useRef, useCallback } from 'react'
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
  BackToSignInButton,
  BackToSignInLabel,
} from './styles'

import Input from './../../components/Input'
import Button from './../../components/Button'

import getValidationErrors from './../../utils/get-validation-errors'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignIn: FunctionComponent = () => {
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const inputEmailRef = useRef<TextInput>(null)
  const inputPasswordRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = validation.object().shape({
        name: validation.string().required('Nome é um campo obrigatório.'),
        email: validation
          .string()
          .email('Digite um e-mail válido')
          .required('E-mail é um campo obrigatório'),
        password: validation
          .string()
          .min(6, 'Mínimo de 6 caracteres para a senha.'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      // await createUser(data.name, data.email, data.password)

      // addToast({
      //   type: ToastTypes.success,
      //   title: 'Cadastro realizado',
      //   message: 'Você já pode realizar seu login',
      // })

      // history.push('/')
    } catch (error) {
      if (error instanceof validation.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)

        return
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente.',
      )
    }
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
              onSubmit={handleSignUp}
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
                textContentType={'newPassword'}
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
