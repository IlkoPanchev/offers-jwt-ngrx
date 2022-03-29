import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginUser,
  loginUserCancel,
  loginUserFailure,
  loginUserSuccess,
  clearAppState,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
  getUserProfileInfo,
  getUserProfileInfoSuccess,
  getUserProfileInfoFailure,
  registerUserSuccess,
  registerUserCancel,
  registerUserFailure,
  registerUser,
  updateUserProfile,
  updateUserProfileFailure,
  updateUserProfileSuccess,
} from '../actions/user-actions';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ICredentials } from 'src/app/shared/interfaces/credentials';
import { pipe } from 'rxjs';

@Injectable()
export class UserEffects {
  //   increment = createEffect(() => this.actions$.pipe(
  //     ofType(setValue), //same as -> filter(action => action.type === setValue.type)
  //     map(action => {
  //       console.log(action);
  //       return incrementCounter();
  //     })
  //   ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        this.userService.login({ username: action.username, password: action.password }).pipe(
          takeUntil(this.actions$.pipe(ofType(loginUserCancel))),
          map((user) => {
            this.router.navigate(['/offer/all-offers']);
            return loginUserSuccess({user});
          }),
          catchError((error) => [loginUserFailure({ error })])
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap((action) =>
        this.userService.register({
          username: action.username,
          email: action.email,
          phone: action.phone,
          address: action.address,
          password: action.password
        }).pipe(
          takeUntil(this.actions$.pipe(ofType(registerUserCancel))),
          map((user) => {
            this.router.navigate(['/offer/all-offers']);
            return registerUserSuccess({ user })
          }),
          catchError((error) => [registerUserFailure({ error })])
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      switchMap((action) =>
        this.userService.logout().pipe(
          map(() => {
            this.router.navigate(['/user/login']);
            return logoutUserSuccess();
          }),
          catchError((error) => [logoutUserFailure({ error })])
        )
      )
    )
  );

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileInfo),
      switchMap(() =>
        this.userService.getProfileInfo().pipe(
          map((user) => {
            return getUserProfileInfoSuccess({ user })
          }),
          catchError((error) => [getUserProfileInfoFailure({ error })])
        )
      )
    ));

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserProfile),
      switchMap((action) =>
        this.userService.updateProfile({
          email: action.email,
          phone: action.phone,
          address: action.address,
          password: action.password
        }).pipe(
          map((user) => {
            return updateUserProfileSuccess({ user })
          }),
          catchError((error) => [updateUserProfileFailure({ error })])
        )
      )
    ));

 


}
