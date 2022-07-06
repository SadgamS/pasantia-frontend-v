import { Box } from "@mui/material";
import { DataGrid, esES, GridToolbarContainer, GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter } from "@mui/x-data-grid"
export const TableGrid = ({rows, columns, loading}) => {
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
                    sx={{fontSize: 14}}
                    rows={rows} 
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{Toolbar: CustomToolbar}}
                    autoPageSize
                    pagination
                    disableSelectionOnClick
                    getRowHeight={() => 'auto'}
                    loading={loading} 
                />          
            </div>
        </div>
    </div>
  )
}
