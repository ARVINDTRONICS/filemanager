import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

export const Tree = ({ fileList }) => {
  const renderTree = (nodes) => {
    if (nodes) {
      return nodes.map((node, index) => {
        return (
          <TreeItem
            key={`${node.name}-${index}`}
            nodeId={`${node.name}-${index}`}
            label={node.name}
          >
            {Array.isArray(node.children) && node.children.length > 0
              ? renderTree(node.children)
              : null}
          </TreeItem>
        );
      });
    }
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {Array.isArray(fileList) && fileList.length > 0
        ? renderTree(fileList)
        : null}
    </TreeView>
  );
};

export default Tree;
