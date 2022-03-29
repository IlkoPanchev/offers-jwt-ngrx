import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/shared/interfaces";
import { IPageResponse } from "src/app/shared/interfaces/pageResponse";

const namespace = '[OFFERS]';

export const getAllOffers = createAction(
    `${namespace} get all offers`,
    props<{page: number, pageSize: number}>()
);

export const getAllOffersSuccess = createAction(
    `${namespace} get all offers success`,
    props<{offers: IPageResponse}>()
);

export const getAllOffersFailure = createAction(
    `${{namespace}} get all offers failure`,
    props<{error: Error}>()
);

export const getAllMyOffers = createAction(
    `${namespace} get all my offers`,
    props<{userId: number, page: number, pageSize: number}>()
);

export const  getAllMyOffersSuccess = createAction(
    `${namespace} get all my offers success`,
    props<{offers: IPageResponse}>()
);

export const getAllMyOffersFailure = createAction(
    `${namespace} get all my offers failure`,
    props<{error: Error}>()
);

export const searchOffers = createAction(
    `${namespace} search offers`,
   props<{keyword: string, page: number, pageSize: number}>()
)

export const searchOffersSuccess = createAction(
    `${namespace} search offer success`,
    props<{offers: IPageResponse}>()
)

export const searchOffersFailure = createAction(
    `${namespace} search offer failure`,
    props<{error : Error}>()
)

