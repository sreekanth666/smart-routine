import {
  Avatar,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useDisclosure } from "@mantine/hooks";
import { useGetUser } from "../hooks/userHooks";
import { useAuth } from "../context/AuthContext";
import { UserType } from "../types/UserType";
import { ServerUserDataTypeWithoutId } from "../components/ViewUserDetails";
import { resetPassword } from "../services/apiUser";
import { notifications } from "@mantine/notifications";
import IconCheck from "../components/UI/icons/IconCheck";
import IconX from "../components/UI/icons/IconX";

type ProfileDataType = Omit<UserType, "id">;

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const { userName, userId } = useAuth();
  const { isGettingUserData, userData, userDataError } = useGetUser(userId);

  useEffect(() => {
    if (!isGettingUserData && userDataError === null) {
      const serverUserData: ServerUserDataTypeWithoutId = userData?.data;
      setProfileData({
        email: serverUserData.email,
        fullName: serverUserData.name,
        phone: serverUserData.phone,
      });
    }
  }, [isGettingUserData, userData, userDataError]);

  const handlePasswordReset = (oldPassword: string, newPassword: string) => {
    setIsFormSubmitted(true);
    try {
      resetPassword({ oldPassword, newPassword });
      console.log("Password changed");
      notifications.show({
        id: "reset-password-success-notification",
        title: "Congratulations 🎆",
        message: "Your have reset your password successfully",
        icon: <IconCheck size="1rem" stroke={1.5} />,
        position: "bottom-right",
        color: "green",
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        notifications.show({
          id: "reset-password-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          icon: <IconX size="1rem" stroke={1.5} />,
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "reset-password-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          icon: <IconX size="1rem" stroke={1.5} />,
          position: "bottom-right",
        });
      }
    } finally {
      setIsFormSubmitted(false);
      close();
    }
  };

  if (isGettingUserData) {
    return (
      <Card h="85dvh">
        <Group justify="center">
          <Skeleton height={50} circle mb="xl" />
        </Group>
        <Stack h={300} align="flex-start" justify="flex-start" gap="md">
          <Title order={3}>Personal Information</Title>
          <Grid>
            <Grid.Col span={6}>
              <Text c="gray">Full Name:</Text>
              <br />
              <Text c="gray">Email:</Text>
              <br />
              <Text c="gray">Phone:</Text>
              <br />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton height={8} mt={6} radius="xl" />
              <br />
              <Skeleton height={8} mt={6} radius="xl" />
              <br />
              <Skeleton height={8} mt={6} radius="xl" />
            </Grid.Col>
          </Grid>
          <Skeleton height={30} mt={6} radius="xl" />
        </Stack>
      </Card>
    );
  }

  if (userDataError !== null) {
    return (
      <Card h="85dvh">
        <Title order={3} c="red">
          Error: Something bad happened at retrieving user profile data
        </Title>
      </Card>
    );
  }

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
            <ResetPasswordForm
              isFormDisabled={isFormSubmitted}
              onResetPassword={handlePasswordReset}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Card h="85dvh">
        <Group justify="center">
          <Avatar name={userName} color="initials" alt={userName} size="xl" />
        </Group>
        <Stack h={300} align="center" justify="center" gap="md">
          <Title order={3}>Account Information</Title>
          <Grid>
            <Grid.Col span={6}>
              <Text c="gray">Full Name:</Text>
              <br />
              <Text c="gray">Email:</Text>
              <br />
              <Text c="gray">Phone:</Text>
              <br />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{profileData?.fullName}</Text>
              <br />
              <Text>{profileData?.email}</Text>
              <br />
              <Text>{profileData?.phone}</Text>
            </Grid.Col>
          </Grid>
          <Button variant="filled" color="green" onClick={open}>
            Reset Password
          </Button>
        </Stack>
      </Card>
    </>
  );
}

export default ProfilePage;
