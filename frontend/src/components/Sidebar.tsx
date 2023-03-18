import {
  Button,
  InputGroup,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { useMst } from "../models/Root";

const Sidebar = observer(({ setSelectedDocument }) => {
  const { workspace } = useMst();
  const newDocumentRef = useRef();

  console.log(newDocumentRef);

  return (
    <Menu>
      <MenuDivider title="Documents" />
      {workspace.getDocuments.map((d) => (
        <MenuItem
          icon="document"
          onClick={() => setSelectedDocument(d.id)}
          text={d.name}
        />
      ))}
      <div style={{ display: "flex" }}>
        <InputGroup inputRef={newDocumentRef} />
        <Button
          icon="add"
          onClick={() => workspace.addDocument(newDocumentRef.current.value)}
        />
      </div>
    </Menu>
  );
});

export default Sidebar;
