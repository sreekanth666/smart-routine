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

function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
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
        <form onSubmit={() => {}}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
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
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
