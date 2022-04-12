import { createReducer, on } from '@ngrx/store';
import { IOffer } from '../shared/interfaces/offer';
import { IPageResponse } from '../shared/interfaces/pageResponse';
import { getAllOffersSuccess, searchOffersSuccess, getAllMyOffersSuccess } from './actions/offers-actions';
import {
  getUserProfileInfoFailure,
  getUserProfileInfoSuccess,
  loginUserSuccess,
  logoutUserSuccess,
  registerUserSuccess,
  updateUserProfileSuccess,
} from './actions/user-actions';
import{deleteOfferSuccess, getOfferSuccess} from '../+store/actions/offer-actions'

export interface UserState {
  readonly user: any | null;
}

const initialUserState: UserState = {
  user: undefined,
};

export const userReducer = createReducer(
  initialUserState,
  on(loginUserSuccess, (state, { user }) => ({ ...state, user })),
  on(logoutUserSuccess, () => {
    return { user: null };
  }),
  on(getUserProfileInfoSuccess, (state, { user }) => ({ ...state, user })),
  on(getUserProfileInfoFailure, () => {
    return { user: null };
  }),
  on(registerUserSuccess, (state, { user }) => ({ ...state, user })),
  on(updateUserProfileSuccess, (state, { user }) => ({ ...state, user }))
);

export interface OffersState {
  readonly offers: IPageResponse | undefined;
}

const initialOffersState: OffersState = {
  offers: undefined,
};

export const offersReducer = createReducer(
  initialOffersState,
  on(getAllOffersSuccess, (state, {offers}) => ({ ...state, offers})),
  on(getAllMyOffersSuccess, (state, {offers}) => ({...state, offers})),
  on(searchOffersSuccess, (state, {offers}) => ({...state, offers}))
);

export interface OfferState {
  readonly offer: IOffer | undefined;
}

 const initialOfferState: OfferState = {
  offer: undefined
}

export const offerReducer = createReducer(
  initialOfferState,
  on(getOfferSuccess, (state, {offer}) => ({...state, offer})),
  on(deleteOfferSuccess, ((state) => {
    return {offer: undefined}}))
)
