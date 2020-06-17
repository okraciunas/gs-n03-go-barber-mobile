import React, { FunctionComponent } from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { Container, Label } from './styles'

interface ButtonProps extends RectButtonProperties {
  children: string
}

const Button: FunctionComponent<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <Label>{children}</Label>
  </Container>
)

export default Button
