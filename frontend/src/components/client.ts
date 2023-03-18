import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { applyIncomingPatches } from "../models/Root";

const socket = io("http://localhost:9001");

export const subToWorkspace = (workspaceId: string) => {
  socket.emit("sub", { workspaceId }, (success: any) => {
    if (success) {
      console.log(`Subscribed to ${workspaceId}`);
    }
  });
};

export const unsubFromWorkspace = (workspaceId: string) => {
  socket.emit("unsub", { workspaceId }, (success: any) => {
    if (success) {
      console.log(`Unsubscribed from ${workspaceId}`);
    }
  });
};

export const submitPatch = (
  workspaceId: string,
  documentId: string,
  patches: any
) => {
  const patchId = uuidv4();
  socket.emit(
    "patch",
    { workspaceId, documentId, patchId, patches },
    (success: any) => {
      if (success) {
        console.log(
          `Patch ${patchId} for document ${documentId} sent to ${workspaceId}`
        );
      }
    }
  );
};

socket.on(
  "patch",
  (data: {
    workspaceId: string;
    documentId: string;
    patchId: string;
    patches: any;
  }) => {
    console.log(
      `Patch ${data.patchId} received for workspace ${data.workspaceId}`
    );
    const { documentId, patches } = data;
    applyIncomingPatches(patches);
    console.log({ documentId, patches });
  }
);
