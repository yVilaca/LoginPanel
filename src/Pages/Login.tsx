import {
  Button,
  Card,
  Center,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { redirect } from "react-router-dom";

export default function Login() {
  const [register, setRegister] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", senha: "", senha2: "" },
    validateInputOnBlur: true,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "E-mail inválido"),

      senha: (value) =>
        register
          ? value.length < 8
            ? "A senha deve conter no mínimo 8 caracteres"
            : null
          : value.length < 1
          ? "Digite a senha"
          : null,
      senha2: (value, values) =>
        register
          ? value
            ? value != values.senha
              ? "As senhas não coincidêm"
              : null
            : "Confirme a senha"
          : null,
    },
    transformValues: (values) => ({
      email: values.email,
      username: values.email,
      password: values.senha,
    }),
  });
  function login() {
    axios
      .post(
        register
          ? "http://127.0.0.1:8000/api/users/register/"
          : "http://127.0.0.1:8000/api/users/token/",
        form.getTransformedValues()
      )
      .then((e) => {
        notifications.show({
          title: "Login Efetuado com sucesso!",
          message: "Você se autenticou corretamente.",
          position: "top-right",
        });
        sessionStorage.setItem("JWT", e.data.access);
        sessionStorage.setItem("JWT_REFRESH", e.data.refresh);
        redirect("/home");
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Credenciais inválidas!",
          message: register
            ? `${error.response.data.error}`
            : "Verifique os dados e tente novamente.",
          position: "top-right",
          color: "red",
        });
      });
  }

  return (
    <Center h={"100vh"}>
      <Card shadow="md" withBorder>
        <form onSubmit={form.onSubmit(() => login())}>
          <TextInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            key={form.key("senha")}
            {...form.getInputProps("senha")}
          />
          {register && (
            <PasswordInput
              label="Confirme a senha"
              placeholder="Confirme sua senha"
              key={form.key("senha2")}
              {...form.getInputProps("senha2")}
            />
          )}
          <Group justify="center" mt={"md"}>
            <Button
              type="submit"
              w={"100%"}
              rightSection={<IconArrowRight size={18} />}
            >
              {register ? "Registrar" : "Fazer Log In"}
            </Button>
            <Text c={"dark"} size={"sm"}>
              {register ? "Já possui conta? " : "Não possui uma conta? "}
              <Button
                variant="transparent"
                p={0}
                onClick={() => {
                  setRegister(!register);
                }}
              >
                {register ? "Faça login" : "Cadastre-se"}
              </Button>
            </Text>
          </Group>
        </form>
      </Card>
    </Center>
  );
}
