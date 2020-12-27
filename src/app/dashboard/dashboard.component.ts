import { Component, OnInit } from '@angular/core';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;
  

  columnDefs = [
    { field: 'id', sortable: true, filter: true, flex: 1, minWidth: 100},
    { field: 'name', sortable: true, filter: true , flex: 1, minWidth: 100},
    { field: 'isbn', sortable: true, filter: true , flex: 1, minWidth: 100},
    { field: 'imageUrl', width: '500' , flex: 1, minWidth: 100}
  ];

  rowData = [];
  rowModelType = 'infinite';
  defaultPageSize = 10;
  constructor(private api: ApiServiceService) {   
    
  }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    console.log("Reading Data");
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.dataSource);
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log("Page Size" + this.gridApi.paginationGetPageSize());
      
      this.api.getAllBooks(this.gridApi.paginationGetPageSize(), this.gridApi.paginationGetCurrentPage()).subscribe(response => {

        params.successCallback(
          response.bookList, response.numberOfItems
        );

      })
    }
  }
}
