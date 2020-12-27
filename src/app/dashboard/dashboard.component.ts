import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  columnDefs = [
    { field: 'id', sortable: true, filter: true, maxWidth: 75},
    { field: 'name', sortable: true, filter: true },
    { field: 'isbn', sortable: true, filter: true  }
  ];

  rowData = [];
  paginationPageSize = 10;
  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
    this.api.getAllBooks(10, 0).subscribe(data=>{
      this.rowData = data.bookList;
    });
  }

}
