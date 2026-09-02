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
import { useEffect, useState } from 'react';

import useCategoryListQuery from './hooks/useCategoryListQuery.ts';
import type { ScopeJobResult } from './hooks/useScopeJobMutation.ts';
import useScopeJobMutation from './hooks/useScopeJobMutation.ts';
import Result from './Result.tsx';

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

  const { data: categoryList, isFetchedAfterMount } = useCategoryListQuery(
    '/src/shared/category.json',
  );
  const { mutateAsync, status, isPending, currentCount, totalCount } =
    useScopeJobMutation();

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'all') {
      setAllCategory(e.target.checked);
      setCategory(new Set());
    } else if (e.target.checked) {
      setCategory((prevCategory) => new Set(prevCategory).add(e.target.value));
      setAllCategory(false);
    } else {
      setCategory((prevCategory) => {
        const newSet = new Set(prevCategory);
        newSet.delete(e.target.value);
        return newSet;
      });
    }
  };

  const handleRangeChange = (_: Event, value: number | number[]) => {
    setRange(Array.isArray(value) ? value[0] : value);
  };

  const handleClick = async () => {
    const data = await mutateAsync({
      id,
      selectValue: allCategory ? 'all' : [...category].join(','),
      range,
    });
    setResult(data);
  };

  useEffect(() => {
    if (isFetchedAfterMount && !categoryList?.length) {
      alert('카테고리 데이터를 받아오지 못했습니다. 앱을 종료합니다.');
      bindings.quit();
    }
  }, [isFetchedAfterMount, categoryList]);

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
          onChange={handleIdChange}
          value={id}
          variant="outlined"
        />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">카테고리</FormLabel>
          {categoryList?.length ? (
            <FormGroup row>
              <FormControlLabel
                checked={allCategory}
                control={
                  <Checkbox
                    indeterminate={allCategory === null}
                    onChange={handleCategoryChange}
                  />
                }
                label="전체"
                value="all"
              />
              {categoryList?.map((item) => (
                <FormControlLabel
                  checked={category.has(item.value)}
                  control={<Checkbox onChange={handleCategoryChange} />}
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </FormGroup>
          ) : null}
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
            onChange={handleRangeChange}
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
          size="large"
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
