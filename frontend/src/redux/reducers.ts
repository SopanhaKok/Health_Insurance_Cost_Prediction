import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import counter from "redux/slices/counter";
import settings from "redux/slices/setting";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["settings"],
};

export const rootReducer = combineReducers({ counter, settings });

export type RootState = ReturnType<typeof rootReducer>;
