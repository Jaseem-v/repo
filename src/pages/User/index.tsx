import { Container, IconButton } from "@mui/material";
import React from "react";
import Page from "src/components/Page";
import DataGrid, { TableSchemaI } from "src/components/DataGrid";

import { useQuery } from "@apollo/client";
import { ALL_USERS } from "src/graphql/User";

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
              field: "company", type: "one", matches: [

                {
                  id: "cl2j3ltab009001s61qy0q7t4"
                },
                {
                  id: "cl2kaidh4148901s6j6ciq21z"
                }


              ]
            },
            
          ]}
          columns={[
            {
              field: "id",
              label: "ID.no",
            },
            {
              field: "firstName",
              label: "FirstName",
            },
            {
              field: "lastName",
              label: "LastName",
            },
            {
              field: "username",
              label: "UserName",
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
