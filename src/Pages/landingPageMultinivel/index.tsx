import { Divider } from '@mui/material';
import Banner1 from './banner1';
import Banner2 from './banner2';
import Banner3 from './banner3';
import Banner4 from './banner4';

export default function LandingPageMultinivel() {
  return (
    <>
      <Banner1 />
      <Banner2 />
      <Divider
        sx={{
          mx: 6,
          background: 'var(--primary-color)',
        }}
      />
      <Banner3 />
      <Banner4 />
    </>
  );
}
