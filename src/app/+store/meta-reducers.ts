import { ActionReducer, Action, MetaReducer } from "@ngrx/store";
import { ApplicationState } from ".";
import { clearAppState } from "./actions/user-actions";

export function clearAppStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: ApplicationState, action: Action) {
    if (action.type === clearAppState.type) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearAppStateMetaReducer];