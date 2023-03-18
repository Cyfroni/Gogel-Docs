import { useEffect } from "react";
import { useRouter } from "next/router";
import { subToWorkspace, unsubFromWorkspace } from "./client";
import { useMst } from "../models/Root";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";

const workspaces = ["my-workspace-1", "my-workspace-2", "my-workspace-3"];

const App = observer(() => {
  const router = useRouter();

  const { workspace } = useMst();

  const workspaceId = router.query.workspaceId as string;

  useEffect(() => {
    if (workspaceId == null) return;

    subToWorkspace(workspaceId);
    return () => {
      unsubFromWorkspace(workspaceId);
    };
  }, [workspaceId]);

  return (
    <div className="App">
      {workspaces.map((wId) => (
        <button key={wId} onClick={() => router.push(`?workspaceId=${wId}`)}>
          {wId}
        </button>
      ))}
      <div>
        {workspaceId}
        {workspaceId && (
          <button onClick={() => workspace.addDocument("123")}>Patch</button>
        )}
      </div>
      <div>
        {workspace.getDocuments.map((d) => (
          <span>{d}</span>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <InputGroup />
        <InputGroup />
        <ButtonGroup>
          <Button icon="arrow-down" />
          <Button icon="arrow-up" />
          <Button icon="delete" />
        </ButtonGroup>
      </div>
      <div style={{ display: "flex" }}>
        <InputGroup />
        <InputGroup />
        <ButtonGroup>
          <Button icon="add" />
        </ButtonGroup>
      </div>
    </div>
  );
});

export default App;
