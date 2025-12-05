import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //  para não precisar mais de ser via construtor
import { Observable } from 'rxjs';
import { Camisa } from '../model/camisa';

@Injectable({
  providedIn: 'root'
})

export class CamisasService {
  private readonly httpClient = inject(HttpClient);
  private readonly API = 'http://localhost:3000/camisas';

  list(): Observable<Camisa[]> {
    return this.httpClient.get<Camisa[]>(this.API);
  }

  save(camisa: Partial<Camisa>): Observable<Camisa> {
    return this.httpClient.post<Camisa>(this.API, camisa);
  }

  loadById(id: string): Observable<Camisa> {
    return this.httpClient.get<Camisa>(`${this.API}/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`);
  }

  update(id: string, camisa: Partial<Camisa>): Observable<Camisa> {
    return this.httpClient.put<Camisa>(`${this.API}/${id}`, camisa);
  }
}
