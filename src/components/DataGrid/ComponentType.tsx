import { Chip, TextField, Typography, CardHeader } from "@mui/material";
import Label from 'src/components/Label'
import { CheckCircle, AccessTime } from "@mui/icons-material";
import React from "react";
import Avatar from "../Avatar";

let Comptypes: ComptypesI = {
  Text: ({ field }: { field: any }) => <div>{field} </div>,
  Avatar: ({ field }: { field: { img: string, name: string } }) => (
    <CardHeader
      sx={{
        padding: "0"
      }}
      avatar={
        <Avatar
          alt={field.name}
          src={field.img ? field.img : `https://ui-avatars.com/api/?name=${field.name}`}
        />
      }
      title={field.name}
    />
  ),
  Status: ({ field }: { field: "Active" | "banned" }) => (
    <Label
      color={field == "Active" ? "primary" : "error"}
    >
      {field}
    </Label>
  ),
  Verified: ({ field }: { field: boolean }) => (
    field ? <CheckCircle color="primary" /> : <AccessTime color="warning" />
  ),

  List: ({ field }: { field: string[] }) => (
    <div>
      {field.map((e) => (
        <Label
          color={"primary"}
        >{e}</Label>
      ))}
    </div>
  ),
};

type ComptypesI = {
  [key: string]: React.ElementType;
};
export default Comptypes;
