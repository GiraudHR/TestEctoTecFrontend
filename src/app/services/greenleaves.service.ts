import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress, IGreenLeavesRequest, IGreenLeavesResponse } from '../model/igreenleaves';

@Injectable({
  providedIn: 'root'
})
export class GreenleavesService {

  private apiURL = `${environment.URL}GreenLeaves`;

  constructor(
    private http: HttpClient
  ) { }

  public GetAddress(address: string): Observable<IAddress[]>{
    return this.http.get<IAddress[]>(`${this.apiURL}/GetAddress?address=${address}`);
  }

  public SendEmai(data: IGreenLeavesRequest): Observable<IGreenLeavesResponse>{
    return this.http.post<IGreenLeavesResponse>(`${this.apiURL}/SendEmail`,data);
  }
}
