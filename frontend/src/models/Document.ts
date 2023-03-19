import { detach, Instance, types } from "mobx-state-tree";
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
    swapRows(ind1: number, ind2: number) {
      self.data.splice(ind2, 0, detach(self.data[ind1]));
    },
  }))
  .views((self) => ({
    get rows() {
      return self.data;
    },
  }));

export interface IDocument extends Instance<typeof Document> {}
