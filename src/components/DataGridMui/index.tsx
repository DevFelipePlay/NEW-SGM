//@ts-ignore
import XLSX from 'xlsx';
//
import { MenuItem } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridApi,
  GridCsvExportMenuItem,
  GridExportMenuItemProps,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarQuickFilter,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  ptBR,
  useGridApiContext,
} from '@mui/x-data-grid';
import React from 'react';

type DataGridMuiType = {
  hideExport?: boolean;
  fileName?: string;
  exportIgnoredFields?: string[];
} & DataGridProps;

export function DataGridMui({
  sx,
  hideExport,
  fileName,
  exportIgnoredFields,
  loading,
  ...props
}: DataGridMuiType) {
  return (
    <DataGrid
      sx={{
        bgcolor: 'background.paper',
        height: 600,
        '& .error': {
          bgcolor: 'error.dark',
          color: 'background.default.contrastText',
          '&:hover': { bgcolor: 'error.light' },
        },
        '& .success': {
          bgcolor: 'success.dark',
          color: 'success.contrastText',
          '&:hover': { bgcolor: 'success.light' },
        },
        '& .warning': {
          bgcolor: 'warning.dark',
          color: 'warning.contrastText',
          '&:hover': { bgcolor: 'warning.light' },
        },
        ...sx,
      }}
      components={{
        Toolbar: () => (
          <GridToolbarContainer>
            {!hideExport && (
              <GridToolbarExportContainer color='inherit' disabled={loading}>
                <ExcelExportMenuItem
                  fileName={fileName}
                  exportIgnoredFields={exportIgnoredFields}
                />
                <GridCsvExportMenuItem options={{ fileName: fileName }} />
              </GridToolbarExportContainer>
            )}
            <GridToolbarQuickFilter sx={{ width: '100%' }} debounceMs={200} />
          </GridToolbarContainer>
        ),
      }}
      loading={loading}
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      disableVirtualization
      //@ts-ignore
      disableSelectionOnClick
      rowsPerPageOptions={[25]}
      pageSize={25}
      {...props}
    />
  );
}

interface IExcelExportMenuItem extends GridExportMenuItemProps<{}> {
  fileName?: string;
  exportIgnoredFields?: string[];
}

function ExcelExportMenuItem(props: IExcelExportMenuItem) {
  const apiRef = useGridApiContext();

  const { fileName, exportIgnoredFields, hideMenu } = props;
  let fileNameSliced = fileName?.slice(0, 31);

  function getJson(apiRef: React.MutableRefObject<GridApi>) {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Define cada item do array
    const tableRows: { [key: string]: any }[] = filteredSortedRowIds.map((id) => {
      const row: { [key: string]: any } = {};

      //Define as keys e values do object
      visibleColumnsField.forEach((field) => {
        if (field === 'actions' || exportIgnoredFields?.includes(field)) return;
        let cellHeaderName =
          apiRef.current.getCellParams(id, field).colDef.headerName ||
          apiRef.current.getCellParams(id, field).colDef.field;
        let cellFormattedValue = apiRef.current.getCellParams(id, field).formattedValue;
        row[cellHeaderName] = cellFormattedValue;
      });

      return row;
    });

    return tableRows;
  }

  function handleExport() {
    const pathname = document.location.hash
      .slice(2)
      .split('/')
      .reverse()
      .join('/')
      .replace(/[\/\?]/g, '.')
      .slice(0, 31);

    const json = getJson(apiRef);

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(json);

    XLSX.utils.book_append_sheet(wb, ws, fileNameSliced || pathname);

    XLSX.writeFile(wb, `${fileNameSliced || pathname}.xlsx`);

    hideMenu?.();
  }

  return (
    <MenuItem sx={{ color: 'success.main' }} onClick={handleExport}>
      Exportar Excel
    </MenuItem>
  );
}
