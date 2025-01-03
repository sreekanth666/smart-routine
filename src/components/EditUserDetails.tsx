import { Button, Skeleton, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserWithoutIdType } from "../types/UserType";
import { useGetUser, useUpdateUser } from "../hooks/userHooks";
import { useEffect } from "react";
import { ServerUserDataTypeWithoutId } from "./ViewUserDetails";

type EditUserDetailsParams = {
  id: string;
  closeModal: () => void;
};

function EditUserDetails({ id, closeModal }: EditUserDetailsParams) {
  const { isGettingUserData, userData, userDataError } = useGetUser(id);
  const { updateUserDetails } = useUpdateUser();
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+\.\S{2,}$/.test(val) ? null : "Invalid email"),
      phone: (val) =>
        /^(0)?(0)?(\+91|91|0)?[- ]?(\d{3}[- ]?\d{3}[- ]?\d{4}|\d{5}[- ]?\d{5})$/.test(
          val
        )
          ? null
          : "Invalid mobile number",
    },
  });

  useEffect(() => {
    if (!isGettingUserData && userDataError === null && userData) {
      const serverUserData: ServerUserDataTypeWithoutId = userData.data;

      // Update form values only if they differ from the current values
      form.setValues((currentValues) => ({
        fullName:
          currentValues.fullName === ""
            ? serverUserData.name
            : currentValues.fullName,
        email:
          currentValues.email === ""
            ? serverUserData.email
            : currentValues.email,
        phone:
          currentValues.phone === ""
            ? serverUserData.phone
            : currentValues.phone,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGettingUserData, userDataError, userData]);

  if (isGettingUserData) {
    return (
      <Stack>
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={12} radius="xl" />
      </Stack>
    );
  }

  if (userDataError !== null) {
    return (
      <Title order={4} c="red" ta="center">
        There was some error while retreiving the user details.
      </Title>
    );
  }

  const editFormHandler = () => {
    const updatedUser: UserWithoutIdType = {
      fullName: form.values.fullName,
      email: form.values.email,
      phone: form.values.phone,
    };

    updateUserDetails({ id, ...updatedUser });
    closeModal();
  };

  return (
    <form onSubmit={form.onSubmit(() => editFormHandler())}>
      <TextInput
        label="Full Name"
        placeholder="Your full name"
        value={form.values.fullName}
        onChange={(event) =>
          form.setFieldValue("fullName", event.currentTarget.value)
        }
        required
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
      />
      <Button type="submit" fullWidth mt="xl">
        Update
      </Button>
    </form>
  );
}

export default EditUserDetails;
