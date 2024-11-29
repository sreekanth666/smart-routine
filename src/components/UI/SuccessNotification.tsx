import { Notification } from "@mantine/core";
import IconCheck from "./icons/IconCheck";

type SuccessNotificationProps = {
  title: string;
  message: string;
};

function SuccessNotification({ title, message }: SuccessNotificationProps) {
  const checkIcon = <IconCheck size="1rem" stroke={1.5} />;

  return (
    <Notification icon={checkIcon} color="teal" title={title} mt="md">
      {message}
    </Notification>
  );
}

export default SuccessNotification;
