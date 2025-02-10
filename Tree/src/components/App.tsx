import React, { useState } from 'react';
import TreeNode from './TreeNode/TreeNode';
import './App.css';

type TreeNodeType = {
  id: string;
  name: string;
  children: TreeNodeType[];
};
const initialTrees: TreeNodeType = {
  id: 'root',
  name: 'Root',
  children: [],
};

const initialTree: TreeNodeType = {
  id: 'root',
  name: 'Root',
  children: [],
};

const App: React.FC = () => {
  const [tree, setTree] = useState<TreeNodeType>(initialTree);

  const addNode = (parentId: string, name: string) => {
    const newNode: TreeNodeType = {
      id: `${parentId}-${Date.now()}`,
      name,
      children: [],
    };

    const traverseAndAdd = (node: TreeNodeType) => {
      if (node.id === parentId) {
        node.children.push(newNode);
      } else {
        node.children.forEach(traverseAndAdd);
      }
    };

    const newTree = { ...tree };
    traverseAndAdd(newTree);
    setTree(newTree);
  };

  const deleteNode = (id: string) => {
    const traverseAndDelete = (node: TreeNodeType) => {
      node.children = node.children.filter((child) => child.id !== id);
      node.children.forEach(traverseAndDelete);
    };

    const newTree = { ...tree };
    traverseAndDelete(newTree);
    setTree(newTree);
  };

  const editNode = (id: string, newName: string) => {
    const traverseAndEdit = (node: TreeNodeType) => {
      if (node.id === id) {
        node.name = newName;
      } else {
        node.children.forEach(traverseAndEdit);
      }
    };

    const newTree = { ...tree };
    traverseAndEdit(newTree);
    setTree(newTree);
  };

  const resetTree = () => {
    debugger
    setTree(initialTrees);
  };

  return (
    <div className="app">
      <h1>Tree Structure</h1>
      <button onClick={resetTree}>Сбросить состояние</button>
      <TreeNode
        node={tree}
        onAdd={addNode}
        onDelete={deleteNode}
        onEdit={editNode}
      />
    </div>
  );
};

export default App;