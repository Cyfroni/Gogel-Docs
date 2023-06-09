import {
  Button,
  InputGroup,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import { Dispatch, SetStateAction, useRef } from "react";
import { useMst } from "../models/Root";

interface Props {
  setSelectedDocument: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ setSelectedDocument }: Props) => {
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
        >
          <Button
            icon="delete"
            onClick={() => workspace.removeDocument(d.id)}
          />
        </MenuItem>
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
};

export default Sidebar;
