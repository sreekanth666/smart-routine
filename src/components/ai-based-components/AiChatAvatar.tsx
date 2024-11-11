type AiChatAvatarProps = {
  imageUrl: string;
};

function AiChatAvatar({ imageUrl }: AiChatAvatarProps) {
  return (
    <img className="mr-2 flex h-8 w-8 rounded-full sm:mr-4" src={imageUrl} />
  );
}

export default AiChatAvatar;
