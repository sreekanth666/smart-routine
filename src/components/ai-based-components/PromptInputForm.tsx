import IconMike from "../icons/ai-based-icons/IconMike";

function PromptInputForm() {
  return (
    <form className="mt-2 pb-1 px-1">
      <label htmlFor="chat-input" className="sr-only">
        Enter your prompt
      </label>
      <div className="relative">
        <button
          type="button"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-500"
        >
          <IconMike />
          <span className="sr-only">Use voice input</span>
        </button>
        <textarea
          id="chat-input"
          className="block w-full mb-2 resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
          placeholder="Enter your prompt"
          rows={1}
          required
        ></textarea>
        <button
          type="submit"
          className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base"
        >
          Send <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}

export default PromptInputForm;
