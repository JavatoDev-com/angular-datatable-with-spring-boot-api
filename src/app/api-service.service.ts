import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private client: HttpClient) {}

  getAllBooks(pageSize: Number, pageNumber: Number): Observable<any> {
    let url = "http://localhost:8081/api/library/book/search?size="+pageSize+"&page="+pageNumber;
    console.log("Reading from URL : "+url);
    return this.client.get(url);
  }
  
}
