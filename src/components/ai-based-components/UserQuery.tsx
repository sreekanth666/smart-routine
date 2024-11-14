import AiChatAvatar from "./AiChatAvatar";

type UserQueryProps = {
  imageUrl: string;
  query: string;
};

function UserQuery({ imageUrl, query }: UserQueryProps) {
  return (
    <div className="flex items-start">
      <AiChatAvatar imageUrl={imageUrl} isUser />

      <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 sm:max-w-md md:max-w-2xl">
        <p>{query}</p>
      </div>
    </div>
  );
}

export default UserQuery;
