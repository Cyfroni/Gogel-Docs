import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import { subToWorkspace, unsubFromWorkspace } from "./client";

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

  const params = new URLSearchParams("workspaceId=my-workspace");

  return (
    <div className="App">
      {workspaceId}
      <button onClick={() => setSearchParams(params)}>click me</button>
    </div>
  );
}

export default App;
