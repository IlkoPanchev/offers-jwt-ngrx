import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { ApplicationState } from '../index';

export const selectApplicationStateUser = (state: ApplicationState) => state.userState;
export const selectApplicationStateOffers = (state: ApplicationState) => state.offersState;
export const selectApplicationStateOffer = (state: ApplicationState) => state.offerState;

export const selectUser = createSelector(
  selectApplicationStateUser,
  state => state.user
);

export const selectOffers = createSelector(
  selectApplicationStateOffers,
  state => state.offers
);

export const selectOffer = createSelector(
  selectApplicationStateOffer,
  state => state.offer
)


