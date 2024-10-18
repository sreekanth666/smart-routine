import { Button, Modal, Table } from "@mantine/core";
import IconEye from "../components/icons/IconEye";
import IconEdit from "../components/icons/IconEdit";
import IconTrash from "../components/icons/IconTrash";
import { ReactElement, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ViewUserDetails from "../components/ViewUserDetails";
import EditUserDetails from "../components/EditUserDetails";
import { UserType } from "../types/UserType";
import { UserWithoutIdType } from "../types/UserWithoutIdType";
import DeleteUserDetails from "../components/DeleteUserDetails";

const DEMO_USERS: UserType[] = [
  {
    id: "olewiugka",
    fullName: "User1 Name",
    email: "user1@example.com",
    phone: "+91-9324970031",
  },
  {
    id: "6dkyr0003",
    fullName: "User2 Name",
    email: "user2@example.com",
    phone: "+91-9910167406",
  },
  {
    id: "39ihqkt3g",
    fullName: "User3 Name",
    email: "user3@example.com",
    phone: "+91-9185913898",
  },
  {
    id: "dixaf5dhs",
    fullName: "User4 Name",
    email: "user4@example.com",
    phone: "+91-9275426749",
  },
  {
    id: "ozghhbmh9",
    fullName: "User5 Name",
    email: "user5@example.com",
    phone: "+91-9107796421",
  },
  {
    id: "6pn5x660o",
    fullName: "User6 Name",
    email: "user6@example.com",
    phone: "+91-9949577305",
  },
  {
    id: "g0rlm0m1e",
    fullName: "User7 Name",
    email: "user7@example.com",
    phone: "+91-9546803478",
  },
  {
    id: "vrfbzzt89",
    fullName: "User8 Name",
    email: "user8@example.com",
    phone: "+91-9714026553",
  },
  {
    id: "7vmwaa4s8",
    fullName: "User9 Name",
    email: "user9@example.com",
    phone: "+91-9337507706",
  },
  {
    id: "sh8iy2tp2",
    fullName: "User10 Name",
    email: "user10@example.com",
    phone: "+91-9778282446",
  },
];

function Users() {
  const [users, setUsers] = useState(DEMO_USERS);
  const [modalContent, setModalContent] = useState<ReactElement | null>();
  const [opened, { open, close }] = useDisclosure();

  const openModal = () => {
    open();
  };

  const closeModal = () => {
    setModalContent(null);
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
    openModal();
  };

  const handleEditButtonClick = (id: string) => {
    const selectedUser: UserType[] = users.filter((user) => user.id === id);

    setModalContent(
      <EditUserDetails user={selectedUser[0]} editUser={editUser} />
    );
    openModal();
  };

  const editUser = (id: string, updatedUser: UserWithoutIdType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { id, ...updatedUser } : user))
    );
    closeModal();
  };

  const handleDeleteButtonClick = (id: string) => {
    setModalContent(
      <DeleteUserDetails
        userId={id}
        onCloseModal={close}
        deleteUser={deleteUser}
      />
    );
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
          onClick={() => handleDeleteButtonClick(user.id)}
        >
          <IconTrash size="1rem" stroke={1.5} />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={closeModal} title="User Details">
        {modalContent}
      </Modal>

      <Table>
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
