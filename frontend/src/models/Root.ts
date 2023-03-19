import { applyPatch, Instance, onPatch, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { submitPatch } from "../client/client";
import { Workspace } from "./Workspace";

const RootModel = types.model({
  workspace: Workspace,
});

let initialState = RootModel.create({
  workspace: {
    name: "",
    documents: [],
  },
});

export const rootStore = initialState;

let inPatching = false;

onPatch(rootStore, (patch) => {
  console.info("Got change: ", patch);
  if (!inPatching) {
    submitPatch(rootStore.workspace.name, patch);
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
