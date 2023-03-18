import { types } from "mobx-state-tree";

export const DocumentRow = types
  .model({
    id: types.string,
    key: types.string,
    value: types.string,
  })
  .actions((self) => ({
    update(key: string, value: string) {
      self.key = key;
      self.value = value;
    },
  }));
