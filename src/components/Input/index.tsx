import React, { FunctionComponent, useRef, useCallback, useEffect } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import { Container, Icon, TextInput } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface InputValueReference {
  value: string
}

const Input: FunctionComponent<InputProps> = ({ name, icon, ...rest }) => {
  const { registerField, fieldName, defaultValue = '', error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })
  const inputElementRef = useRef<any>(null)

  const handleTextInputOnChangeText = useCallback(
    value => {
      inputValueRef.current.value = value
    },
    [inputValueRef.current],
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [registerField, fieldName])

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={handleTextInputOnChangeText}
        {...rest}
      />
    </Container>
  )
}

export default Input
