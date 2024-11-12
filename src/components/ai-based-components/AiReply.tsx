import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import AiChatAvatar from "./AiChatAvatar";
import AiReplyActions from "./AiReplyActions";

type AiReplyParams = {
  imageUrl: string;
  aiMessage: string;
};

function AiReply({ imageUrl, aiMessage }: AiReplyParams) {
  return (
    <>
      <AiReplyActions />
      <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 sm:px-4">
        <AiChatAvatar imageUrl={imageUrl} />

        <div className="flex max-w-3xl items-center rounded-xl">
          <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
            {aiMessage}
          </Markdown>
        </div>
      </div>
    </>
  );
}

export default AiReply;
