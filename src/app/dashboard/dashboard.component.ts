import { Component, OnInit } from '@angular/core';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ApiServiceService } from '../api-service.service';
import { ImageFormatterComponent } from '../ImageFormatterComponent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;  

  columnDefs = [
    { field: 'name', sortable: true, filter: true , flex: 1, minWidth: 100},
    { field: 'isbn', sortable: true, filter: true , flex: 1, minWidth: 100},
    { valueGetter: this.nameParser , flex: 1, minWidth: 100, headerName: 'Author'},
    { field: 'imageUrl' , autoHeight: true, flex: 1, minWidth: 100, headerName: 'Image', cellRendererFramework: ImageFormatterComponent},
  ];

  rowData = [];
  rowModelType = 'infinite';
  defaultPageSize = 10;
  
  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.dataSource);
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {      
      this.api.getAllBooks(this.gridApi.paginationGetPageSize(), this.gridApi.paginationGetCurrentPage()).subscribe(response => {
        params.successCallback(
          response.bookList, response.numberOfItems
        );
      })
    }
  }

  onPageSizeChanged(event: any) {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

  nameParser(params:any) {
    if (params.data != null) {
      return params.data.author.firstName+" "+params.data.author.lastName;
    }
    return "";
  }

}
