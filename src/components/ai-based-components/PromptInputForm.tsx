import { FormEvent, useState } from "react";
import IconMike from "../UI/icons/ai-based-icons/IconMike";

type PromptInputFormProps = {
  onSendMessage: (message: string) => void;
  isHidden: boolean;
};

function PromptInputForm({ onSendMessage, isHidden }: PromptInputFormProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 pb-1 px-1" hidden={isHidden}>
      <label htmlFor="chat-input" className="sr-only">
        Enter your prompt
      </label>
      <div className="relative">
        <button
          type="button"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-green-500"
        >
          <IconMike />
          <span className="sr-only">Use voice input</span>
        </button>
        <textarea
          id="chat-input"
          className="block w-full mb-2 resize-none rounded-xl border-none bg-slate-200 py-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-base"
          placeholder="Enter your prompt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={1}
          required
        ></textarea>
        <button
          type="submit"
          className="absolute bottom-2 right-2.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 sm:text-base"
        >
          Send <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}

export default PromptInputForm;
