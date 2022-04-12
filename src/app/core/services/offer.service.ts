import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffer } from 'src/app/shared/interfaces/offer';
import { IPageResponse } from 'src/app/shared/interfaces/pageResponse';

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) {}

  getOffer(id: number) {
    const result$ =  this.http.get<IOffer>(`/api/offers/${id}`);
    return result$;
  }


  addOffer(data: Object): Observable<IOffer> {
    const result$ = this.http.post<IOffer>(`/api/offers`, data);
    return result$;
  }


  editOffer(id: number, data: Object): Observable<IOffer> {
    const result$ = this.http.put<IOffer>(`/api/offers/${id}`, data);
    return result$;
  }

  deleteOffer(id: number){
    const result$ = this.http.delete(`/api/offers/${id}`);
    return result$;
  }


  loadOffersPagination(page: number, pageSize: number) {
    const result$ =  this.http.get<IPageResponse>(`/api/offers?page=${page - 1}&pageSize=${pageSize}`);
    return result$;
  }


  loadOffersByUserPagination(userId: number, page = 1, pageSize: number) {
    const result$ =  this.http.get<IPageResponse>(
      `/api/offers?ownerId=${userId}&page=${page - 1}&pageSize=${pageSize}`);
      return result$;
  }

  loadOffersByKeywordPagination(keyword: string = '', page = 1, pageSize: number) {
    const result$ = this.http.get<IPageResponse>(
      `/api/offers?keyword=${keyword}&page=${page - 1}&pageSize=${pageSize}`);
      return result$;
  }


}
