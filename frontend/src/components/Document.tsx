import { Button, InputGroup } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import DocumentRow from "./DocumentRow";

const DocumentNode = observer(({ doc }) => {
  const newRowKeyRef = useRef();
  const newRowValueRef = useRef();

  return (
    <div>
      {doc.rows?.map((row, ind) => (
        <DocumentRow row={row} ind={ind} document={doc} />
      ))}
      <div style={{ display: "flex" }}>
        <InputGroup inputRef={newRowKeyRef} />
        <InputGroup inputRef={newRowValueRef} />
        <Button
          icon="add"
          onClick={() =>
            doc.addRow(newRowKeyRef.current.value, newRowValueRef.current.value)
          }
        />
      </div>
    </div>
  );
});

export default DocumentNode;
