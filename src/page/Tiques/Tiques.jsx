import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { rows } from "./Data";
import { Box, Typography, useTheme } from "@mui/material";
import { AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined } from "@mui/icons-material";



const Tiques = () => {
    const theme = useTheme()

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 33, flex: 1,
            align: "center",
            headerAlign: "center"
        },

        {
            field: 'Type', headerName: 'Type',
            align: "center", flex: 1, headerAlign: "center"
            , renderCell: ({ row: { Type } }) => {
                return (
                    <Box
                        sx={{
                            p: "5px",
                            width: "99px",
                            borderRadius: "3px",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-evenly",

                            backgroundColor:
                                Type === "marginatum"
                                    ? theme.palette.primary.dark
                                    : Type === "dromidarii"
                                        ? theme.palette.secondary.dark
                                        : "#3da58a",
                        }}
                    >
                        {Type === "marginatum" && (
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />
            )}

            {Type === "dromidarii" && (
              <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}

            {Type === "excavatum" && (
              <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}
                        <Typography sx={{ fontSize: "13px", color: "#fff"}}>{Type}
                        </Typography>
                    </Box>
                );
            },
        },
        { field: 'Genre', headerName: 'Genre', align: "center", flex: 1, headerAlign: "center" },

        { field: 'Face', headerName: 'Face', align: "center", flex: 1, headerAlign: "center" },
        { field: 'Etat', headerName: 'Etat', align: "center", flex: 1, headerAlign: "center" },

    ];
    return (
        <div>
            <Box>
      {/* <Header title={"TEAM"} subTitle={"Tick Managing "} /> */}

      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={rows}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
        </div>
    )
}
export default Tiques;