import AiChatAvatar from "./AiChatAvatar";

type UserQueryProps = {
  imageUrl: string;
  query: string;
};

function UserQuery({ imageUrl, query }: UserQueryProps) {
  return (
    <div className="flex flex-row px-2 py-4 sm:px-4">
      <AiChatAvatar imageUrl={imageUrl} />

      <div className="flex max-w-3xl items-center">
        <p>{query}</p>
      </div>
    </div>
  );
}

export default UserQuery;
