import { ValidationError } from 'yup'

interface FormErrors {
  [key: string]: string
}

export default function getValidationErrors(errors: ValidationError) {
  const formErrors: FormErrors = {}

  errors.inner.forEach(({ path, message }) => {
    formErrors[path] = message
  })

  return formErrors
}
