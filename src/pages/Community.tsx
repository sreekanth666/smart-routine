import {
  ActionIcon,
  Group,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { CommuntityPostType } from "../types/CommunityPostType";
import IconMessagePlus from "../components/UI/icons/IconMessagePlus";
import { useDisclosure } from "@mantine/hooks";
import AddNewPostForm from "../components/AddNewPostForm";
import {
  useCreateNewCommunityPost,
  useGetAllCommunityPosts,
} from "../hooks/communityHooks";

dayjs.extend(relativeTime);

type ServerCommunityPostType = {
  _id: string;
  post: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

function Community() {
  const [posts, setPosts] = useState<CommuntityPostType[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const {
    isGettingAllCommunityPosts,
    allCommunityPosts,
    allCommunityPostsError,
  } = useGetAllCommunityPosts();

  const {
    isCreateNewPostPending,
    createNewPost,
    createNewPostError,
  } = useCreateNewCommunityPost();

  useEffect(() => {
    if (!isGettingAllCommunityPosts && !allCommunityPostsError) {
      const serverCommunityPosts: ServerCommunityPostType[] =
        allCommunityPosts?.data;
      setPosts(
        serverCommunityPosts.map((post) => ({
          id: post._id,
          postContent: post.post,
          userName: `@${post.userId.name}`,
          postedDate: dayjs(post.createdAt).isSame(dayjs(post.updatedAt))
            ? new Date(post.createdAt)
            : new Date(post.updatedAt),
        }))
      );
    }
  }, [isGettingAllCommunityPosts, allCommunityPostsError, allCommunityPosts]);

  const handleNewPost = (content: string) => {
    setIsFormSubmitted(true);
    createNewPost(content);
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsFormSubmitted(false);
    close();
  };

  if (isGettingAllCommunityPosts) {
    return (
      <Stack>
        <Title>Community Posts</Title>
        {Array.from({ length: 5 }).map((_, index) => (
          <Paper p="md" key={index}>
            <Skeleton height={12} width="30%" mb="md" radius="xl" />
            <Skeleton height={8} radius="xl" mb="sm" />
            <Skeleton height={8} radius="xl" />
          </Paper>
        ))}
      </Stack>
    );
  }

  if (allCommunityPostsError) {
    return (
      <Stack>
        <Title>Community Posts</Title>
        <Paper p="md">
          <Title order={4} c="red">
            Error: Something bad happened while retrieving community posts.
          </Title>
        </Paper>
      </Stack>
    );
  }

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
      <Modal.Root opened={opened} onClose={handleModalClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title style={{ color: "blue", fontWeight: 600, fontSize: "xx-large" }}>
              Add New Community Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isFormSubmitted && createNewPostError ? (
              <Title order={4} c="red">
                Error: Something went wrong while creating the community post.
              </Title>
            ) : (
              <AddNewPostForm
                onAddingNewPost={handleNewPost}
                isFormSubmitting={isCreateNewPostPending}
              />
            )}
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
        {posts.length > 0 ? communityPosts : (
          <Paper p="md">
            <Title order={4}>No community posts available.</Title>
          </Paper>
        )}
      </Stack>
    </>
  );
}

export default Community;
