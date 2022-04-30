import { Chip, TextField } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import React from "react";

let Comptypes: ComptypesI = {
  Text: ({ field }: { field: any }) => <div>{field} </div>,
  Status: ({ field }: { field: boolean }) => (
    <div
      style={{
        background: field ? "green" : "gray",
      }}
    >
      {field ? "Active" : "Not Active"}{" "}
    </div>
  ),
  FullName: ({ field }: { field: { first: string; last: string } }) => (
    <div>
      {" "}
      {field.first} {field.last}{" "}
    </div>
  ),
  Email: ({ field }: { field: string }) => (
    <div>
      <EmailOutlined />
      <a href={`emailto:${field}`}> {field} </a>
    </div>
  ),
  List: ({ field }: { field: string[] }) => (
    <div>
      {field.map((e) => (
        <Chip
        label={e}
        />
      ))}
    </div>
  ),
};

type ComptypesI = {
  [key: string]: React.ElementType;
};
export default Comptypes;
