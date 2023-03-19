import {
  Button,
  InputGroup,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useRef } from "react";
import { useMst } from "../models/Root";

const Sidebar = observer(
  ({
    setSelectedDocument,
  }: {
    setSelectedDocument: Dispatch<SetStateAction<string>>;
  }) => {
    const { workspace } = useMst();
    const newDocumentRef = useRef<HTMLInputElement>();

    return (
      <Menu>
        <MenuDivider title="Documents" />
        {workspace.getDocuments.map((d) => (
          <MenuItem
            key={d.id}
            icon="document"
            onClick={() => setSelectedDocument(d.id)}
            text={d.name}
          />
        ))}
        <div className="flex">
          <InputGroup inputRef={newDocumentRef} />
          <Button
            icon="add"
            onClick={() => workspace.addDocument(newDocumentRef.current.value)}
          />
        </div>
      </Menu>
    );
  }
);

export default Sidebar;
