import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import IconEye from "../components/icons/IconEye";
import IconEyeOff from "../components/icons/IconEyeOff";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useDisclosure } from "@mantine/hooks";

dayjs.extend(customParseFormat);

function ProfilePage() {
  const [password, setPassword] = useState("Pass@123");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const birthDate = dayjs("01-01-1987").format("MMMM DD, YYYY");

  const handlePasswordDisplay = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handlePasswordReset = (newPassword: string) => {
    setPassword(newPassword);
    close();
  };

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title
              style={{
                color: "blue",
                fontWeight: 600,
                fontSize: "xx-large",
                textAlign: "center",
              }}
            >
              Reset Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ResetPasswordForm onResetPassword={handlePasswordReset} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Card h="85dvh">
        <Group justify="center">
          <Avatar name="John Doe" color="initials" alt="John Doe" size="xl" />
        </Group>
        <Group justify="space-around">
          <Stack h={300} align="flex-start" justify="flex-start" gap="md">
            <Title order={3}>Personal Information</Title>
            <Grid>
              <Grid.Col span={5}>
                <Text c="gray">Full Name:</Text>
                <br />
                <Text c="gray">Date of Birth:</Text>
                <br />
                <Text c="gray">Sex:</Text>
                <br />
                <Text c="gray">Native Place:</Text>
                <br />
                <Text c="gray">Zip Code:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>John Doe</Text>
                <br />
                <Text>{birthDate}</Text>
                <br />
                <Text>Male</Text>
                <br />
                <Text>Las Vegas, Nevada</Text>
                <br />
                <Text>89044</Text>
              </Grid.Col>
            </Grid>
          </Stack>
          <Stack h={300} align="flex-start" justify="flex-start" gap="md">
            <Title order={3}>Account Information</Title>
            <Grid>
              <Grid.Col span={5}>
                <Text c="gray">Email:</Text>
                <br />
                <Text c="gray">Phone Number:</Text>
                <br />
                <Text c="gray">Password:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>johndoe@email.com</Text>
                <br />
                <Text>(555) 555-1234</Text>
                <br />
                <br />
                <Group justify="space-between">
                  <Text>
                    {showPassword ? password : "*".repeat(password.length)}
                  </Text>
                  <ActionIcon color="green" onClick={handlePasswordDisplay}>
                    {showPassword ? (
                      <IconEyeOff size="1rem" stroke={1.5} />
                    ) : (
                      <IconEye size="1rem" stroke={1.5} />
                    )}
                  </ActionIcon>
                  <br />
                  <Button variant="outline" color="green" onClick={open}>
                    Reset Password
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Group>
      </Card>
    </>
  );
}

export default ProfilePage;
