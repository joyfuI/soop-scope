import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

import LinearProgressWithLabel from './components/LinearProgressWithLabel';
import ScopeCard from './components/ScopeCard';
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
        <LinearProgressWithLabel
          value={
            totalCount > 0 ? Math.round((currentCount / totalCount) * 100) : 0
          }
        />
      ) : (
        <>
          <Typography align="center" variant="h4">
            {result.length > 0 ? '검거!' : '검거실패!'} &#x1F575;&#xFE0F;
          </Typography>

          <Grid container spacing={1} sx={{ my: 2 }}>
            {result.map((item) => (
              <Grid key={item.broad.broad_no} size={6}>
                <ScopeCard data={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Result;
