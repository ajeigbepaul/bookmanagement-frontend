interface UserAvatarProps {
  username: string;
  size?: number;
}

export default function UserAvatar({ username, size = 32 }: UserAvatarProps) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-blue-500 text-white font-bold"
      style={{ width: size, height: size, fontSize: size / 2 }}
      title={username}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  );
}
