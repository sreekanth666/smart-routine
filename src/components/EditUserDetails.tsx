import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserType } from "../types/UserType";
import { UserWithoutIdType } from "../types/UserWithoutIdType";

type EditUserDetailsParams = {
  user: UserType;
  editUser: (id: string, newUser: UserWithoutIdType) => void;
};

function EditUserDetails({ user, editUser }: EditUserDetailsParams) {
  const form = useForm({
    initialValues: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
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

  const editFormHandler = () => {
    const updatedUser: UserWithoutIdType = {
      fullName: form.values.fullName,
      email: form.values.email,
      phone: form.values.phone,
    };

    editUser(user.id, updatedUser);
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
