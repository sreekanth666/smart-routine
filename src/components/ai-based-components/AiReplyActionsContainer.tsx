import { ReactElement } from "react";

type AiReplyActionsContainer = {
  children: ReactElement[];
};

function AiReplyActionsContainer({ children }: AiReplyActionsContainer) {
  return (
    <div className="mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row">
      {children}
    </div>
  );
}

export default AiReplyActionsContainer;
