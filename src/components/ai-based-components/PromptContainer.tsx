import ScrollableContainer from "../UI/ScrollableContainer";
import AiChatAvatar from "./AiChatAvatar";
import AiReplyActions from "./AiReplyActions";
import PromptInputForm from "./PromptInputForm";
import UserQuery from "./UserQuery";

function PromptContainer() {
  return (
    <ScrollableContainer height={525}>
      {/* Prompt Messages Container - Modify the height according to your need */}
      <div className="flex h-[100dvh] w-full flex-col">
        {/* Prompt Messages */}
        <div className="flex-1 rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 sm:text-base sm:leading-7">
          <UserQuery
            imageUrl="https://dummyimage.com/256x256/363536/ffffff&text=U"
            query="Explain quantum computing in simple terms"
          />
          <AiReplyActions />
          <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 sm:px-4">
            <AiChatAvatar imageUrl="https://dummyimage.com/256x256/354ea1/ffffff&text=G" />

            <div className="flex max-w-3xl items-center rounded-xl">
              <div>
                Certainly! Quantum computing is a new type of computing that
                relies on the principles of quantum physics. Traditional
                computers, like the one you might be using right now, use bits
                to store and process information. These bits can represent
                either a 0 or a 1. In contrast, quantum computers use quantum
                bits, or qubits.
                <br />
                <br />
                Unlike bits, qubits can represent not only a 0 or a 1 but also a
                superposition of both states simultaneously. This means that a
                qubit can be in multiple states at once, which allows quantum
                computers to perform certain calculations much faster and more
                efficiently
              </div>
            </div>
          </div>

          <UserQuery
            imageUrl="https://dummyimage.com/256x256/363536/ffffff&text=U"
            query="What are three great applications of quantum computing?"
          />
          <AiReplyActions />
          <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 sm:px-4">
            <AiChatAvatar imageUrl="https://dummyimage.com/256x256/354ea1/ffffff&text=G" />

            <div className="flex max-w-3xl items-center rounded-xl">
              <div>
                Three great applications of quantum computing are: Optimization
                of complex problems, Drug Discovery and Cryptography.
              </div>
            </div>
          </div>
        </div>
        {/* Prompt message input */}
        <PromptInputForm />
      </div>
    </ScrollableContainer>
  );
}

export default PromptContainer;
