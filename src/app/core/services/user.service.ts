import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IUser } from "src/app/shared/interfaces/user";



@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(data: { username: string; password: string }) {
    const result$ = this.http.post<IUser>(`/api/users/login`, data);
    return  result$;
  }


  register(data: { username: string; email: string; phone: string, address: string, password: string }) {
    const result$ = this.http.post<IUser>(`/api/users/register`, data);
    return result$;
  }

  getProfileInfo() {
    const result$ =  this.http.get<IUser>(`/api/users/profile`);
    return result$;
  }

  logout() {
    const result$ = this.http.post<IUser>(`/api/users/logout`, {});
    return result$;
  }

  updateProfile(data: { email: string; phone: string, address: string, password: string}) {
    const result$ = this.http.put<IUser>(`/api/users/profile`, data);
    return result$;
  }

}
