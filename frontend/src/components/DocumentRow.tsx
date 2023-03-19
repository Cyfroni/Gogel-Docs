import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { IDocument } from "../models/Document";
import { IDocumentRow } from "../models/DocumentRow";

const DocumentRow = observer(
  ({
    ind,
    row,
    document,
  }: {
    ind: number;
    row: IDocumentRow;
    document: IDocument;
  }) => {
    const rowKeyRef = useRef<HTMLInputElement>();
    const rowValueRef = useRef<HTMLInputElement>();

    // console.log(document);
    // console.log(row);

    return (
      <div className="flex">
        {/* {row.key}
        {row.value} */}
        <InputGroup
          key={row.key}
          defaultValue={row.key}
          inputRef={rowKeyRef}
          onBlur={() => row.update(rowKeyRef.current.value, row.value)}
        />
        <InputGroup
          key={row.value}
          defaultValue={row.value}
          inputRef={rowValueRef}
          onBlur={() => row.update(row.key, rowValueRef.current.value)}
        />
        <ButtonGroup>
          <Button
            icon="arrow-up"
            disabled={ind === 0}
            onClick={() => document.swapRows(ind, ind - 1)}
          />
          <Button
            icon="arrow-down"
            disabled={ind === document.rows.length - 1}
            onClick={() => document.swapRows(ind, ind + 1)}
          />
          <Button icon="delete" onClick={() => document.removeRow(row.id)} />
        </ButtonGroup>
      </div>
    );
  }
);

export default DocumentRow;
