import { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Table,
  Title,
} from "@mantine/core";

// import classes from "./Users.module.css";

import { useDisclosure } from "@mantine/hooks";
import IconEye from "../components/UI/icons/IconEye";
import IconEdit from "../components/UI/icons/IconEdit";
import IconTrash from "../components/UI/icons/IconTrash";
import ViewUserDetails from "../components/ViewUserDetails";
import EditUserDetails from "../components/EditUserDetails";
import { UserType } from "../types/UserType";
import DeleteUserDetails from "../components/DeleteUserDetails";
import { useGetUsers } from "../hooks/userHooks";

type ServerUserDataType = Omit<UserType, "id" | "fullName"> & {
  _id: string;
  name: string;
  isAdmin: boolean;
};

type UsersDataType = UserType & {
  isAdmin: boolean;
};

function Users() {
  const [users, setUsers] = useState<UsersDataType[]>([]);
  const [modalContent, setModalContent] = useState<ReactElement | null>();
  const [modalTitle, setModalTitle] = useState<string | null>();
  const [opened, { open, close }] = useDisclosure();
  const { isGettingUsers, usersData, usersDataError } = useGetUsers();

  useEffect(
    function () {
      if (!isGettingUsers && usersDataError === null) {
        console.log(usersData?.data);
        const serverUserData: ServerUserDataType[] = usersData?.data;

        setUsers(
          serverUserData.map((user) => {
            return {
              id: user._id,
              fullName: user.name,
              email: user.email,
              phone: user.phone,
              isAdmin: user.isAdmin,
            };
          })
        );
      }
    },
    [isGettingUsers, usersData, usersDataError]
  );

  if (isGettingUsers) {
    const tempSkelton = (
      <Table.Tr>
        <Table.Td>
          <Skeleton height={8} mt={6} radius="xl" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={8} mt={6} radius="xl" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={8} mt={6} radius="xl" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={8} mt={6} radius="xl" />
        </Table.Td>
      </Table.Tr>
    );
    return (
      <Table bg="white">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Full Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tempSkelton}
          {tempSkelton}
          {tempSkelton}
        </Table.Tbody>
      </Table>
    );
  }

  if (usersDataError !== null) {
    return (
      <Stack>
        <Title>Users List</Title>
        <Paper p="md">
          <Title order={4} c="red">
            Error: Something bad happened at retrieving users data
          </Title>
        </Paper>
      </Stack>
    );
  }

  const openModal = () => {
    open();
  };

  const closeModal = () => {
    setModalContent(null);
    setModalTitle(null);
    close();
  };

  const handleViewButtonClick = (id: string) => {
    const selectedUser: UserType[] = users.filter((user) => user.id === id);

    setModalContent(<ViewUserDetails id={id} />);
    setModalTitle(`View ${selectedUser[0].fullName} details`);
    openModal();
  };

  const handleEditButtonClick = (id: string) => {
    const selectedUser: UserType[] = users.filter((user) => user.id === id);

    setModalContent(<EditUserDetails id={id} closeModal={close} />);
    setModalTitle(`Edit ${selectedUser[0].fullName} details`);
    openModal();
  };

  const handleDeleteButtonClick = (id: string, fullName: string) => {
    setModalContent(<DeleteUserDetails id={id} onCloseModal={close} />);
    setModalTitle(`Delete ${fullName} details`);
    openModal();
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.fullName}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone}</Table.Td>
      <Table.Td>
        <Button
          variant="filled"
          mx={5}
          onClick={() => handleViewButtonClick(user.id)}
        >
          <IconEye size="1rem" stroke={1.5} />
        </Button>
        {!user.isAdmin && (
          <>
            <Button
              variant="filled"
              color="green"
              mx={5}
              onClick={() => handleEditButtonClick(user.id)}
            >
              <IconEdit size="1rem" stroke={1.5} />
            </Button>
            <Button
              variant="filled"
              color="red"
              mx={5}
              onClick={() => handleDeleteButtonClick(user.id, user.fullName)}
            >
              <IconTrash size="1rem" stroke={1.5} />
            </Button>
          </>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal.Root opened={opened} onClose={closeModal}>
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
              {modalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Table bg="white">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Full Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export default Users;
