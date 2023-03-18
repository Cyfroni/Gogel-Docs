import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";

const DocumentRow = (row) => {
  return (
    <div style={{ display: "flex" }}>
      <InputGroup value={row.key} />
      <InputGroup value={row.value} />
      <ButtonGroup>
        <Button icon="arrow-down" />
        <Button icon="arrow-up" />
        <Button icon="delete" />
      </ButtonGroup>
    </div>
  );
};

export default DocumentRow;
