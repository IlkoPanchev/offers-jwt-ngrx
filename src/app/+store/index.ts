import { ActionReducerMap } from "@ngrx/store";
import { userReducer, offersReducer, UserState, OffersState, offerReducer, OfferState } from "./reducers";

export interface ApplicationState {
  readonly userState: UserState,
  readonly offersState: OffersState,
  readonly offerState: OfferState
}

export const reducers: ActionReducerMap<ApplicationState> = {
  userState: userReducer,
  offersState: offersReducer,
  offerState: offerReducer
}


