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
import classes from "./Authentication.module.css";
import { Link } from "react-router-dom";

function Register() {
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
        <TextInput label="Name" placeholder="Your name" radius="md" />
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          mt="md"
        />
        <PasswordInput
          label="Reenter Password"
          placeholder="Reenter your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="I accept terms and conditions" />
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default Register;
