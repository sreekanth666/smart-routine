type AiChatAvatarProps = {
  imageUrl: string;
  isUser: boolean;
};

function AiChatAvatar({ imageUrl, isUser }: AiChatAvatarProps) {
  return (
    <img
      className={`${isUser ? "mr-2" : "ml-2"} h-8 w-8 rounded-full sm:mr-4`}
      src={imageUrl}
    />
  );
}

export default AiChatAvatar;
