import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { ScopeJobResult } from './hooks/useScopeJobMutation';
import useScopeJobMutation from './hooks/useScopeJobMutation';
import Result from './Result';

const CATEGORY_LIST = [
  { label: '버추얼', value: '00810000' },
  { label: '토크/캠방', value: '00130000' },
  { label: '취미', value: '00020007' },
  { label: '여행', value: '00740000' },
  { label: 'VRChat', value: '00040131' },
  { label: '종합게임', value: '00040121' },
  { label: '마인크래프트', value: '00040017' },
  { label: '리그 오브 레전드', value: '00040019' },
  { label: '배틀그라운드', value: '00040066' },
  { label: '스타크래프트', value: '00040001' },
  { label: '오버워치', value: '00040058' },
  { label: '월드 오브 워크래프트', value: '00040011' },
] as const;
const RANGE = { MIN: 1, MAX: 180 } as const;

const App = () => {
  const [id, setId] = useState('');
  const [allCategory, setAllCategory] = useState(true);
  const [category, setCategory] = useState(new Set<string>());
  const [range, setRange] = useState(50);
  const [result, setResult] = useState<ScopeJobResult>({
    scopeId: [],
    broadList: [],
  });

  const { mutateAsync, status, isPending, currentCount, totalCount } =
    useScopeJobMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'all') {
      setAllCategory(event.target.checked);
      setCategory(new Set());
    } else if (event.target.checked) {
      setCategory((prevCategory) =>
        new Set(prevCategory).add(event.target.value),
      );
      setAllCategory(false);
    } else {
      setCategory((prevCategory) => {
        const newSet = new Set(prevCategory);
        newSet.delete(event.target.value);
        return newSet;
      });
    }
  };

  const handleClick = async () => {
    const data = await mutateAsync({
      id,
      selectValue: allCategory ? 'all' : [...category].join(','),
      range,
    });
    setResult(data);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ p: 2 }}>
      <Typography align="center" variant="h3">
        SOOP 스코프
      </Typography>
      <Typography align="center" gutterBottom variant="subtitle1">
        어디 산책 중이니? &#x1F9D0;
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <TextField
          autoFocus
          fullWidth
          helperText=",를 사용해서 여러 개의 ID를 찾을 수 있습니다."
          label="검거할 ID"
          maxRows={4}
          minRows={1}
          multiline
          onChange={(e) => setId(e.target.value)}
          value={id}
          variant="outlined"
        />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">카테고리</FormLabel>
          <FormGroup row>
            <FormControlLabel
              checked={allCategory}
              control={
                <Checkbox
                  indeterminate={allCategory === null}
                  onChange={handleChange}
                />
              }
              label="전체"
              value="all"
            />
            {CATEGORY_LIST.map((item) => (
              <FormControlLabel
                checked={category.has(item.value)}
                control={<Checkbox onChange={handleChange} />}
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Box>
          <Typography component="label" gutterBottom>
            추적 범위{' '}
            <Typography variant="caption">
              (카테고리 상단 n개까지 확인합니다. 비번방, 구플방, 19금방 확인
              불가)
            </Typography>
          </Typography>
          <Slider
            marks={[
              { value: RANGE.MIN, label: RANGE.MIN },
              { value: RANGE.MAX, label: RANGE.MAX },
            ]}
            max={RANGE.MAX}
            min={RANGE.MIN}
            onChange={(_, value) =>
              setRange(Array.isArray(value) ? value[0] : value)
            }
            sx={{
              mb: 4,
              '& .MuiSlider-valueLabel': {
                top: 'calc(100% + 10px)',
                transform: 'translateY(0) scale(0)',
                transformOrigin: 'top center',
              },
              '& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen': {
                transform: 'translateY(0) scale(1)',
              },
              '& .MuiSlider-valueLabel::before': {
                top: 0,
                bottom: 'auto',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
              },
            }}
            value={range}
            valueLabelDisplay="on"
          />
        </Box>

        <Button
          disabled={!id || (!allCategory && category.size === 0) || isPending}
          onClick={handleClick}
          sx={{ alignSelf: 'center' }}
          variant="contained"
        >
          스코프 쬐기!
        </Button>
      </Stack>

      <Result
        currentCount={currentCount}
        data={result}
        status={status}
        totalCount={totalCount}
      />
    </Container>
  );
};

export default App;
