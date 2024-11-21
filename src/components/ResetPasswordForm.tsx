import { Button, Paper, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { checkPassword } from "../utils/helpers";

type ResetPassword = {
  oldPassword: string;
  newPassword: string;
  retypeNewPassword: string;
};

type ResetPasswordFormParams = {
  onResetPassword: (newPassword: string) => void;
};

function ResetPasswordForm({ onResetPassword }: ResetPasswordFormParams) {
  const form = useForm<ResetPassword>({
    initialValues: { oldPassword: "", newPassword: "", retypeNewPassword: "" },
    validate: {
      newPassword: (value, values) =>
        value === values.oldPassword
          ? "Old and new passwords must not be same"
          : checkPassword(value),
      retypeNewPassword: (value, values) =>
        value !== values.newPassword ? "Passwords do not match" : null,
    },
  });

  const resetPasswordHandler = () => {
    onResetPassword(form.values.newPassword);
    form.reset();
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        onSubmit={form.onSubmit(() => {
          resetPasswordHandler();
        })}
      >
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          value={form.values.oldPassword}
          onChange={(event) =>
            form.setFieldValue("oldPassword", event.currentTarget.value)
          }
          required
          mt="md"
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter New password"
          value={form.values.newPassword}
          onChange={(event) =>
            form.setFieldValue("newPassword", event.currentTarget.value)
          }
          error={form.errors.newPassword}
          required
          mt="md"
        />
        <PasswordInput
          label="Retype New Password"
          placeholder="Enter new password again"
          value={form.values.retypeNewPassword}
          onChange={(event) =>
            form.setFieldValue("retypeNewPassword", event.currentTarget.value)
          }
          error={form.errors.retypeNewPassword}
          required
          mt="md"
        />

        <Button type="submit" color="green" fullWidth mt="xl">
          Reset Password
        </Button>
      </form>
    </Paper>
  );
}

export default ResetPasswordForm;
