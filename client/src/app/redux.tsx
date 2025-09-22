"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import { combineScaleFunction } from "recharts/types/state/selectors/axisSelectors";
import globalReducer from "@/app/state";

const rootReducer = combineReducers({
  global: globalReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Provider

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}
