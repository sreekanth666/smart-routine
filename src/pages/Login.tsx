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
import { Link, useNavigate } from "react-router-dom";
import classes from "./Authentication.module.css";
import { checkPassword } from "../utils/helpers";
import { useAuth } from "../context/AuthContext";
import { login as userLogin } from "../services/apiAuth";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import IconCheck from "../components/UI/icons/IconCheck";
import IconX from "../components/UI/icons/IconX";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const form = useForm<LoginForm>({
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
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const loginFormSubmitHandler = async () => {
    if (Object.keys(form.errors).length == 0) {
      console.log("Logging in");
      setIsFormSubmitting(true);

      try {
        const response = await userLogin({
          email: form.values.email,
          password: form.values.password,
        });
        console.log(response.data);

        login(response.data.accessToken, response.data.user);

        if (response.data.user.isAdmin) {
          console.log("Logged in as admin");
          notifications.show({
            id: "admin-user-login-notification",
            title: "Congratulations 🎆",
            message: "Your have been logged in as ADMIN",
            icon: <IconCheck size="1rem" stroke={1.5} />,
            position: "top-right",
          });
          navigate("/app");
        } else {
          console.log("Go to client page");
          notifications.show({
            id: "client-user-login-notification",
            title: "Congratulations 🎆",
            message: "Your have been logged in",
            color: "green",
            icon: <IconCheck size="1rem" stroke={1.5} />,
            position: "top-right",
          });
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          notifications.show({
            id: "user-login-error-notification",
            title: "SORRY 🛑",
            message: `ERROR: ${error.message}`,
            color: "red",
            icon: <IconX size="1rem" stroke={1.5} />,
            position: "top-right",
          });
        } else {
          notifications.show({
            id: "user-login-error-notification",
            title: "SORRY 🛑",
            message: "An unknown error occurred",
            color: "red",
            icon: <IconX size="1rem" stroke={1.5} />,
            position: "top-right",
          });
        }
      } finally {
        form.reset();
        setIsFormSubmitting(false);
      }
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
            disabled={isFormSubmitting}
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
            disabled={isFormSubmitting}
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            {isFormSubmitting ? "Loading..." : "Sign in"}
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
