import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Campo obrigatório.",
  },
  string: {
    min: "Campo deve possuir no mínimo ${min} caracteres.",
  },
});

export const LoginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const RegisterSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().min(8).required(),
});

export const PasswordRecoverySchema = yup.object({
  email: yup.string().required(),
});

export const PasswordChangeSchema = yup.object({
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
});
