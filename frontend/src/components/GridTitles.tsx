import { Box } from "@chakra-ui/core";
import React from "react";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
export const GridTitles = () => {
  const col_names = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 2, y: 0, w: 1, h: 2 },
    { i: "d", x: 3, y: 0, w: 1, h: 2 },
    { i: "e", x: 4, y: 0, w: 1, h: 2 },
    { i: "f", x: 5, y: 0, w: 1, h: 2 },
  ];
  return (
    <GridLayout
      className="layout"
      layout={col_names}
      cols={6}
      rowHeight={30}
      width={1200}
      isResizable={false}
      isDraggable={false}
    >
      <Box key="a">Applied</Box>
      <Box key="b">Phone Screen</Box>
      <Box key="c">On site</Box>
      <Box key="d">Offered</Box>
      <Box key="e">Accepted</Box>
      <Box key="f">Rejected</Box>
    </GridLayout>
  );
};
