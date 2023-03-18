import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useRef } from "react";

const DocumentRow = observer(({ ind, row, document }) => {
  const rowKeyRef = useRef();
  const rowValueRef = useRef();

  // console.log(document);
  // console.log(row);

  return (
    <div style={{ display: "flex" }}>
      <InputGroup defaultValue={row.key} inputRef={rowKeyRef} />
      <InputGroup defaultValue={row.value} inputRef={rowValueRef} />
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
});

export default DocumentRow;
