import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import Card from "./card";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4 } from "./data";

const Row1 = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
    >
      <Card 
        subTitle={"12,361 "}
        increase={"+14%"}
        title={"marginatum"}
        data={data1} scheme={"nivo"}       />

      <Card
        // img={"/images/tick2.jpeg"} 
         
        
        title={"Dromidarii"}
        subTitle={"431,225"}
        increase={"+21%"}
        data={data2}
        scheme={"category10"} 
      />

      <Card
        //  img={"/images/tick2.jpeg"} 
        title={"Excavatum"}
        subTitle={"2,441"}
        increase={"+5%"}
        data={data3}
        scheme={"accent"} 
      />
      <Card
        //  img={"/images/tick2.jpeg"} 
        title={"impeltatum"}
        subTitle={"20,1"}
        increase={"+43%"}
        data={data4}
        scheme={"dark2"} 
      />
    </Stack>
  );
};

export default Row1;
