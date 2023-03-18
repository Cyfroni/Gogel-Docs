import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import DocumentRow from "./DocumentRow";

const Document = (document) => {
  return (
    <div>
      {document.data?.map((row) => {
        <DocumentRow row={row} />;
      })}
      <div style={{ display: "flex" }}>
        <InputGroup />
        <InputGroup />
        <ButtonGroup>
          <Button icon="add" />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Document;
