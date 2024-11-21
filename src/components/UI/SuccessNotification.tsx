import { Notification } from "@mantine/core";
import IconCheck from "../icons/IconCheck";

function SuccessNotification() {
  const checkIcon = <IconCheck size="1rem" stroke={1.5} />;

  return (
    <Notification icon={checkIcon} color="teal" title="All good!" mt="md">
      Password has been reset.
    </Notification>
  );
}

export default SuccessNotification;
