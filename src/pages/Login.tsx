import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Authentication.module.css";
import { Link, useNavigate } from "react-router-dom";
import { checkPassword } from "../utils/helpers";
import { AccountType } from "../enums/AccountType";
import { SAMPLE_JWT_TOKEN } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

type LoginDataType = {
  email: string;
  password: string;
  accountType: AccountType;
};

function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      password: (val) => checkPassword(val),
    },
  });
  const { login } = useAuth();

  const navigate = useNavigate();
  // const

  const loginFormSubmitHandler = () => {
    if (Object.keys(form.errors).length == 0) {
      console.log("Logged in");
      const loginData: LoginDataType = {
        email: form.values.email,
        password: form.values.password,
        accountType: AccountType.ADMIN,
      };
      // console.log(loginData);
      login(SAMPLE_JWT_TOKEN, loginData.accountType === AccountType.ADMIN);

      if (loginData.accountType === AccountType.ADMIN) {
        console.log("Logged in as admin");
        navigate("/app");
      } else {
        console.log("Go to client page");
        // navigate("/")
      }
      form.reset();
    } else {
      console.log("error");
      console.log(form.errors);
    }
  };

  return (
    <Container size={420} my={30}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            loginFormSubmitHandler();
          })}
        >
          <TextInput
            label="Email"
            placeholder="Your email address"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
          <Group justify="center" mt="lg">
            <Text c="dimmed" size="xs" ta="center" mt={5}>
              Do not have an account yet?{" "}
              <Anchor size="xs" component="button">
                <Link to="/register">Create account</Link>
              </Anchor>
            </Text>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
