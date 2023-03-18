import { uniqueId } from "@blueprintjs/core/lib/esm/common/utils";
import { types } from "mobx-state-tree";
import { Document } from "./Document";
import { v4 as uuidv4 } from "uuid";

export const Workspace = types
  .model({
    name: types.string,
    documents: types.array(Document),
  })
  .actions((self) => ({
    addDocument(name: string) {
      self.documents.push({
        id: uuidv4(),
        name,
        data: [],
      });
    },
    removeDocument(id: string) {
      const elemToRemove = self.documents.find((e) => e.id === id);
      self.documents.remove(elemToRemove);
    },
  }))
  .views((self) => ({
    get getDocuments() {
      return self.documents;
    },
  }));
