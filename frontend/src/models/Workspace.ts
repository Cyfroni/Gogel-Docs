import { types } from "mobx-state-tree";

export const Workspace = types
  .model({
    name: types.string,
    documents: types.array(types.string),
  })
  .actions((self) => ({
    addDocument(document: string) {
      self.documents.push(document);
    },
    removeDocument(document: string) {
      self.documents.remove(document);
    },
  }))
  .views((self) => ({
    get getDocuments() {
      return self.documents;
    },
  }));
