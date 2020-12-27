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
    { field: 'name', sortable: true, filter: true },
    { field: 'isbn', sortable: true, filter: true }
  ];

  rowData = [];
  paginationPageSize = 100;
  rowModelType = 'infinite';
  constructor(private api: ApiServiceService) { }

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
      console.log("Page Size" + this.paginationPageSize);
      
      this.api.getAllBooks(this.gridApi.paginationGetPageSize(), this.gridApi.paginationGetCurrentPage()).subscribe(response => {

        params.successCallback(
          response.bookList, response.numberOfItems
        );

      })
    }
  }

  onPaginationChanged(params: any) {
    
  }

}
