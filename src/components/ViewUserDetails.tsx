import { TextInput } from "@mantine/core";
import { UserWithoutIdType } from "../types/UserType";

type ViewUserDetailsParams = {
  user: UserWithoutIdType;
};

function ViewUserDetails({ user }: ViewUserDetailsParams) {
  return (
    <>
      <TextInput
        label="Full Name"
        placeholder="Your full name"
        value={user.fullName}
        disabled
      />
      <TextInput
        label="Email"
        placeholder="Your email address"
        value={user.email}
        disabled
      />
      <TextInput
        label="Phone Number"
        placeholder="Your phone number"
        value={user.phone}
        disabled
      />
    </>
  );
}

export default ViewUserDetails;
