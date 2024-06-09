import { useAuth } from "src/context/AuthContext";
import { Avatar as AvatarMui } from "@mui/material";

interface Props {
  width?: number;
  height?: number;
}

export default function MyAvatar({ width = 40, height = 40 }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) return null;

  return (
    <AvatarMui
      src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.username}`}
      alt={`Avatar for ${user.firstName}`}
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.2)",
        width,
        height,
      }}
    />
  );
}
