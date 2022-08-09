import { Clear, DoneOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [data, setData] = useState({
    age: 28,
    bmi: 30.28,
    children: 0,
    sex: 1,
    smoker: 0,
    region: 2,
  });
  const onChangeDataHandler = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };
  const predictHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/predict',
        data
      );
      setResult(res.data.charge);
      document.getElementById('slide-to-result').click();
      toast.success('Prediction successful');
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const clearHandler = () => {
    setResult(null);
    setData({
      age: 0,
      bmi: 0,
      children: 0,
      sex: 0,
      smoker: 0,
      region: 0,
    });
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        maxWidth: 'md',
        maxHeight: '100vh',
        overflow: 'auto',
        position: 'fixed',
        top: { xs: 0, md: '50%' },
        left: { xs: 0, md: '50%' },
        transform: { xs: 0, md: 'translate(-50%,-50%)' },
        zIndex: 0,
        height: { xs: '100vh', md: 'auto' },
      }}
    >
      <Grid item xs={12} md={6}>
        <Stack
          sx={{ height: { xs: '200px', md: '100%' } }}
          justifyContent={'center'}
          alignItems='center'
        >
          <Box
            component='img'
            src='/favicon/health-insurance.png'
            sx={{ height: '150px', objectFit: 'contain' }}
            id='result'
          />
          <Typography
            variant='h3'
            sx={{
              fontWeight: 'bold',
              marginTop: '10px',
              marginBottom: '10px',
              textAlign: 'center',
              color: loading ? 'gray' : 'primary.main',
            }}
          >
            {result || '- - -'}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              align='center'
              variant='h4'
              sx={{
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              Health Insurance Cost Prediction
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={'Age'}
              value={data['age']}
              onChange={(e) =>
                onChangeDataHandler('age', e.target.value)
              }
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={'BMI'}
              value={data['bmi']}
              onChange={(e) =>
                onChangeDataHandler('bmi', e.target.value)
              }
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={'Children'}
              value={data['children']}
              onChange={(e) =>
                onChangeDataHandler('children', e.target.value)
              }
              select
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={'Sex'}
              value={data['sex']}
              onChange={(e) =>
                onChangeDataHandler('sex', e.target.value)
              }
              select
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={0}>Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={'Smoker'}
              value={data['smoker']}
              onChange={(e) =>
                onChangeDataHandler('smoker', e.target.value)
              }
              select
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={'Region'}
              value={data['region']}
              onChange={(e) =>
                onChangeDataHandler('region', e.target.value)
              }
              select
            >
              <MenuItem value={0}>Northeast</MenuItem>
              <MenuItem value={1}>Northwest</MenuItem>
              <MenuItem value={2}>Southeast</MenuItem>
              <MenuItem value={3}>Southwest</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              alignItems={'center'}
              justifyContent='flex-end'
              spacing={2}
            >
              <a id={'slide-to-result'} href='#result' hidden></a>
              <Button
                variant='outlined'
                startIcon={<Clear />}
                onClick={clearHandler}
                color='inherit'
              >
                Clear
              </Button>
              <LoadingButton
                loading={loading}
                onClick={predictHandler}
                startIcon={<DoneOutline />}
                variant='contained'
              >
                Predict
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
