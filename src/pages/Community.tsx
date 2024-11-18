import { Paper, Stack, Text, Title } from "@mantine/core";
import { SAMPLE_COMMUNITY_FEED } from "../sample-data/SampleData";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Community() {
  const communityPosts = SAMPLE_COMMUNITY_FEED.map((post) => (
    <Paper key={post.id} p="md">
      <Title order={4}>{post.userName}</Title>
      <Text>{post.postContent}</Text>
      <Text c="gray">{dayjs(post.postedDate).fromNow()}</Text>
    </Paper>
  ));
  return <Stack>{communityPosts}</Stack>;
}

export default Community;
