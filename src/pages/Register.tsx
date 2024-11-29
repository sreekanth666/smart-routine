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
import { register } from "../services/apiAuth";
import { useState } from "react";

type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  reenterPassword: string;
};

const REGISTER_FORM_INIT_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  reenterPassword: "",
};

function Register() {
  const form = useForm<RegisterForm>({
    initialValues: REGISTER_FORM_INIT_VALUES,
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      phone: (val) =>
        /^(\+91|91|0)?[-\s]?[6-9]\d{2}[-\s]?\d{3}[-\s]?\d{4}$/.test(val)
          ? null
          : "Invalid mobile number",
      password: (val) => checkPassword(val),
      reenterPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
    },
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerFormSubmitHandler = async () => {
    if (Object.keys(form.errors).length == 0) {
      console.log("Registering");
      setIsFormSubmitting(true);
      try {
        const response = await register({
          fullName: form.values.fullName,
          email: form.values.email,
          phone: form.values.phone,
          password: form.values.password,
        });
        console.log(response);
        form.reset();
        navigate("/login");
      } catch (error) {
        console.log(error);
      } finally {
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
        Welcome
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            registerFormSubmitHandler();
          })}
        >
          <TextInput
            label="Full Name"
            placeholder="Your full name"
            value={form.values.fullName}
            onChange={(event) =>
              form.setFieldValue("fullName", event.currentTarget.value)
            }
            required
            disabled={isFormSubmitting}
          />
          <TextInput
            label="Email"
            placeholder="Your email address"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            required
            disabled={isFormSubmitting}
          />
          <TextInput
            label="Phone Number"
            placeholder="Your phone number"
            value={form.values.phone}
            onChange={(event) =>
              form.setFieldValue("phone", event.currentTarget.value)
            }
            error={form.errors.phone}
            required
            disabled={isFormSubmitting}
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
            disabled={isFormSubmitting}
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
            disabled={isFormSubmitting}
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            {isFormSubmitting ? "Loading..." : "Sign in"}
          </Button>
          <Group justify="center" mt="lg">
            <Text c="dimmed" size="xs" ta="center" mt={5}>
              Already have an account?{" "}
              <Anchor size="xs" component="button">
                <Link to="/login">Login</Link>
              </Anchor>
            </Text>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
