import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import type { ChatUserList, MainBroadListResponse } from '../types';

type ScopeCardProps = {
  data: { findId: ChatUserList; broad: MainBroadListResponse['broad'][0] };
};

const ScopeCard = ({ data }: ScopeCardProps) => {
  const handleClick = () => {
    window.open(`https://play.sooplive.com/${data.broad.user_id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          subheader={data.broad.broad_title}
          title={data.broad.user_nick}
        />
        <CardMedia
          alt={data.broad.broad_title}
          component="img"
          image={`https:${data.broad.broad_thumb}`}
        />
        <CardContent>
          {data.findId.map((id) => (
            <Typography
              key={id.userId}
              variant="body1"
            >{`${id.username} (${id.userId})`}</Typography>
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ScopeCard;
