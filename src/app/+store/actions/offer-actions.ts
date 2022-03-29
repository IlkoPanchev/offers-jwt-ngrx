import { createAction, props } from "@ngrx/store"
import { IOffer } from "src/app/shared/interfaces/offer"


const namespace = '[OFFER]'

export const getOffer = createAction(
    `${namespace} get offer`,
    props<{id: number}>()
)

export const getOfferSuccess = createAction(
    `${namespace} get offer success`,
    props<{offer: IOffer}>()
)

export const getOfferFailure = createAction(
    `${namespace} get offer failure`,
    props<{error: Error}>()
)

export const deleteOffer = createAction(
    `${namespace} delete offer`,
    props<{id: number}>()
)

export const deleteOfferSuccess = createAction(
    `${namespace} delete offer success`
)

export const deleteOfferFailure = createAction(
    `${namespace} delete offer failure`,
    props<{error: Error}>()
)

export const editOffer = createAction(
    `${namespace} edit offer`,
    props<{id: number, data: Object}>()
)

export const editOfferSuccess = createAction(
    `${namespace} edit offer success`,
    props<{offer: IOffer}>()
)

export const editOfferFailure = createAction(
    `${namespace} edit offer failure`,
    props<{error: Error}>()
)

export const addOffer = createAction(
    `${namespace} add offer`,
    props<{data: Object}>()
)

export const addOfferSuccess = createAction(
    `${namespace} add offer success`,
    props<{offer: IOffer}>()
)

export const addOfferFailure = createAction(
    `${namespace} add offer failure`,
    props<{error: Error}>()
)