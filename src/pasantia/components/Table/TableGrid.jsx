import { Box } from "@mui/material";
import { DataGrid, esES, GridToolbarContainer, GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter } from "@mui/x-data-grid"
export const TableGrid = ({rows, columns, loading, page, rowCount, pageSize, setPage}) => {
    function CustomToolbar() {
        return (
          <GridToolbarContainer >
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector /> 
            <Box flex={1}/>
            <GridToolbarQuickFilter />
          </GridToolbarContainer>     
        );
    }
  return (
    <div style={{ height: 500, width:'100%', marginTop:20}}>
        <div style={{display: 'flex', height: '100%'}}>
            <div style={{flexGrow: 1}}>
                <DataGrid 
                    sx={{fontSize: 14,
                        '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                          py: 1,
                        },
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                          py: '13px',
                        },
                        '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                          py: '17px',
                        },}}
                    rows={rows} 
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{Toolbar: CustomToolbar}}
                    paginationMode="server"
                    page={page}
                    autoHeight
                    rowsPerPageOptions={[5]}
                    pageSize={pageSize}
                    pagination
                    disableSelectionOnClick
                    getRowHeight={() => 'auto'}
                    rowCount={rowCount}   
                    onPageChange={(newPage) => setPage(newPage)}
                    loading={loading} 
                />          
            </div>
        </div>
    </div>
  )
}
