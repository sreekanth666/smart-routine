import { ReactElement } from "react";

type AiReplyActionsContainer = {
  children: ReactElement;
};

function AiReplyActionsContainer({ children }: AiReplyActionsContainer) {
  return (
    <div className="mb-2 flex w-full flex-row justify-end gap-x-2 text-slate-500">
      {children}
    </div>
  );
}

export default AiReplyActionsContainer;
