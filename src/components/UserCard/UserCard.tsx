import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { User } from "../../types/user";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => (
  <Card>
    <CardContent>
      <Grid container rowGap={2}>
        <Grid container size={12} sx={{ justifyContent: "center" }}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={user.avatar_url}
            alt={user.login}
          />
        </Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }}>
          <Typography variant="h6">{user.login}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default UserCard;
