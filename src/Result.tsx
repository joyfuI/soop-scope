import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

import type { ScopeJobResult } from './hooks/useScopeJobMutation';

type ResultProps = {
  data: ScopeJobResult;
  status: 'idle' | 'pending' | 'error' | 'success';
  currentCount: number;
  totalCount: number;
};

const Result = ({ data, status, currentCount, totalCount }: ResultProps) => {
  const result = useMemo(
    () =>
      data.broadList
        .values()
        .map((broad) => ({
          ...broad,
          findId: broad.chatUserList.filter((chatUser) =>
            data.scopeId.includes(chatUser.userId),
          ),
        }))
        .filter((broad) => broad.findId.length > 0)
        .toArray(),
    [data],
  );

  if (status === 'idle') {
    return null;
  }

  return (
    <>
      <Divider sx={{ my: 3 }} />
      {status === 'pending' ? (
        <LinearProgress
          sx={{ my: 10 }}
          value={
            totalCount > 0 ? Math.round((currentCount / totalCount) * 100) : 0
          }
          variant="determinate"
        />
      ) : (
        <>
          <Typography align="center" variant="h4">
            검거! &#x1F575;&#xFE0F;
          </Typography>

          <Grid container spacing={1} sx={{ my: 2 }}>
            {result.map((item) => (
              <Grid key={item.broad.broad_no} size={6}>
                <Card>
                  <CardActionArea
                    onClick={() =>
                      window.open(
                        `https://play.sooplive.com/${item.broad.user_id}`,
                      )
                    }
                  >
                    <CardHeader
                      subheader={item.broad.broad_title}
                      title={item.broad.user_nick}
                    />
                    <CardMedia
                      alt={item.broad.broad_title}
                      component="img"
                      image={`https:${item.broad.broad_thumb}`}
                    />
                    <CardContent>
                      {item.findId.map((id) => (
                        <Typography
                          key={id.userId}
                          variant="body1"
                        >{`${id.username} (${id.userId})`}</Typography>
                      ))}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Result;
