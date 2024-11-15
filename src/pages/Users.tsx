import { ReactElement, useState } from "react";
import { Button, Modal, Table } from "@mantine/core";

// import classes from "./Users.module.css";

import { useDisclosure } from "@mantine/hooks";
import IconEye from "../components/icons/IconEye";
import IconEdit from "../components/icons/IconEdit";
import IconTrash from "../components/icons/IconTrash";
import ViewUserDetails from "../components/ViewUserDetails";
import EditUserDetails from "../components/EditUserDetails";
import { UserType } from "../types/UserType";
import { UserWithoutIdType } from "../types/UserType";
import DeleteUserDetails from "../components/DeleteUserDetails";

const DEMO_USERS: UserType[] = [
  {
    id: "olewiugka",
    fullName: "User1",
    email: "user1@example.com",
    phone: "+91-9324970031",
  },
  {
    id: "6dkyr0003",
    fullName: "User2",
    email: "user2@example.com",
    phone: "+91-9910167406",
  },
  {
    id: "39ihqkt3g",
    fullName: "User3",
    email: "user3@example.com",
    phone: "+91-9185913898",
  },
  {
    id: "dixaf5dhs",
    fullName: "User4",
    email: "user4@example.com",
    phone: "+91-9275426749",
  },
  {
    id: "ozghhbmh9",
    fullName: "User5",
    email: "user5@example.com",
    phone: "+91-9107796421",
  },
  {
    id: "6pn5x660o",
    fullName: "User6",
    email: "user6@example.com",
    phone: "+91-9949577305",
  },
  {
    id: "g0rlm0m1e",
    fullName: "User7",
    email: "user7@example.com",
    phone: "+91-9546803478",
  },
  {
    id: "vrfbzzt89",
    fullName: "User8",
    email: "user8@example.com",
    phone: "+91-9714026553",
  },
  {
    id: "7vmwaa4s8",
    fullName: "User9",
    email: "user9@example.com",
    phone: "+91-9337507706",
  },
  {
    id: "sh8iy2tp2",
    fullName: "User10",
    email: "user10@example.com",
    phone: "+91-9778282446",
  },
];

function Users() {
  const [users, setUsers] = useState(DEMO_USERS);
  const [modalContent, setModalContent] = useState<ReactElement | null>();
  const [modalTitle, setModalTitle] = useState<string | null>();
  const [opened, { open, close }] = useDisclosure();

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
    const user: UserWithoutIdType = {
      fullName: selectedUser[0].fullName,
      email: selectedUser[0].email,
      phone: selectedUser[0].phone,
    };

    setModalContent(<ViewUserDetails user={user} />);
    setModalTitle(`View ${user.fullName} details`);
    openModal();
  };

  const handleEditButtonClick = (id: string) => {
    const selectedUser: UserType[] = users.filter((user) => user.id === id);

    setModalContent(
      <EditUserDetails user={selectedUser[0]} editUser={editUser} />
    );
    setModalTitle(`Edit ${selectedUser[0].fullName} details`);
    openModal();
  };

  const editUser = (id: string, updatedUser: UserWithoutIdType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { id, ...updatedUser } : user))
    );
    closeModal();
  };

  const handleDeleteButtonClick = (id: string, fullName: string) => {
    setModalContent(
      <DeleteUserDetails
        user={{ id, fullName }}
        onCloseModal={close}
        deleteUser={deleteUser}
      />
    );
    setModalTitle(`Delete ${fullName} details`);
    openModal();
  };

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    closeModal();
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
