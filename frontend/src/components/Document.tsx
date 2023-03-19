import { Button, InputGroup } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { IDocument } from "../models/Document";
import DocumentRow from "./DocumentRow";

interface Props {
  document: IDocument;
}

const Document = observer(({ document }: Props) => {
  const newRowKeyRef = useRef<HTMLInputElement>();
  const newRowValueRef = useRef<HTMLInputElement>();

  return (
    <div>
      <span>Document: {document.name}</span>
      {document.rows?.map((row, ind) => (
        <DocumentRow key={row.id} row={row} ind={ind} document={document} />
      ))}
      <div className="flex">
        <InputGroup inputRef={newRowKeyRef} />
        <InputGroup inputRef={newRowValueRef} />
        <Button
          icon="add"
          onClick={() =>
            document.addRow(
              newRowKeyRef.current.value,
              newRowValueRef.current.value
            )
          }
        />
      </div>
    </div>
  );
});

export default Document;
