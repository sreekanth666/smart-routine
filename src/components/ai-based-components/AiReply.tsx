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
  console.log(aiMessage);
  return (
    <>
      <div className="flex flex-row-reverse items-start">
        <AiChatAvatar imageUrl={imageUrl} isUser={false} />

        <div className="flex min-h-[85px] overflow-x-auto rounded-b-xl rounded-tl-xl bg-slate-50 p-4 sm:min-h-0 sm:max-w-md md:max-w-2xl">
          <Markdown
            children={aiMessage}
            rehypePlugins={[
              [rehypeRaw, { singleTilde: false }],
              [rehypeSanitize],
            ]}
          ></Markdown>
        </div>
        <AiReplyActions />
      </div>
    </>
  );
}

export default AiReply;
