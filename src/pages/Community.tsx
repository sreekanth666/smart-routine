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
  userId: string;
  createdAt: string;
  updatedAt: string;
};

function Community() {
  const [posts, setPosts] = useState<CommuntityPostType[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const {
    isGettingAllCommunityPosts,
    allCommunityPosts,
    allCommunityPostsError,
  } = useGetAllCommunityPosts();
  const { isCreateNewPostPending, createNewPost, createNewPostError } =
    useCreateNewCommunityPost();

  useEffect(
    function () {
      if (!isGettingAllCommunityPosts && allCommunityPostsError === null) {
        const serverCommunityPosts: ServerCommunityPostType[] =
          allCommunityPosts?.data;
        console.log(serverCommunityPosts);
        setPosts(
          serverCommunityPosts.map((post) => {
            return {
              id: post._id,
              postContent: post.post,
              userName: `@${post.userId}`,
              postedDate: dayjs(post.createdAt).isSame(dayjs(post.updatedAt))
                ? new Date(post.createdAt)
                : new Date(post.updatedAt),
            };
          })
        );
      }
    },
    [isGettingAllCommunityPosts, allCommunityPostsError, allCommunityPosts]
  );

  if (isGettingAllCommunityPosts) {
    return (
      <Stack>
        <Title>Community Posts</Title>
        <Paper p="md">
          <Skeleton height={12} width="30%" mb="md" radius="xl" />
          <Skeleton height={8} radius="xl" mb="sm" />
          <Skeleton height={8} radius="xl" />
        </Paper>
        <Paper p="md">
          <Skeleton height={12} width="30%" mb="md" radius="xl" />
          <Skeleton height={8} radius="xl" mb="sm" />
          <Skeleton height={8} radius="xl" />
        </Paper>
        <Paper p="md">
          <Skeleton height={12} width="30%" mb="md" radius="xl" />
          <Skeleton height={8} radius="xl" mb="sm" />
          <Skeleton height={8} radius="xl" />
        </Paper>
        <Paper p="md">
          <Skeleton height={12} width="30%" mb="md" radius="xl" />
          <Skeleton height={8} radius="xl" mb="sm" />
          <Skeleton height={8} radius="xl" />
        </Paper>
        <Paper p="md">
          <Skeleton height={12} width="30%" mb="md" radius="xl" />
          <Skeleton height={8} radius="xl" mb="sm" />
          <Skeleton height={8} radius="xl" />
        </Paper>
      </Stack>
    );
  }

  if (allCommunityPostsError !== null) {
    return (
      <Stack>
        <Title>Community Posts</Title>
        <Paper p="md">
          <Title order={4} c="red">
            Error: Something bad happened at retrieving community posts
          </Title>
        </Paper>
      </Stack>
    );
  }

  const handleNewPost = (content: string) => {
    setIsFormSubmitted(true);
    createNewPost(content);
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsFormSubmitted(false);
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
      <Modal.Root opened={opened} onClose={handleModalClose}>
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
            {isFormSubmitted && createNewPostError !== null ? (
              <Title order={4} c="red">
                Error: Something bad happened at creating new community post
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
        {communityPosts}
      </Stack>
    </>
  );
}

export default Community;
