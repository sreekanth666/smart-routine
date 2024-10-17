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
import { Link } from "react-router-dom";
import classes from "./Authentication.module.css";
import { checkPassword } from "../utils/helpers";

const REGISTER_FORM_INIT_VALUES = {
  fullName: "",
  email: "",
  password: "",
  reenterPassword: "",
  terms: false,
};

function Register() {
  const form = useForm({
    initialValues: REGISTER_FORM_INIT_VALUES,
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      password: (val) => checkPassword(val),
      reenterPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
      terms: (val) => (val ? null : "You must agree terms & conditions"),
    },
  });

  const registerFormSubmitHandler = () => {
    if (Object.keys(form.errors).length == 0) {
      console.log("Registered");
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
        Welcome
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button">
          <Link to="/login">Login</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            registerFormSubmitHandler();
          })}
        >
          <TextInput
            label="Name"
            placeholder="Your full name"
            value={form.values.fullName}
            onChange={(event) =>
              form.setFieldValue("fullName", event.currentTarget.value)
            }
            required
          />
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
            placeholder="Enter your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            required
            mt="md"
          />
          <PasswordInput
            label="Reenter Password"
            placeholder="Enter your password again"
            value={form.values.reenterPassword}
            onChange={(event) =>
              form.setFieldValue("reenterPassword", event.currentTarget.value)
            }
            error={form.errors.reenterPassword}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
              error={form.errors.terms}
            />
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
