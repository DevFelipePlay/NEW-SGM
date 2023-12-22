import { alpha, useTheme } from '@mui/material';
import MUIDataTable, { MUIDataTableProps, debounceSearchRender } from 'mui-datatables';
import { Loading } from '..';
import { FlexBox } from '../FlexBox';
import { textLabelsPtBr } from './config';

export interface MUIDataTableCustomProps extends MUIDataTableProps {
  loading?: boolean;
}

/**
 * Uma MUIDataTable com algumas customizações padrões.
 * @version 1.0.0
 */
export function MUIDataTableCustom({ options, loading, ...props }: MUIDataTableCustomProps) {
  const { palette } = useTheme();

  return (
    <FlexBox
      sx={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        '& .tss-11quiee-MUIDataTable-paper': { display: 'grid' },
      }}
    >
      {loading && (
        <FlexBox
          sx={{
            zIndex: 1,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            color: palette.primary.dark,
            bgcolor: alpha(palette.primary.contrastText, 0.5),
          }}
        >
          <Loading />
        </FlexBox>
      )}
      <MUIDataTable
        options={{
          viewColumns: false,
          download: false,
          filter: false,
          elevation: 0,
          responsive: 'standard',
          selectableRows: 'none',
          textLabels: { ...textLabelsPtBr, ...options?.textLabels },
          rowsPerPageOptions: [10, 25, 50, 75, 100],
          customSearchRender: debounceSearchRender(300),
          ...options,
        }}
        {...props}
      />
    </FlexBox>
  );
}
