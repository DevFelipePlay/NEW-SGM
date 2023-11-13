import { DropzoneOptions, useDropzone } from 'react-dropzone';
//
import { Box, Typography } from '@mui/material';

export function Dropzone(props: DropzoneOptions) {
  const { isDragReject, isDragAccept, isDragActive, acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      onError: () => alert('error'),
      ...props,
    });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: '100%',
        px: 2,
        borderRadius: 2,
        outline: '2px dashed',
        outlineColor: '#007AFF',
        color: isDragReject ? 'error.main' : isDragAccept ? 'success.main' : 'text.secondary',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant='body2'>Solte o arquivo aqui...</Typography>
      ) : acceptedFiles.length ? (
        acceptedFiles.map((file) => (
          <Typography key={file.name} variant='body2'>
            {file.name}
          </Typography>
        ))
      ) : (
        <Typography variant='body2'>
          Arraste e solte o arquivo aqui, ou clique para selecionar
        </Typography>
      )}
    </Box>
  );
}
