import { Pagination, PaginationItem } from '@mui/material';
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
export const TableGrid = ({
  rows,
  columns,
  loading,
  page,
  rowCount,
  pageSize,
  setPage,
}) => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination 
      color="primary"
      shape='rounded'
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    )
  }
  return (
    <div style={{ height: 500, width: '100%', marginTop: 20 }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            sx={{
              fontSize: 14,
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                py: 1,
              },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                py: '13px',
              },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                py: '17px',
              },
            }}
            rows={rows}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{ 
              Toolbar: CustomToolbar,
              Pagination: CustomPagination
            }}
            paginationMode="server"
            page={page}
            autoHeight
            rowsPerPageOptions={[5]}
            pageSize={pageSize}
            disableSelectionOnClick
            getRowHeight={() => 'auto'}
            rowCount={rowCount}
            onPageChange={(newPage) => setPage(newPage)}
            loading={loading}
            disableColumnFilter
          />
        </div>
      </div>
    </div>
  );
};
