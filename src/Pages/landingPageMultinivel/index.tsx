import { Divider } from '@mui/material';

import Banner1 from './HomeIndicacao/banner1';
import Banner2 from './HomeIndicacao/banner2';
import Banner3 from './HomeIndicacao/banner3';
import Banner4 from './HomeIndicacao/banner4';

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
