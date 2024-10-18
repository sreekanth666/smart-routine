import { Button, Table } from "@mantine/core";
import IconEye from "../components/icons/IconEye";
import IconEdit from "../components/icons/IconEdit";
import IconTrash from "../components/icons/IconTrash";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

const DEMO_USERS: User[] = [
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
  const rows = DEMO_USERS.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.fullName}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone}</Table.Td>
      <Table.Td>
        <Button variant="filled" mx={5}>
          <IconEye size="1rem" stroke={1.5} />
        </Button>
        <Button variant="filled" color="green" mx={5}>
          <IconEdit size="1rem" stroke={1.5} />
        </Button>
        <Button variant="filled" color="red" mx={5}>
          <IconTrash size="1rem" stroke={1.5} />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
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
  );
}

export default Users;
