import React, { useState } from 'react';
import './TreeNode.css';

type TreeNodeType = {
  id: string;
  name: string;
  children?: TreeNodeType[];
};

type TreeNodeProps = {
  node: TreeNodeType;
  onAdd: (parentId: string, name: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, onAdd, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleAdd = () => {
      onAdd(node.id, "name");
  };

  const handleDelete = () => {
    onDelete(node.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newName.trim() === '') {
      alert('Имя узла не может быть пустым');
      return;
    }
    onEdit(node.id, newName);
    setIsEditing(false);
  };

  return (
    <div className="tree-node">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span onClick={handleEdit}>{node.name}</span>
      )}
      <div className="controls">
        <button onClick={handleAdd}>+</button>
        <button onClick={handleDelete}>-</button>
      </div>
      {node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;