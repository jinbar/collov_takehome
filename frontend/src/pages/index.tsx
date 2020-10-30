import { Box, Button } from "@chakra-ui/core";
import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { GridTitles } from "../components/GridTitles";

import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Index = () => {
  const [key, incrementKey] = useState(0);
  const [applicant, addApplicant] = useState([]);

  return (
    <Box borderWidth="10px" p="auto">
      <Button
        onClick={() => {
          addApplicant((oldArray) => [
            ...oldArray,
            { i: key.toString(), x: 0, y: 0, w: 1, h: 2 },
          ]);
          incrementKey(key + 1);
        }}
      >
        CLICK ME TO ADD A NEW BOI
      </Button>
      <GridTitles />
      <ResponsiveReactGridLayout
        className="layout"
        layout={applicant}
        // cols={6}
        cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
        rowHeight={30}
        width={1200}
        isResizable={false}
      >
        {applicant.map((item) => {
          return (
            <Box key={item.i} bg="tomato">
              Boi
            </Box>
          );
        })}
      </ResponsiveReactGridLayout>
    </Box>
  );
};

export default Index;
