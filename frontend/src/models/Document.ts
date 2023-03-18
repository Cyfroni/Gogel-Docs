import { types } from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";
import { DocumentRow } from "./DocumentRow";

export const Document = types
  .model({
    id: types.string,
    name: types.string,
    data: types.array(DocumentRow),
  })
  .actions((self) => ({
    addRow(key: string, value: string) {
      self.data.push({
        id: uuidv4(),
        key,
        value,
      });
    },
    removeRow(id: string) {
      const elemToRemove = self.data.find((e) => e.id === id);
      self.data.remove(elemToRemove);
    },
    swapRows(id1: string, id2: string) {
      const elem1 = self.data.findIndex((e) => e.id === id1);
      const elem2 = self.data.findIndex((e) => e.id === id2);
      const tmp = self.data[elem1];
      self.data[elem1] = self.data[elem2];
      self.data[elem2] = tmp;
    },
  }))
  .views((self) => ({
    get rows() {
      return self.data;
    },
  }));
