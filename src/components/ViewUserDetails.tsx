import { Grid, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { UserWithoutIdType } from "../types/UserType";
import { useEffect, useState } from "react";
import { useGetUser } from "../hooks/userHooks";

type ViewUserDetailsParams = {
  id: string;
};

type ServerUserDataTypeWithoutId = Omit<UserWithoutIdType, "fullName"> & {
  name: string;
};

function ViewUserDetails({ id }: ViewUserDetailsParams) {
  const [user, setUser] = useState<UserWithoutIdType | null>(null);

  const { isGettingUserData, userData, userDataError } = useGetUser(id);

  useEffect(
    function () {
      const serverUserData: ServerUserDataTypeWithoutId = userData?.data;

      setUser({
        email: serverUserData?.email || "",
        fullName: serverUserData?.name || "",
        phone: serverUserData?.phone || "",
      });
    },
    [isGettingUserData, userData, userDataError]
  );

  if (isGettingUserData) {
    return (
      <Stack>
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
      </Stack>
    );
  }

  if (userDataError !== null) {
    return (
      <Title order={4} c="red">
        Error: Something bad happened at retrieving user data
      </Title>
    );
  }

  return (
    <Paper shadow="xs" p="xl">
      {user && (
        <Stack>
          <Grid>
            <Grid.Col span={6}>
              <Text style={{ fontWeight: "bold" }}>Full Name</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{user.fullName}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Text style={{ fontWeight: "bold" }}>Email</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{user.email}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Text style={{ fontWeight: "bold" }}>Phone Number</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{user.phone}</Text>
            </Grid.Col>
          </Grid>
        </Stack>
      )}
    </Paper>
  );
}

export default ViewUserDetails;
