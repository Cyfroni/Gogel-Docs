import { useEffect } from "react";
import { useRouter } from "next/router";
import { subToWorkspace, unsubFromWorkspace } from "./client";
import { useMst } from "../models/Root";
import { observer } from "mobx-react-lite";

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

  // const nodes: TreeNodeInfo[] = [
  //   {
  //     id: 0,
  //     hasCaret: true,
  //     icon: "folder-close",
  //     label: <span>123</span>,
  //   },
  // ];

  return (
    <div className="App">
      {/* {store.m} */}
      <div>
        {workspaceId}
        {workspaceId && (
          // <button onClick={() => {}}>Patch</button>
          <button onClick={() => workspace.addDocument("123")}>Patch</button>
          // <button
          //   onClick={() => submitPatch(workspaceId, "123", { abc: "qwe" })}
          // >
          //   Patch
          // </button>
        )}
      </div>
      <div>
        {workspace.getDocuments.map((d) => (
          <span>{d}</span>
        ))}
      </div>
      {workspaces.map((wId) => (
        <button
          key={wId}
          onClick={() =>
            // setSearchParams(new URLSearchParams(`workspaceId=${wId}`))
            router.push(`?workspaceId=${wId}`)
          }
        >
          {wId}
        </button>
      ))}
    </div>
  );
});

export default App;
