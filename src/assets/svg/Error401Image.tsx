import useWindowSize from '../../hooks/useWindowSize';

export function Error401Image() {
  const { isMobile } = useWindowSize();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 400 400'
      height={isMobile ? '200' : '400'}
      width='400'
    >
      <g fill={!isMobile ? 'var(--backGround_default)' : '#fff'}>
        <path
          d='M43.34 214.48a25.24 25.24 0 0 0 -4.62 10.98c-0.18 1.38 1 2.58 2.14 1.7A153.36 153.36 0 0 0 50.6 214l1 0.64a38.5 38.5 0 0 0 -3.16 15.16c0 0.72 0.28 1.32 1.04 1.32a2.12 2.12 0 0 0 1.48 -0.92 6.68 6.68 0 0 0 1.14 -2c1.42 -3.06 4.28 -10.34 4.84 -11.86a10.52 10.52 0 0 0 6.22 -1.62A7.24 7.24 0 0 0 70 219.4c0.38 0 1.06 0 1.18 -0.76 0.18 -0.98 -2.2 -4.16 -4.34 -6.78a9.74 9.74 0 0 0 2 -3.06c2.76 -1.08 4.32 -2.44 4.66 -4 1.12 -5.46 -11.84 -15.62 -18.16 -12a27 27 0 0 0 -7 8 13.32 13.32 0 0 0 -0.98 2.76 4.64 4.64 0 0 0 -2.62 1.16 78.72 78.72 0 0 0 -8.34 7.64c-1.58 1.72 -2.72 4.36 -0.42 4.68a3.46 3.46 0 0 0 2.46 -0.96c2 -1.36 7.68 -6.12 8.9 -7.16v0.24a43.24 43.24 0 0 0 -4 5.32zm-7.4 0.92a5.54 5.54 0 0 1 1.58 -2.36c2.82 -3 6.5 -6 7.52 -6.94a4.98 4.98 0 0 1 2 -1.28 11.12 11.12 0 0 0 0 2.94c-0.62 0.52 -1.24 1.12 -1.86 1.66a86.94 86.94 0 0 1 -8.52 6.36c-0.36 0.22 -0.84 0.22 -0.66 -0.38zm27.66 -5.04c0.34 -0.24 0.86 0.38 1.1 0.62a34.98 34.98 0 0 1 5.3 7.32 3.44 3.44 0 0 1 -1.42 0 7.4 7.4 0 0 1 -4.8 -4.16 5.2 5.2 0 0 1 -0.6 -2.22 2.36 2.36 0 0 1 0.42 -1.56zm-10.36 -14.2a24 24 0 0 1 14.4 12.46 5.66 5.66 0 0 1 -1.52 2.4c-0.86 -1 -2 -2.22 -3.02 -1.52s-0.94 3 -0.38 4.42a10 10 0 0 1 -5.46 1.58 15.86 15.86 0 0 0 0.44 -2.2c0.2 -1.4 -0.66 -2.16 -2 -2.2a3.84 3.84 0 0 0 -3.7 2.64l-0.82 -0.54a2.68 2.68 0 0 0 0.14 -3.5 3.32 3.32 0 0 0 -3 -1c-0.32 -2.3 -0.96 -7.12 4.92 -12.54zm-3.82 33.6a33.12 33.12 0 0 1 0.88 -7.18c0.44 -2 1.02 -3.5 1.48 -4.98 0.58 -1.88 1.56 -5.04 3.22 -5.34a2.96 2.96 0 0 1 0.62 0c1.16 0 1.14 0.54 0.82 1.66 -0.78 2.8 -6.62 18.8 -7.02 15.84zm-6.72 -12c1.06 -1.88 2.34 -3.66 3.56 -5.4 0.66 -0.92 1.56 -2.48 2.58 -2.6s2.32 0.88 2 1.86a112.64 112.64 0 0 1 -10.28 14.38c-0.54 0.6 -0.72 0.58 -0.68 -0.12a26.32 26.32 0 0 1 2.82 -8.14zM147.76 175.8a9.16 9.16 0 0 0 -4.26 -4.3 7.32 7.32 0 0 0 -4.2 -0.32c-35.56 6.14 -56.1 11.08 -56.6 11.28A5.1 5.1 0 0 0 80 186.18a16.98 16.98 0 0 0 3.28 15.44 4.7 4.7 0 0 0 2.72 2.14c0.94 0 11.68 -3.62 18.42 -4.46 4.42 -0.56 38.48 -8.64 39.82 -9.06 3.76 -1.22 5.88 -3.32 4.76 -10a14.38 14.38 0 0 0 -1.24 -4.44zM82 197.72a15.76 15.76 0 0 1 -0.94 -10.8c0.36 -1.28 0.94 -2.8 2.18 -3.28a3.36 3.36 0 0 1 3.08 0.56 10 10 0 0 1 3.02 6.36c1.34 7.56 -0.48 10.4 -1.7 11.42a2.12 2.12 0 0 1 -1.76 0.62c-1.5 -0.5 -3.22 -3.26 -3.88 -4.88zm30.88 -20.54 13.68 -2.48c7.82 5 5.38 15.1 4.66 17.5l-14 3.22c1.02 -2.9 2.3 -11.88 -4.34 -18.24zm-22.42 13.38c-0.58 -3.18 -1.56 -6.52 -4.22 -7.82 4 -0.94 8 -1.82 11.62 -2.6a23.68 23.68 0 0 1 3.56 18.56c-2.92 0.64 -9.4 2.38 -11.78 3.06 0.84 -1.46 2.04 -4.82 0.82 -11.2zM99.02 180c4 -0.84 8.12 -1.66 12.56 -2.48a17.76 17.76 0 0 1 4.42 18.2l-13.44 2.76A24 24 0 0 0 99.02 180zm33.4 12c0.96 -3.7 2.76 -12 -4.4 -17.5 2.86 -0.56 10.92 -2.16 12.78 -2.22a5.44 5.44 0 0 1 4 1.58 13.52 13.52 0 0 1 3.34 9.48c0 3.8 -1.3 5.22 -6 6.34zm242.1 80.68a8.18 8.18 0 0 0 -4.54 -1.8 15.08 15.08 0 0 1 -9.2 -3.38c2.86 -3.38 1.84 -5.16 1.24 -5.8a2.96 2.96 0 0 0 -3.84 -0.24c-1.76 1.4 -0.78 4.42 0.66 6a6.58 6.58 0 0 1 -8.86 -2.62 0.48 0.48 0 0 0 -0.82 0.5 7.64 7.64 0 0 0 10.58 3.02c5.38 5.06 12.16 2 15.1 6.5a10.26 10.26 0 0 1 0.78 7.38 0.3 0.3 0 0 0 0.54 0.22 9.18 9.18 0 0 0 -1.64 -9.78zm-13.9 -10.68c0.9 0.46 1.38 2.72 -0.72 4.68 -1.04 -1.1 -2 -2.62 -1.1 -4a1.46 1.46 0 0 1 1.82 -0.68zM124 336a6 6 0 0 1 -2.56 -0.68 19.6 19.6 0 0 0 -1.24 -3.02 7.42 7.42 0 0 0 -4.38 -3.7 11.8 11.8 0 0 0 -0.16 -2.86 15.26 15.26 0 0 0 -5.6 -2.3 0.66 0.66 0 0 0 -0.68 0.5c-0.2 1.04 -0.56 2.92 -0.8 4.84 -3.58 -0.82 -7.6 1.64 -8.8 2.1 -0.38 -0.42 -2 -2.44 -2.28 -2.72s-1.12 -0.38 -1.6 0.52c0 0 -2.34 4.54 -2.34 4.64v4.5a0.34 0.34 0 0 0 0.18 0.28l3.04 1.18c0 0.86 0.1 2.74 0.1 3.3 -0.44 0.28 -1.74 0.92 -2 1.56l-0.86 1.2a0.3 0.3 0 0 0 0 0.38c0.54 0.5 3.66 2.9 4.54 3.44a0.28 0.28 0 0 0 0.38 0l2.22 -2.34 5.06 0.98a35.72 35.72 0 0 1 2.88 4c0.12 0.24 0 0.16 5 0.16a0.3 0.3 0 0 0 0.3 -0.26 14.62 14.62 0 0 1 1.6 -3.1 0.36 0.36 0 0 0 0 -0.28l-0.26 -1.44 5.26 -3.78 2.42 0.32a0.3 0.3 0 0 0 0.32 -0.22l1.34 -4.58a0.34 0.34 0 0 0 0 -0.2c-0.9 -2.42 -0.8 -2.42 -1.08 -2.42zm-15 -5.76c0.26 0.12 0.42 -0.1 0.5 -0.38s0.42 -1.72 1.04 -4.96a15.32 15.32 0 0 1 4 1.54v2.76a0.58 0.58 0 0 0 0.48 0.58c4.3 0.9 5.34 6.46 5.82 6.86a6.86 6.86 0 0 0 2 0.76l-0.24 3.58 -2.7 -0.8a0.24 0.24 0 0 0 -0.28 0c-6 5.12 -5.68 4.74 -5.64 4.96l0.24 2.26h-5.4l-0.12 -2a0.3 0.3 0 0 0 -0.26 -0.28c-8.5 -1 -8 -1.02 -8 -0.82l-1.38 1.84 -2.56 -1.82a5.42 5.42 0 0 1 0.98 -0.56 1 1 0 0 0 0.74 -0.92v-6.6c0 -0.22 0.12 0 -3.12 -2.54a29.36 29.36 0 0 1 2.14 -4.24c0.76 0.9 2.16 2.78 2.9 2.78s6 -3.3 8.9 -2z'
          stroke-width='2'
        ></path>
        <path
          d='M107.64 342.82a7.38 7.38 0 0 0 5.64 -0.78 5.72 5.72 0 0 0 1.54 -7.26 5.14 5.14 0 0 0 -1.32 -1.38 11 11 0 0 0 -6.48 -1.36 5.08 5.08 0 0 0 -4.14 2.22 6.5 6.5 0 0 0 -0.2 6 8 8 0 0 0 4.96 2.56zm-4 -5.24c0.68 -1.04 2.44 -1.08 3.68 -0.98 4.92 0.44 5.9 1.7 6 2.42a2.36 2.36 0 0 1 -1.14 2.12 6.62 6.62 0 0 1 -4.72 0.42 6.24 6.24 0 0 1 -4 -2 2.12 2.12 0 0 1 0.28 -1.98zm-28.76 -11.28a5.28 5.28 0 0 0 -4.34 -1.26 5.84 5.84 0 0 0 -3.86 2.24 6 6 0 0 0 -0.52 4 8.62 8.62 0 0 0 3 6.22 4.3 4.3 0 0 0 3.74 1.08c0.94 -0.24 4 -1.64 3.4 -8.64a4.98 4.98 0 0 0 -1.42 -3.64zm-0.88 9.46c-0.88 0.4 -2.92 -0.62 -3.48 -3.88a6.16 6.16 0 0 1 1.24 -5.38c0.8 -0.78 2 0 2.56 0.88 1.68 2.12 1.32 7.68 -0.32 8.38zm61.1 -26.74a9.78 9.78 0 0 0 -11.32 0.86 7.58 7.58 0 0 0 -2.24 7.66 9.42 9.42 0 0 0 11.54 5.5 6.88 6.88 0 0 0 4.56 -3.04c0.76 -1.42 2.06 -7.9 -2.54 -10.98zm1.24 8a8.62 8.62 0 0 1 -7.5 2c-1.74 -0.38 -5.36 -2.2 -5.82 -4.62 -0.28 -1.42 0.6 -2.86 2.6 -4.22 3.34 -2.3 9.1 -1.66 10.86 2.14a4.14 4.14 0 0 1 -0.14 4.62z'
          stroke-width='2'
        ></path>
        <path
          d='M130.82 311.08c-2.88 -0.62 -4.52 0.88 -4.6 2.42s2 2.76 3.88 2.76c3.9 0 4.8 -4.26 0.72 -5.18zm0.96 3.72c-1.2 0.94 -4.42 0.2 -4.48 -1.1 0 -0.78 0.7 -1.64 2.16 -1.64 0.94 0 2.62 0.4 2.84 1.34a1.68 1.68 0 0 1 -0.52 1.4zM126.1 226a0.56 0.56 0 0 0 -0.3 -1.06c-6.8 2 -8 11.08 -2.86 13 0.66 4.7 6.44 6.9 11.44 5.08 2.48 4.38 10.56 4.68 10.64 -1.36a0.46 0.46 0 0 0 -0.92 0 3.18 3.18 0 0 1 -1.04 2.5 5.16 5.16 0 0 1 -7.62 -1.64c2.86 -1.5 3 -4 2 -4.94a2.26 2.26 0 0 0 -3.38 0.96 4.22 4.22 0 0 0 -0.24 3.36c-3.58 1.28 -8.6 0.2 -9.62 -3.72a4.94 4.94 0 0 0 5 -2.94c1.2 -3.1 -2.44 -4 -4.66 -2a5.42 5.42 0 0 0 -1.68 3.36c-3.64 -1.78 -2.3 -8.86 3.24 -10.6zm-2 11.06c0 -2.5 2.28 -4 3.7 -3.76 2.2 1.54 -1.68 4.3 -3.7 3.82zm12.4 1.16c0.24 0 0.42 0.4 0.52 0.96a3.42 3.42 0 0 1 -2 2.36c-0.82 -1.1 0.6 -3.44 1.48 -3.26zm56.3 46.48c-1.12 -1.08 -4.14 -2.68 -11.62 -1.32a4 4 0 0 0 -3.42 2.62 37.36 37.36 0 0 0 0.24 7.2c0.68 3.26 4.68 3.86 7.52 3.86a9.22 9.22 0 0 0 7.48 -2.56 3.62 3.62 0 0 0 0.78 -1.28c0 -0.44 0.12 -3.66 0 -6.32a2.64 2.64 0 0 0 -0.98 -2.2zm-0.58 1.14a1.38 1.38 0 0 1 0.26 1.46 4 4 0 0 1 -2.2 1.74c-2.62 0.98 -7.8 1.28 -10.28 -0.46a3.16 3.16 0 0 1 -1.12 -2.54q0.28 -1.2 2.52 -1.62c6.3 -1.22 9.7 -0.06 10.82 1.42zm-8.38 9.86c-1.84 -0.18 -4.16 -0.76 -4.68 -2.54a25.34 25.34 0 0 1 -0.26 -4 8 8 0 0 0 5.78 1.8c5.28 -0.12 7.16 -1.18 8 -2 0 1.06 0 3.74 -0.18 4 -1.16 2.52 -5.22 3.04 -8.66 2.74zM151.8 200.54c-1.12 -1.06 -4.14 -2.68 -11.64 -1.32a4 4 0 0 0 -3.4 2.66 37.16 37.16 0 0 0 0.14 7.16c0.66 3.28 4.66 3.88 7.52 3.88a9.28 9.28 0 0 0 7.58 -2.56c1.06 -1.3 0.86 -0.88 0.86 -7.6a2.7 2.7 0 0 0 -1.06 -2.22zm-0.58 1.14a1.4 1.4 0 0 1 0.26 1.48 4 4 0 0 1 -2.2 1.74c-2.62 0.98 -7.8 1.28 -10.28 -0.46a3.22 3.22 0 0 1 -1.12 -2.54c0.18 -0.8 1.02 -1.34 2.54 -1.64 6.28 -1.2 9.7 -0.06 10.8 1.42zm-8.38 9.88c-1.84 -0.18 -4.16 -0.76 -4.68 -2.54a25.5 25.5 0 0 1 -0.26 -4 8 8 0 0 0 5.78 1.78c5.28 0 7.16 -1.16 8 -2 0 1.08 0 3.76 -0.18 4 -1.16 2.54 -5.24 3.08 -8.66 2.76zM203.12 308c-1.2 0.92 -1.64 2.12 -3.46 1.9a3.28 3.28 0 0 0 -1 -4.18 3.7 3.7 0 0 0 -3.82 0.1c-1.7 2 0.44 3.88 2.88 4.78a10.9 10.9 0 0 1 -10.5 2.38c1.08 -2.46 1.08 -5.8 -1.1 -7.36 -3.56 -2.62 -8.22 4.52 -0.52 7.9a6.8 6.8 0 0 1 -10 1.52 0.46 0.46 0 0 0 -0.64 0.66 7.62 7.62 0 0 0 11.84 -1.76 11.88 11.88 0 0 0 12.28 -2.96 4.22 4.22 0 0 0 2.8 -0.26c0.5 -0.26 3.34 -3.82 6 -1.74a0.38 0.38 0 0 0 0.52 -0.58 3.88 3.88 0 0 0 -5.28 -0.4zm-7.72 -0.86c0 -0.6 0.76 -0.72 1.36 -0.72a1.84 1.84 0 0 1 1.88 0.9 2.28 2.28 0 0 1 -0.12 2.3 8.84 8.84 0 0 1 -2.74 -1.52 1.44 1.44 0 0 1 -0.38 -0.92zm-12.7 0.54c2.26 -4 4.82 0.76 4 3.32a7.28 7.28 0 0 1 -0.56 1.6c-2.32 -0.96 -4.14 -2.92 -3.44 -4.88zM172 61.54c2.92 0.84 0.24 6.5 0.74 10a6.3 6.3 0 0 0 3.9 4.9c3.66 1.9 8 0 11.46 1.42 1.68 1.14 1.36 3.32 1 5.84 -0.96 6.46 0.14 7.5 4.6 10.48 2.5 1.66 5.08 3.36 5.8 6.44a8.48 8.48 0 0 1 -1.36 6c-0.48 0.54 0.32 1.3 0.8 0.76 2.2 -2.48 5.18 -6.86 5.62 -10.36 0.28 -2.38 -0.44 -1.7 -0.82 -4s0.72 -4.2 1.88 -6.76c0.76 -2.58 -0.4 -3.9 -2 -6 -2 -2.64 -3.3 -6.5 -1.14 -8.76 2 -1.64 6.92 -3.86 4.54 -7.46 -1.32 -1.52 -3.76 -1.14 -4 -3.9a6.54 6.54 0 0 1 2.46 -5.14c4.3 -3.82 12 -5 14.82 -11.42 9.68 -19.1 -4.96 -33.86 -26.78 -34C181.1 9.56 164.62 14.8 158 25.06c-7.8 12.94 2 33.2 14 36.48zm49.48 -24.44a28.96 28.96 0 0 1 -3 7.2c-4 6.76 -16.8 6.7 -16.82 16a4.28 4.28 0 0 0 1.08 2.54 8.9 8.9 0 0 0 2.5 1.54 1.72 1.72 0 0 1 0.78 2.56 6.44 6.44 0 0 1 -2.58 2.2c-4.18 2 -4.22 7.18 -1.62 10.92 3.52 3.88 2.8 5.42 1.72 7.78 -1.66 3.56 -1.46 4.32 -0.74 6.22a5.3 5.3 0 0 1 0.48 3.1 19.16 19.16 0 0 1 -2.66 6.1 8.62 8.62 0 0 0 -2.24 -7.08 25.52 25.52 0 0 0 -4.58 -3.36c-5.32 -2.82 -3.8 -6.5 -3.06 -11.04a5.32 5.32 0 0 0 -2.2 -5.14 6.88 6.88 0 0 0 -3.48 -0.64c-3.68 0 -8.18 0.4 -10.32 -2.68 -2.82 -5.7 4 -12.16 -5.06 -14 -7.04 -3.46 -12.28 -13.5 -13.1 -20.84 -3.2 -27.12 43.18 -34.12 58.52 -20.82a18.34 18.34 0 0 1 6.44 19.44zm93.54 286.5c-0.14 -0.2 0.54 -0.14 -9.44 -0.14 -0.36 0 0 -0.26 -3.06 7.58a54 54 0 0 1 -10.38 0.18c-39.42 -2.5 -38.24 -8.58 -40.78 -30.64a68.84 68.84 0 0 0 -1.28 -8.9c-2.6 -10.52 -15.2 -13.36 -21.44 -3.32 -4 6.36 -3.04 15.08 -2.46 22.7a70.48 70.48 0 0 0 4.88 22.94c7 15.86 18 19.76 34.68 21.1a138 138 0 0 0 25.58 -0.16c0.42 0 6.84 -0.16 9.3 -0.2 0.5 0 -0.2 0.18 13.2 -28.22 1.78 27.4 2 28 1.24 30.78 -0.52 1.8 -9.5 22.48 -12.28 28.64 -0.46 -5.86 -1.42 -23.5 -1.44 -28.42a0.3 0.3 0 0 0 -0.32 -0.3l-8.6 0.76a0.3 0.3 0 0 0 -0.28 0.3c0 5.36 1.58 26.86 2.14 31.86a0.3 0.3 0 0 0 0.3 0.26l8.26 -0.76a0.3 0.3 0 0 0 0.26 -0.24c0.24 -0.78 12 -28.46 12.72 -30.2a15.68 15.68 0 0 0 1 -6.12c-0.04 -0.82 -1.72 -29.32 -1.8 -29.48zm-13.02 8.9c-1.22 3.02 -6.66 16 -8.94 20.94h-0.3a33.36 33.36 0 0 1 1.76 -20.74c1.48 0.08 5.76 -0.06 7.48 -0.2zm-10.32 21.08c-4.7 0.44 -9.52 0.66 -14.38 0.64a28.52 28.52 0 0 1 4.6 -22.46c2 0.2 8.82 0.76 11.52 0.92a33.6 33.6 0 0 0 -1.82 20.9zm-38 -34.18c1.28 3.54 5.78 6.86 8.3 8.1a26.52 26.52 0 0 0 -6.72 24.74c-12.66 -2.88 -16.98 -8.5 -20.54 -14.5a37.8 37.8 0 0 1 18.82 -18.34zm-3.78 -20.62c0 0.68 0.82 7.16 0.94 8.24 -10.62 -2.7 -20.48 5.76 -22.78 8.28 -0.24 -2.36 -0.78 -10.3 -0.86 -12.82 7.08 -4.28 14.48 -6.18 22.56 -3.7zm1.1 9.56a85.74 85.74 0 0 0 2.28 10 37.84 37.84 0 0 0 -19.22 18.18 54.36 54.36 0 0 1 -5.78 -19.46c0.82 -1.06 10.5 -11.58 22.58 -8.72zm-22.62 -16c4.14 -12.26 17.4 -10.96 20.3 -1.28a50.5 50.5 0 0 1 1.08 6.46 27.46 27.46 0 0 0 -22.56 3.42 26 26 0 0 1 1.04 -8.56zM262.92 328a104.52 104.52 0 0 0 17.64 3.62 27.52 27.52 0 0 0 -4.36 22.6 112.62 112.62 0 0 1 -19.74 -1.72 26.8 26.8 0 0 1 6.46 -24.5zm-15.16 -92a5.26 5.26 0 0 0 -1.74 2.58 4.5 4.5 0 0 0 -2.62 0.54 6.96 6.96 0 0 0 -2.78 3.18c-7.12 -6.88 -16.8 -4.6 -21.1 3.44 -5 9.3 1.28 23.26 12.66 23.26 5.08 0 10.92 -2.62 13.1 -7.64a16.26 16.26 0 0 0 0.28 -10.78 0.54 0.54 0 0 0 -0.12 -0.24 19.1 19.1 0 0 0 -3.84 -7.02c0.84 -1.68 2.22 -3.56 4 -3.4 -0.74 4.52 1.24 6 3.02 5.46s1.06 -2.36 0.78 -3.24a5.06 5.06 0 0 0 -2.3 -3.22 4.38 4.38 0 0 1 1.12 -1.8c2 -2 4.56 -0.52 7.06 1.28a0.34 0.34 0 0 0 0.48 0 0.4 0.4 0 0 0 0 -0.48c-1.16 -1.08 -4.88 -4.26 -8 -1.92zm0.4 6.16c0.44 1.2 0.46 1.42 0.42 1.66s-0.38 0.46 -0.72 0.4c-1.18 -0.24 -1.18 -2.48 -0.98 -4a3.7 3.7 0 0 1 1.28 1.98zM219.88 248a12.66 12.66 0 0 1 11.78 -8.52 13.2 13.2 0 0 1 8.4 4 17.76 17.76 0 0 0 -0.84 2.94c-4.5 -5.12 -11.5 -5.28 -15.14 0.68a13.06 13.06 0 0 0 -1.46 10c1.24 4.46 5.7 8.96 10.74 8.44 6.7 -0.7 11.76 -10.52 6.88 -17.8a15.62 15.62 0 0 1 0.8 -3.2 17.08 17.08 0 0 1 3.42 15.38c-1.58 4.92 -7.14 7.66 -11.8 7.8 -9.82 0.42 -15.98 -11.12 -12.78 -19.72zm24.78 -35.62a10.72 10.72 0 0 0 7.46 -0.82 2.34 2.34 0 0 0 1.02 -1.5c0 -0.2 0.86 -20.3 0.28 -20.64a0.34 0.34 0 0 0 -0.34 0 13.06 13.06 0 0 1 -6.2 2.62c-0.82 0 -1.78 0 -2.14 0.98 -0.2 0.58 -0.76 14 -0.5 18.82a0.66 0.66 0 0 0 0.42 0.54zm7.32 -2c-0.22 0.36 -2 1.86 -6.62 1.08 0 -4.94 0.48 -16.34 0.56 -17.46 0 -0.44 0 -0.52 0.56 -0.52a13.2 13.2 0 0 0 6 -2c-0.06 3.72 -0.28 17.92 -0.48 18.82zm75.06 83.42a6 6 0 0 1 -2.56 -0.68 18.82 18.82 0 0 0 -1.24 -3.02 7.42 7.42 0 0 0 -4.38 -3.7 12 12 0 0 0 -0.16 -2.88 15.68 15.68 0 0 0 -5.58 -2.28 0.68 0.68 0 0 0 -0.7 0.5c-0.28 1.5 -0.6 3.18 -0.8 4.84 -3.58 -0.82 -7.6 1.62 -8.8 2.1 -1.74 -2 -2.18 -3.14 -3.04 -2.98s-0.88 0.8 -2.26 3.56c-0.36 0.74 -0.74 1.5 -0.84 1.66a0.24 0.24 0 0 0 0 0.2v4.48a0.3 0.3 0 0 0 0.18 0.28l3.04 1.2c0 0.84 0.1 2.74 0.1 3.28l-0.42 0.26c-1.46 0.86 -1.32 0.84 -2.52 2.5a0.34 0.34 0 0 0 0 0.4c0.54 0.5 3.66 2.9 4.54 3.44a0.34 0.34 0 0 0 0.38 0l2.22 -2.34 5.06 0.98a35.72 35.72 0 0 1 2.88 4c0.12 0.22 0 0.16 5 0.16a0.3 0.3 0 0 0 0.3 -0.28 15.68 15.68 0 0 1 1.54 -3.06 0.3 0.3 0 0 0 0 -0.26l-0.26 -1.44 5.26 -3.8 2.42 0.32a0.28 0.28 0 0 0 0.32 -0.2l1.34 -4.6a0.28 0.28 0 0 0 0 -0.18c-0.88 -2.44 -0.78 -2.44 -1.02 -2.46zM312 288a0.28 0.28 0 0 0 0.28 0c0.2 0 0.28 -0.14 1.28 -5.32a15.32 15.32 0 0 1 4 1.54v2.72a0.6 0.6 0 0 0 0.48 0.62c4.3 0.88 5.34 6.46 5.8 6.86a7 7 0 0 0 2 0.76l-0.24 3.58 -2.7 -0.8c-0.24 0 0.24 -0.38 -5.82 4.76a0.26 0.26 0 0 0 0 0.26l0.24 2.26h-5.4l-0.12 -2a0.3 0.3 0 0 0 -0.26 -0.28l-7.82 -0.94c-0.26 0 -0.18 0 -1.66 2l-2.56 -1.82a5.42 5.42 0 0 1 0.98 -0.56 1 1 0 0 0 0.74 -0.92v-6.6c0 -0.22 0.14 0 -3.12 -2.54a28.34 28.34 0 0 1 2.14 -4.24c0.72 0.88 2.16 2.78 2.9 2.78s6 -3.38 8.86 -2.12z'
          stroke-width='2'
        ></path>
        <path
          d='M310.64 300.62a7.38 7.38 0 0 0 5.64 -0.78 5.72 5.72 0 0 0 1.54 -7.26 4.7 4.7 0 0 0 -1.46 -1.48 10.94 10.94 0 0 0 -8 -0.92 4.56 4.56 0 0 0 -2.5 1.88 6.5 6.5 0 0 0 -0.2 6 8.18 8.18 0 0 0 4.98 2.56zm-3.88 -5.24c0.66 -1.04 2.44 -1.08 3.66 -0.96 4.92 0.42 5.9 1.68 6 2.4a2.36 2.36 0 0 1 -1.14 2.12 6.62 6.62 0 0 1 -4.72 0.42 6.24 6.24 0 0 1 -3.9 -2 2 2 0 0 1 0.1 -1.98zm-210.4 -53.22a7.58 7.58 0 0 0 -2.24 7.68 9.44 9.44 0 0 0 11.54 5.5 7.04 7.04 0 0 0 4.56 -3.08c0.74 -1.38 2 -7.88 -2.56 -10.94a9.78 9.78 0 0 0 -11.3 0.84zm12.54 7.08a8.66 8.66 0 0 1 -7.5 2c-1.74 -0.4 -5.34 -2.22 -5.8 -4.64 -0.28 -1.42 0.6 -2.84 2.6 -4.22 3.36 -2.3 9.1 -1.64 10.86 2.14a4.18 4.18 0 0 1 -0.16 4.72z'
          stroke-width='2'
        ></path>
        <path
          d='M103.4 243.36c-2.88 -0.6 -4.52 0.88 -4.6 2.42 0 1.84 2 2.76 3.86 2.76 3.98 0 4.82 -4.32 0.74 -5.18zm0.96 3.74c-1.18 0.92 -4.42 0.18 -4.48 -1.12 0 -0.76 0.7 -1.62 2.16 -1.62 0.92 0 2.6 0.4 2.82 1.32a1.68 1.68 0 0 1 -0.5 1.42zM332.12 264a9.78 9.78 0 0 0 -11.32 0.86 7.7 7.7 0 0 0 -2.24 7.66 9.42 9.42 0 0 0 11.54 5.5 6.88 6.88 0 0 0 4.56 -3.08c0.76 -1.42 2.08 -7.9 -2.54 -10.94zm1.24 8a8.62 8.62 0 0 1 -7.5 2c-1.74 -0.4 -5.36 -2.2 -5.82 -4.64 -0.28 -1.42 0.6 -2.84 2.6 -4.22 3.42 -2.34 9.12 -1.6 10.86 2.14a4.18 4.18 0 0 1 -0.14 4.6z'
          stroke-width='2'
        ></path>
        <path
          d='M327.84 266c-2.88 -0.6 -4.52 0.88 -4.6 2.44s2 2.76 3.88 2.76c4 0 4.88 -4.34 0.72 -5.2zm0.96 3.74c-1.18 0.92 -4.42 0.2 -4.46 -1.1 0 -0.78 0.68 -1.64 2.14 -1.64 0.9 0 2.62 0.38 2.84 1.34a1.7 1.7 0 0 1 -0.52 1.4zm-94.98 -87a5.38 5.38 0 0 0 -2.76 0 0.3 0.3 0 0 0 -0.22 0.38l0.2 0.64c0.16 0.5 0.76 -0.18 2.46 0.14 -0.64 4 2.4 6.42 4 4.64s-0.34 -4.52 -2.5 -5.48a4.96 4.96 0 0 1 6.18 -2.68 0.36 0.36 0 0 0 0.26 -0.68 5.56 5.56 0 0 0 -7.62 3.04zm1.66 4.82a4.14 4.14 0 0 1 -0.78 -3.22c3.42 1.66 2.24 4.88 0.78 3.22zM206.2 194a8.2 8.2 0 1 0 8.32 6.58A8 8 0 0 0 206.2 194zm14.66 -20.24a2.36 2.36 0 0 0 -2 1.72c-0.44 1.44 0.56 3.34 1.84 3.44a2.66 2.66 0 0 0 2.26 -2.92 2.4 2.4 0 0 0 -2.1 -2.24zm-137.48 11.92C82 186 81.04 190.46 82 194.2c0.82 3.3 3.2 6.76 4.6 6.42s1.78 -4.84 1 -8.26 -2.78 -6.92 -4.22 -6.68z'
          stroke-width='2'
        ></path>
        <path
          d='M231.86 163.8a2.52 2.52 0 0 0 -0.74 -2c-0.74 -0.52 -1.84 0 -2.16 0 -30.54 5.36 -47.78 -3.44 -49.32 -2.86s-2.64 2.76 -3 20.26v28.3c1.06 1.32 29.46 30.68 55.64 2 -0.28 -6.62 -0.18 -36.06 -0.42 -45.7zm-43.38 2a3.78 3.78 0 1 1 -2.86 4 3.74 3.74 0 0 1 2.86 -3.98zm-0.8 24.3v-4.32a8.88 8.88 0 0 1 -5.06 -2c-0.14 0.5 -0.3 0.98 -0.44 1.46a3.4 3.4 0 0 1 -3.08 0 80.18 80.18 0 0 1 0.28 -12.54c0.2 0.36 3.84 6.66 10 6.88s12.3 -5.54 12.78 -13.74a46 46 0 0 1 10.32 2.98 6.96 6.96 0 0 1 -3.2 4l-2.38 -0.96a11.28 11.28 0 0 1 -1.16 3.56l2.74 3.32a6.12 6.12 0 0 1 -3.34 4.3l-3.02 -2.38A10.28 10.28 0 0 1 194 185.18v3.56a4.76 4.76 0 0 1 -6.32 1.38zm33.56 10.84a13.82 13.82 0 0 1 -3 0.36 6.42 6.42 0 0 1 -0.72 3.86l3.72 2.94a10.6 10.6 0 0 1 -3.8 4.88c-0.36 -0.24 -2.26 -1.38 -2.78 -1.64a9.18 9.18 0 0 1 -4 2.3c0 0.68 0 1.38 -0.14 2a8.4 8.4 0 0 1 -6.68 0.72l-0.36 -2.86a14.8 14.8 0 0 1 -4.94 -2.94l-2.44 2.16a4.7 4.7 0 0 1 -3.5 -5.24l2.5 -1.66a5.58 5.58 0 0 1 0 -3.14 33.48 33.48 0 0 1 -4.44 -3.08 4.58 4.58 0 0 1 2 -5.16l2.92 1.86a10.24 10.24 0 0 1 4 -4.8c-0.58 -1.32 -1.18 -2.64 -1.78 -4l3.6 -2.44 3.66 4.94a12.72 12.72 0 0 1 4.36 0.16 31.4 31.4 0 0 1 2.94 -4 30.92 30.92 0 0 1 4 3.08 34.72 34.72 0 0 1 -1.8 4 6 6 0 0 1 1.8 1.88 14.58 14.58 0 0 1 3.08 -0.8 7.54 7.54 0 0 1 1.8 6.64zm5.5 -22.2 -2 -0.32a1.3 1.3 0 0 1 -0.88 1.04l1.2 1.7a1.88 1.88 0 0 1 -2 1.78 11.44 11.44 0 0 1 -1.54 -2 3.28 3.28 0 0 1 -2.48 -0.46c-0.52 0.7 -1.04 1.38 -1.54 2a2.12 2.12 0 0 1 -2.3 -1.58l1.78 -1.86a2.84 2.84 0 0 1 -0.86 -2 24.42 24.42 0 0 1 -3.3 -0.18 17.1 17.1 0 0 1 0 -2.48 18.3 18.3 0 0 1 3.78 0 2.24 2.24 0 0 1 1.22 -2 29.02 29.02 0 0 1 -1.12 -3.52 7.54 7.54 0 0 1 2.26 -0.76 31.42 31.42 0 0 1 1.68 2.8 3.74 3.74 0 0 1 1.8 0.26 13.74 13.74 0 0 1 1.5 -1.88 4.8 4.8 0 0 1 2 1.48l-1.62 1.78a4.32 4.32 0 0 1 0.88 3.46l1.78 0.6a4 4 0 0 1 -0.24 2.16zM341.72 208c0 -2.34 0.16 -6 -2.12 -7.68 -2 -1.52 -10.98 3.76 -46.88 0.56 -0.84 0 -1.7 1.66 -2 8.66 -0.22 4.3 0.6 17.46 0.94 22 3.4 2.18 24.86 11.84 50.76 0 -0.74 -10.5 -0.82 -18.1 -0.7 -23.54zm-45.04 7.74a0.74 0.74 0 0 1 -1.06 -1.04l3.72 -3.9c-1.06 -0.94 -2 -2 -3.2 -3a0.68 0.68 0 0 1 0.96 -0.98c0.96 0.88 2 1.78 3.38 2.8 0.72 -0.76 2.82 -2.96 3.48 -3.56a0.88 0.88 0 0 1 1.24 1.22c-0.62 0.7 -2.7 2.74 -3.34 3.36a36 36 0 0 1 2.96 2.24 0.82 0.82 0 0 1 -0.88 1.36 21.22 21.22 0 0 1 -3.32 -2.36zm35.52 7.52a18.62 18.62 0 0 0 -0.18 3.66 0.7 0.7 0 0 1 -0.66 0.76 0.78 0.78 0 0 1 -0.8 -0.68 24.34 24.34 0 0 1 0 -2.88s-26.2 1.02 -29.1 1.06a12.82 12.82 0 0 0 0.32 3.78 0.68 0.68 0 0 1 -1.32 0.36 12.22 12.22 0 0 1 -0.5 -4.98 0.78 0.78 0 0 1 0.82 -0.72c1.52 0.16 30.28 -1.26 30.54 -1.26a0.36 0.36 0 0 1 0.32 0 0.8 0.8 0 0 1 0.56 0.9zm2.62 -15.2 -5.1 3.8c0.7 0.62 2.76 2.34 3.3 2.96a0.76 0.76 0 0 1 -0.94 1.18 36.38 36.38 0 0 1 -3.7 -3.06 32.5 32.5 0 0 0 -2.46 2.32c-0.6 0.68 -1.6 -0.26 -1 -0.94s1.48 -1.62 2.3 -2.48c-1.2 -1.18 -2.3 -2.42 -3.34 -3.58a0.72 0.72 0 0 1 1.04 -0.98c1.12 1.18 2.3 2.3 3.52 3.44a57.5 57.5 0 0 1 5.48 -4c0.82 -0.36 1.64 0.74 0.9 1.28z'
          stroke-width='2'
        ></path>
        <path
          d='M370 157.86h-52.68c0 -3.52 0.34 -48.5 0.4 -51.56a6.24 6.24 0 0 0 3.5 -10.82 5.86 5.86 0 0 0 -9.84 4.8 6.46 6.46 0 0 0 5.24 6c-0.48 11.74 -0.66 39.38 -0.64 51.6 -16.5 0 -31.2 0 -34.78 -0.16l-9.54 -10.94c-0.26 -6 -4.64 -9.88 -11.72 -10.32a15.84 15.84 0 0 0 -10 2.96 15.34 15.34 0 0 1 -5.22 -3.68 7.18 7.18 0 0 0 -1.2 -4.18c-2.9 -4.4 -8.62 -5.04 -12.78 -5.5 -5 -0.54 -9.82 -0.86 -14.32 -0.9a19.34 19.34 0 0 1 0.12 -6.62c4 4 8.72 1.08 7.28 -3.02 -0.46 -1.28 -1.72 -3.6 -3.54 -4 -2.24 -0.54 -3.48 2 -4.24 4.14a9.52 9.52 0 0 1 -0.48 -7.74 8.22 8.22 0 0 1 10.26 -4.62 7.14 7.14 0 0 0 1.1 5.16 2.2 2.2 0 0 0 4 -0.86c0.48 -2.12 -1.66 -4.16 -3.62 -5.1a9.7 9.7 0 0 1 6.38 -6.5 28.34 28.34 0 0 1 12.36 -0.78 0.44 0.44 0 0 0 0.12 -0.86 23.86 23.86 0 0 0 -13.18 0.52 11.18 11.18 0 0 0 -6.84 7.12 9.62 9.62 0 0 0 -10.4 3.08 10.54 10.54 0 0 0 -0.14 12.26 19.44 19.44 0 0 0 -0.32 7.82A93.2 93.2 0 0 0 192 127.84c-1.3 -5.64 -6 -8.22 -8.8 -7.34 -4.28 -4 -13.82 -4 -18.3 2 -0.42 0.54 0.44 1.14 0.86 0.6C169.56 118 178 117.52 182 121.04a3.74 3.74 0 0 0 -1.6 2.96c0 2.3 2.28 3.72 3.7 2.16a3.68 3.68 0 0 0 0 -4.52c2.28 -0.22 5.68 2 6.66 6.52 -5.12 1.4 -10.82 3.8 -10.88 10a14.82 14.82 0 0 0 -8.82 0.22 13.54 13.54 0 0 0 -6.46 6.3 22.52 22.52 0 0 0 -3.2 8.56 26.76 26.76 0 0 0 -0.38 4.28c-17.88 0 -137.4 0.26 -137.4 0.26a0.52 0.52 0 0 0 0 1.04h137.52A5.22 5.22 0 0 0 164 163.08 187.42 187.42 0 0 0 161.18 202c0.3 9.32 0 14.78 8.84 19.46a8.72 8.72 0 0 0 -5.48 3.08c-2.54 3.52 -1.58 11.06 -1.04 15.34a4.74 4.74 0 0 0 -1.48 4c-8.46 2.26 -13.74 5.44 -72 32.58 0 0 -6.24 -9.9 -8.48 -13.4a0.3 0.3 0 0 0 -0.4 -0.1L68.1 270a0.3 0.3 0 0 0 0 0.42c4.44 6.92 21.74 30.9 26.54 37.12 -5.44 -1.44 -23.42 -5.62 -28.78 -6.48a8 8 0 0 1 -5.86 -2.52c-0.7 -1 -15.72 -28.16 -19.04 -34.4 3.78 0.88 21.42 4.6 24.1 4.92 0.2 0 -0.4 0.22 12.6 -6.44a0.3 0.3 0 0 0 0 -0.56c-5.4 -0.58 -24.36 -3.28 -28.24 -4 -0.28 0 -9.64 4.52 -10.22 4.8a0.32 0.32 0 0 0 -0.16 0.28c0 0.2 18.96 34.38 19.46 35.16a6.94 6.94 0 0 0 5.04 3.7c2.12 0.46 31.72 7.36 32.7 7.68 0.26 0 -0.32 0.44 9.88 -7.2a0.3 0.3 0 0 0 0 -0.4l-1.14 -1.82C114.5 296 166.34 272 169.4 270.4c1.52 -0.8 2.88 -1.52 4.24 -2.3 29.56 9.02 53.72 8.26 73.86 -2.32a61.74 61.74 0 0 0 8.18 -5.14 66.12 66.12 0 0 0 7.42 -6.76c0 -0.22 -0.5 -32 -1.14 -33.68a5.8 5.8 0 0 0 -2 -2.6 17.12 17.12 0 0 0 5.24 -12.86c0 -3.3 -0.78 -25.1 -1.04 -30.14 24 19.54 22.46 17.74 22.3 18.14 -4 10.48 -3.1 35.44 -2.64 46.6a15.74 15.74 0 0 0 2 7.86 19.32 19.32 0 0 0 13.3 8c10.26 1.76 27.82 0.84 37.88 -1.18 12.32 -2.48 16.74 -6.6 17.3 -17.34 0.14 1.72 1.48 2.48 3.48 0.58a40.44 40.44 0 0 0 3.64 -5.34 7.6 7.6 0 0 0 5.8 -4 14.16 14.16 0 0 0 1.6 -8.78c-0.52 -4 -2.2 -11.22 -7.44 -13.22a8.28 8.28 0 0 0 -7.78 0.74 26 26 0 0 0 -1.18 -3.36c-1.52 -10.64 -4.62 -23.5 -14.7 -29.18a26 26 0 0 0 -9.2 -2.68 32 32 0 0 0 -0.18 -4.56 3.18 3.18 0 0 0 -1.72 -2.56c-2.2 -1.36 -6.3 -1.42 -9.3 -1.06v-4.2c23.2 0 49.04 -0.16 52.72 -0.32 0.52 0 0.52 -0.88 -0.04 -0.88zm-151.04 -44.82c0.6 -0.46 1.26 -0.38 2 0.28a5.14 5.14 0 0 1 2 4.14c-0.36 2 -3.4 2.7 -5.88 -0.48a8.6 8.6 0 0 1 1.88 -3.94zm8.2 -9.24a6.6 6.6 0 0 1 1.72 1.3c2 2 0.28 3.62 -0.64 2.78a5.22 5.22 0 0 1 -1.08 -4.08zm-43.8 21.22c-0.38 0.7 -1.08 0.52 -1.44 0a2.34 2.34 0 0 1 0.96 -3.02 2.94 2.94 0 0 1 0.48 3.02zm132.64 34v4.4c-2 0.34 -6 1.08 -6.2 3.14a29.5 29.5 0 0 0 -0.34 5.32 19.18 19.18 0 0 0 -12 4.64c-3.56 -4.22 -9.8 -11.44 -15.28 -17.74 5.82 0.26 19.18 0.32 33.82 0.32zm-45 -11.44 2.28 2.72a14.18 14.18 0 0 0 -11.54 3.06c-4.44 4 -4.9 10.96 -4.86 14a13.46 13.46 0 0 1 -3.22 -10.36 12.7 12.7 0 0 1 5.24 -8.6 12.88 12.88 0 0 1 12.1 -0.74zm-16.44 -8c1.44 -0.86 2.72 -0.84 3.42 0a2.42 2.42 0 0 1 -0.2 3.08 8.98 8.98 0 0 1 -4.72 2.82c-1.32 0.32 -2.32 0.38 -2.94 1.5 -1.04 1.86 -3.04 0.56 -1.76 -1.62a16 16 0 0 1 6.2 -5.68zm-7.26 15.6a1.22 1.22 0 0 1 -2.2 -0.52 4.14 4.14 0 0 1 0.8 -3.38 1.46 1.46 0 0 1 2.46 0.92 5.1 5.1 0 0 1 -1.06 3.08zm-31.76 -28.82c0.16 0.7 0.36 1.4 0.58 2 -13.06 0 -18.76 1.28 -24 2.78a10.96 10.96 0 0 0 0 -2.14 114.14 114.14 0 0 1 23.42 -2.64zm-32.78 7.22a10.16 10.16 0 0 1 5.5 -3.4c0.78 -0.28 1.64 -0.54 2.66 -0.8a10.3 10.3 0 0 1 0 2.22c-12 3.74 -4.34 7.38 8.12 9.58 9.2 1.62 30.62 1.22 38 -4.34 2 -1.52 2.74 -3.16 0.84 -4.82 -3.5 -3 -14.36 -3.54 -20.66 -3.6a16.38 16.38 0 0 1 -0.58 -2 124 124 0 0 1 17.44 1.42c9.64 1.68 11.48 8 6.94 13.54 -5.68 6.8 -16.62 7.84 -24.38 8a95.72 95.72 0 0 1 -23.3 -1.8 37.7 37.7 0 0 1 -7.26 -2 9.32 9.32 0 0 1 -4.66 -5.12 8 8 0 0 1 1.34 -6.88zM165.46 240a9.54 9.54 0 0 1 5.34 -0.88 18.62 18.62 0 0 1 9.62 3c4 2.74 6 7.42 6.2 14.28a14.64 14.64 0 0 1 -0.7 5.26c-1.46 3.82 -5.34 4.58 -7.36 2.94a12.42 12.42 0 0 0 -2.28 -20.32c-3.38 -1.84 -7.62 -2.1 -12.96 -0.86a3.88 3.88 0 0 1 2.14 -3.42zm-61.16 59.14c-2.98 -4.76 -11.66 -18.54 -13.76 -21.86l10 -4.5a35.34 35.34 0 0 1 12.8 22.12c0.02 0.2 0.66 -0.24 -9.04 4.24zm10.12 -4.64a32.52 32.52 0 0 0 -12.74 -22.24c5.66 -2.54 11.32 -5.12 16.86 -7.66 9.84 5.44 11.62 19.44 11.9 22.56zm17.1 -7.82c-1.24 -16.32 -9.24 -21.56 -11.54 -22.74 2.98 -1.36 12.92 -6 16.62 -7.74 12 1.88 14.96 19.06 15.28 21.2 -3.16 1.42 -15.88 7.24 -20.36 9.28zm40.8 -19.14c-1.62 0.82 -15.72 7.68 -19.42 9.4 -2.34 -16.5 -10.28 -20.62 -14.42 -21.64 4 -2 15.08 -7.26 19.62 -8.88 12.72 1.32 14.42 17.68 14.22 21.12zm1.06 -0.62c0.36 -16.26 -8.94 -20.52 -12.18 -21.5 8 -2.32 13.52 -1.6 17.16 2.2a11.32 11.32 0 0 1 0.42 15.18 31.24 31.24 0 0 1 -5.4 4.12zm87.7 -42.62c0.18 3.2 0.78 28.3 0.86 29.28a142.92 142.92 0 0 1 -13.34 10c-19.54 11.04 -43.68 12.26 -73.74 3.72 0.96 -0.62 2.2 -1.52 2.72 -1.88 2.18 2.26 6.24 1.42 8.18 -0.98 2.64 -3.26 2.38 -8 1.86 -11.76 -1.2 -8.92 -6.84 -14 -16.3 -14.9a11.78 11.78 0 0 0 -6.7 1.2c-0.24 -2.62 -0.46 -5.3 -0.48 -8 33.7 10.88 67.2 8.54 96.94 -6.68zm2.92 -21.56c-0.28 4.32 0.14 6 -1.48 9.26 -11.62 24 -86.88 17.76 -97.12 4.26 -2.88 -3.78 -2.66 -8.12 -2.84 -13.64a199.16 199.16 0 0 1 1.3 -30C166.52 150.68 174 142.7 180 139.88c0.26 1.44 1.64 6.18 8.96 8 2.76 0.66 5.46 1.38 8.2 1.82 8.46 1.36 22.82 1.72 31.26 0a25.7 25.7 0 0 0 12.38 -5.88 12.42 12.42 0 0 0 3.84 -6.5 14.58 14.58 0 0 0 4.26 3.02c-4.76 3.56 -7.38 7.26 -8.2 11.62a19.26 19.26 0 0 0 0.76 9.02 20.76 20.76 0 0 0 3.44 7.3c4.28 5.64 12.14 10 17.72 5.66 0.22 3.64 1.6 25.56 1.38 28.8zm-5.84 -34c-0.2 -12 4.72 -19.02 16.42 -16.82 1.64 2 3.3 3.86 4.96 5.78a13.68 13.68 0 0 0 -11.54 4.72 17.66 17.66 0 0 0 -3.74 10.98 62 62 0 0 1 -6.08 -4.64zm7.46 5.26a15.86 15.86 0 0 1 4.12 -11.56 12.56 12.56 0 0 1 10.88 -3.56l5.5 6.34a11.12 11.12 0 0 0 -10 3.34 17.64 17.64 0 0 0 -4 10.92c-2.12 -1.6 -6 -4.9 -6.5 -5.48zm7.8 6.58a15.28 15.28 0 0 1 4.22 -11.46 10.38 10.38 0 0 1 9.7 -2.5c1.08 1.24 3.68 4.22 4.68 5.4a14.12 14.12 0 0 0 -12.26 13.68zm7.56 6a26 26 0 0 1 0.88 -4.54 13.86 13.86 0 0 1 2.4 -4.48 14.48 14.48 0 0 1 8.64 -4.64l3.7 4.28a38 38 0 0 0 -9.7 14.22c-1.84 -1.42 -5.3 -4.2 -5.92 -4.7zm73.3 48.26c0 -2.72 0 -4 -0.2 -5.72l0.18 -0.18a7.84 7.84 0 0 0 1.44 0.96 15.22 15.22 0 0 0 -1.42 5.08zm-8.38 -1.3a0.7 0.7 0 0 1 -0.7 -0.28 2.54 2.54 0 0 1 0.18 -2.16 27.68 27.68 0 0 1 4.38 -5.32c1.28 -1.34 2.86 -2.78 4.64 -2.38a1.6 1.6 0 0 1 1.12 2c-0.6 2.6 -7.34 8.2 -9.52 8.28zm12.52 1.18a10.72 10.72 0 0 1 -1.6 2c-0.88 0.76 -1.46 1.08 -1.6 0a6.48 6.48 0 0 1 0.32 -2.36c0.56 -2.26 1.52 -5.42 3.18 -6.74a1.56 1.56 0 0 1 2 -0.2c0.78 0.58 1.06 2.58 -2.3 7.44zM353.78 208a7.06 7.06 0 0 1 3.06 -1.52 7.42 7.42 0 0 1 3.58 0.12c4.88 1.5 6 6.14 7.02 11.18a14 14 0 0 1 -0.56 8.26 7.46 7.46 0 0 1 -5 4.8c1 -2 0.28 -4.98 -2.12 -4.98 -1.68 0 -2.8 1.62 -3.62 3.14a2.24 2.24 0 0 1 -1.26 -0.72c1.58 -1.66 2.78 -3.72 1.12 -5.32a3.66 3.66 0 0 0 -4.3 -0.2c-0.16 -0.48 -0.48 -1.36 -0.6 -1.8 1.02 -0.46 4 -1.86 4 -3.82 0 -1.46 -2.86 -1.64 -4.32 -1.4a15.68 15.68 0 0 1 0.88 -5.74 2.24 2.24 0 0 0 2.12 -1.86zm-7.68 14.16a20.4 20.4 0 0 1 -3.02 0.84c-1.2 0.24 -0.24 -0.62 0.64 -1.48 2.78 -2.74 5.32 -4.82 9.08 -4.82 0.72 0 1.46 0.16 1.2 0.82 -0.58 1.68 -5.82 4.04 -7.9 4.78zm6.5 -14.1a1.16 1.16 0 0 1 -1.78 0.62 6.2 6.2 0 0 1 -1.7 -2c-0.92 -1.32 -3.74 -5.38 -3.04 -7.52a1.26 1.26 0 0 1 0.74 -0.84c0.96 -0.36 1.78 0.8 2.36 1.62 1.04 1.64 3.82 6.06 3.42 8.26zm-24.3 -34.52a2.72 2.72 0 0 0 0.16 -0.92c5.86 1.06 9.6 2.44 13.64 6.8 5.66 6.1 7.34 14.14 8.6 20.78l-0.6 -0.82a5.08 5.08 0 0 0 -2.28 -2 2.2 2.2 0 0 0 -2.52 0.98c-1.24 2 0.74 5.76 1.16 6.5 0.68 1.18 1.42 2.22 2.1 3.2a4.92 4.92 0 0 0 2.14 2 18.24 18.24 0 0 0 -0.84 6 17.02 17.02 0 0 0 -6.5 4.3l-0.46 0.48c-0.92 0.92 -1.6 1.6 -1.48 2.42a1.18 1.18 0 0 0 0.48 0.82 2.68 2.68 0 0 0 2 0 37.08 37.08 0 0 0 6.3 -2.54c0.16 0.56 0.48 1.46 0.64 1.88a40.92 40.92 0 0 0 -4 4c-1.5 1.8 -3.8 4.5 -2.58 6.48 1.64 2.62 6.58 -1.5 8.82 -3.62 0.34 7.6 0 14.6 -5.08 18.34 -6.22 4.58 -19.58 5.56 -26 6s-19.62 0.74 -26.24 -1.42c-4.22 -1.38 -9.5 -5.02 -10.48 -10.72 -0.44 -2.62 -0.28 -38.88 1.26 -44.7 2.98 -11.4 11.26 -24.7 23 -24.7a1.44 1.44 0 0 0 0.22 0.82 10.22 10.22 0 0 0 4.34 2 19.12 19.12 0 0 0 10.56 -0.16 7.22 7.22 0 0 0 3.64 -2.2zm-0.88 -0.54c-2.82 2.32 -7.14 2.96 -12.82 2a9.3 9.3 0 0 1 -3.88 -1.58c0 -0.42 -0.1 -3.3 -0.1 -4.86 3.28 2.84 12.92 4 16.66 0.34 0.02 1.1 0.06 3.38 0.14 4.1zm-1.58 -7.6c1.54 0.92 1.54 1.76 0.2 2.82a11.52 11.52 0 0 1 -8.48 1.46c-5.32 -1 -6.4 -2.18 -6.6 -2.52a0.38 0.38 0 0 1 0 -0.22c0.9 -2.48 11.48 -3.56 14.88 -1.54z'
          stroke-width='2'
        ></path>
        <path
          d='M251.04 184.5a2.56 2.56 0 0 0 -2.5 -2.36 3.8 3.8 0 0 0 -2.76 1.34 2.52 2.52 0 0 0 1.6 4.32 3.64 3.64 0 0 0 3.66 -3.3zm-2 1.56c-0.78 0.6 -2.36 0.8 -2.68 -0.32 -0.56 -2 2.98 -3.48 3.52 -1.34a1.72 1.72 0 0 1 -0.84 1.6z'
          stroke-width='2'
        ></path>
      </g>
    </svg>
  );
}
