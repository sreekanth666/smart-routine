import {
  ActionIcon,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { SAMPLE_COMMUNITY_FEED } from "../sample-data/SampleData";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { CommuntityPostType } from "../types/CommunityPostType";
import IconMessagePlus from "../components/UI/icons/IconMessagePlus";
import { useDisclosure } from "@mantine/hooks";
import AddNewPostForm from "../components/AddNewPostForm";

dayjs.extend(relativeTime);

function Community() {
  const [posts, setPosts] = useState<CommuntityPostType[]>(
    SAMPLE_COMMUNITY_FEED
  );
  const [opened, { open, close }] = useDisclosure();

  const handleNewPost = (content: string) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: prevPosts.length + 1,
        userName: "@CurrentUser",
        postContent: content,
        postedDate: new Date(Date.now()),
      },
    ]);
    close();
  };

  const communityPosts = posts
    .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
    .map((post) => (
      <Paper key={post.id} p="md">
        <Title order={4}>{post.userName}</Title>
        <Text>{post.postContent}</Text>
        <Text c="gray">{dayjs(post.postedDate).fromNow()}</Text>
      </Paper>
    ));

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
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
              Add New Daily Routine
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNewPostForm onAddingNewPost={handleNewPost} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Stack>
        <Group justify="space-between">
          <Title>Community Posts</Title>
          <Tooltip label="Add new community post">
            <ActionIcon variant="white" color="green" onClick={open}>
              <IconMessagePlus size="3rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        {communityPosts}
      </Stack>
    </>
  );
}

export default Community;
