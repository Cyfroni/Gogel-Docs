import { NonIdealState } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMst } from "../models/Root";
import { subToWorkspace, unsubFromWorkspace } from "../client/client";
import Document from "./Document";
import Sidebar from "./Sidebar";

const App = observer(() => {
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState("");
  const { workspace } = useMst();

  const workspaceId = router.query.workspaceId;

  useEffect(() => {
    if (typeof workspaceId !== "string") return;

    workspace.setName(workspaceId);
    subToWorkspace(workspaceId);
    return () => {
      unsubFromWorkspace(workspaceId);
      workspace.setName("");
    };
  }, [workspaceId]);

  const document = workspace.getDocuments.find((d) => d.id == selectedDocument);

  return (
    <div className="App">
      {document ? (
        <Document document={document} />
      ) : (
        <NonIdealState
          title={
            selectedDocument
              ? "Your document has been deleted, try another one ;)"
              : "Please select a document to collaborate"
          }
        />
      )}
      <Sidebar setSelectedDocument={setSelectedDocument} />
    </div>
  );
});

export default App;
