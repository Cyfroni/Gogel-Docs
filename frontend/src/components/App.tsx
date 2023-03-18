import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMst } from "../models/Root";
import { subToWorkspace, unsubFromWorkspace } from "./client";
import Document from "./Document";
import Sidebar from "./Sidebar";

const App = observer(() => {
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState("");

  const { workspace } = useMst();

  const workspaceId = router.query.workspaceId as string;

  useEffect(() => {
    if (workspaceId == null) return;

    subToWorkspace(workspaceId);
    return () => {
      unsubFromWorkspace(workspaceId);
    };
  }, [workspaceId]);

  const document = workspace.getDocuments.find((d) => d.id == selectedDocument);

  return (
    <div className="App">
      {document && <Document document={document} />}
      <Sidebar setSelectedDocument={setSelectedDocument} />
    </div>
  );
});

export default App;
