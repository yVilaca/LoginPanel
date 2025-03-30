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
  });

  return (
    <Center h={"100vh"}>
      <Card shadow="md" withBorder>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
