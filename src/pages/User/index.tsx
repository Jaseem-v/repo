// @ts-nocheck
import { Container, IconButton } from "@mui/material";
import React from "react";
import Page from "src/components/Page";
import DataGrid, { TableSchemaI } from "src/components/DataGrid";

import { useQuery } from "@apollo/client";
import { ALL_USERS } from "../../graphql/User";

export default function Test() {
  // const { data, loading, error } = useQuery(ALL_USERS)

  // console.log(data, "w");

  return (
    <Page title="TestTable">
      <Container>
        <DataGrid
          query={ALL_USERS}
          searchKeys={["firstName"]}
          filters={[
            {
              field: "firstName", type: "simple", matches: [

                {
                  equals: "dasfasdfasd"
                },
                {
                  gt: "dasfasdfasd"
                }


              ]
            },
            {
              field: "company",
              type: "one",
              matches: [{ id: "cl2rh6bpr114801s6slmwv4s5" }, { id: "cl2rh6l2d126701s64wgowqe1" }]
            },
            {
              field: "jobRole",
              type: "one",
              matches: ["Backend", "Hr"]
            }



          ]}
          columns={[
            {
              sortId: "firstName",
              field: { name: "firstName", img: "avatar" },
              label: "Name",
              type: "Avatar"
            },
            {
              field: "company.name",
              label: "Company",
              sortId: "companyId",
              field: "company.name",
              label: "CompanyName",
            },

            {
              field: "jobRole",
              label: "Role",
            },
            {
              field: "status",
              label: "Status",
              type: "Status"
            },
            {
              field: "varified",
              label: "Varified",
              type: "Verified"
            },
            {
              field: "roles",
              label: "roles",
              type: "List",
            },
          ]}
        ></DataGrid>
      </Container>
    </Page>
  );
}
