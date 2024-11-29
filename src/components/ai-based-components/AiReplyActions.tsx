import IconCopy from "../UI/icons/ai-based-icons/IconCopy";
import IconLike from "../UI/icons/ai-based-icons/IconLike";
import IconUnlike from "../UI/icons/ai-based-icons/IconUnlike";
import AiReplyActionButton from "./AiReplyActionButton";
import AiReplyActionsContainer from "./AiReplyActionsContainer";

function AiReplyActions() {
  return (
    <AiReplyActionsContainer>
      <AiReplyActionButton>
        <IconLike />
      </AiReplyActionButton>
      <AiReplyActionButton>
        <IconUnlike />
      </AiReplyActionButton>
      <AiReplyActionButton>
        <IconCopy />
      </AiReplyActionButton>
    </AiReplyActionsContainer>
  );
}

export default AiReplyActions;
