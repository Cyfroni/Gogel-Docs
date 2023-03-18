import {
  applyPatch,
  Instance,
  onPatch,
  onSnapshot,
  types,
} from "mobx-state-tree";
import { createContext, useContext } from "react";
import { submitPatch } from "../components/client";
import { Workspace } from "./Workspace";

const RootModel = types.model({
  workspace: Workspace,
});

let initialState = RootModel.create({
  workspace: {
    name: "123",
    documents: [],
  },
});

// if (process.browser) {
//   const data = localStorage.getItem("rootState");
//   if (data) {
//     const json = JSON.parse(data);
//     if (RootModel.is(json)) {
//       initialState = RootModel.create(json);
//     }
//   }
// }

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

let inPatching = false;

onPatch(rootStore, (patch) => {
  console.info("Got change: ", patch);
  if (!inPatching) {
    submitPatch("my-workspace-1", "", patch);
  }
});

export const applyIncomingPatches = (patch) => {
  inPatching = true;
  applyPatch(rootStore, patch);
  inPatching = false;
};

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
