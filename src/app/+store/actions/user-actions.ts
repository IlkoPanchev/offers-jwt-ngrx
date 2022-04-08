import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/interfaces';
import { ICredentials } from 'src/app/shared/interfaces/credentials';


const namespace = '[USER]';


  export const loginUser = createAction(
    `${namespace} login user`,
    props<{username: string, password: string }>()
  );
  
  export const loginUserSuccess = createAction(
    `${namespace} login user success`,
    props<{ user: IUser }>()
  );
  
  export const loginUserFailure = createAction(
    `${namespace} login user failure`,
    props<{ error: Error }>()
  );
  
  export const loginUserCancel = createAction(
    `${namespace} login user cancel`,
  );

  export const registerUser = createAction(
    `${namespace} register user`,
    props<{username: string; email: string; phone: string, address: string, password: string }>()
  );
  
  export const registerUserSuccess = createAction(
    `${namespace} register user success`,
    props<{ user: IUser }>()
  );
  
  export const registerUserFailure = createAction(
    `${namespace} register user failure`,
    props<{ error: Error }>()
  );
  
  export const registerUserCancel = createAction(
    `${namespace} register user cancel`,
  );

  export const updateUserProfile = createAction(
    `${namespace} update user profile`,
    props<{username: string; email: string; phone: string, address: string, password: string }>()
  );
  
  export const updateUserProfileSuccess = createAction(
    `${namespace} register user success`,
    props<{ user: IUser }>()
  );
  
  export const updateUserProfileFailure = createAction(
    `${namespace} update user profile failure`,
    props<{ error: Error }>()
  );
  
  export const updateUserProfileCancel = createAction(
    `${namespace} update user profile cancel`,
  );

  export const logoutUser = createAction(
    `${namespace} logout user`,
  );

  export const logoutUserSuccess = createAction(
    `${namespace} logout user success`,
  );

  export const logoutUserFailure = createAction(
    `${namespace} logout user failure`,
    props<{ error: Error }>()
  );

  export const getUserProfileInfo = createAction(
    `${namespace} get user profile info`,
  );

  export const getUserProfileInfoSuccess = createAction(
    `${namespace} get user profile info success`,
    props<{user: IUser}>()
  );

  export const getUserProfileInfoFailure = createAction(
    `${namespace} get user profile info failure`,
    props<{ error: Error }>()
  );
  
  
  export const clearAppState = createAction(
    `${namespace} clear app state`,
  );