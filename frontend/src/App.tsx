import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import { submitPatch, subToWorkspace, unsubFromWorkspace } from "./client";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");

  useEffect(() => {
    if (workspaceId == null) return;

    subToWorkspace(workspaceId);
    return () => {
      unsubFromWorkspace(workspaceId);
    };
  }, [workspaceId]);

  const workspaces = ["my-workspace-1", "my-workspace-2", "my-workspace-3"];
  return (
    <div className="App">
      <div>
        {workspaceId}
        {workspaceId && (
          <button
            onClick={() => submitPatch(workspaceId, "123", { abc: "qwe" })}
          >
            Patch
          </button>
        )}
      </div>
      {workspaces.map((wId) => (
        <button
          onClick={() =>
            setSearchParams(new URLSearchParams(`workspaceId=${wId}`))
          }
        >
          {wId}
        </button>
      ))}
    </div>
  );
}

export default App;
