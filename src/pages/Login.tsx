import {
  TextInput,
  PasswordInput,
  Checkbox,
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
import { Link } from "react-router-dom";
import { checkPassword } from "../utils/helpers";

function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      password: (val) => checkPassword(val),
    },
  });

  const loginFormSubmitHandler = () => {
    if (Object.keys(form.errors).length == 0) {
      console.log("Logged in");
      console.log(form.values);
      form.reset();
    } else {
      console.log("error");
      console.log(form.errors);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          <Link to="/register">Create account</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            loginFormSubmitHandler();
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
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
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              checked={form.values.remember}
              onChange={(event) =>
                form.setFieldValue("remember", event.currentTarget.checked)
              }
            />
            {/* <Anchor component="button" size="sm">
              Forgot password?
            </Anchor> */}
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
