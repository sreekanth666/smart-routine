import { ReactElement } from "react";

type AiReplyActionButtonProps = {
  children: ReactElement;
};

function AiReplyActionButton({ children }: AiReplyActionButtonProps) {
  return (
    <button className="hover:text-green-600" type="button">
      {children}
    </button>
  );
}

export default AiReplyActionButton;
