import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  FormControl,
  Paper,
  Button,
  Stack,
  TableFooter,
  Skeleton,
  Drawer,
  Container,
  ListItem,
  List,
  ListSubheader,
  Chip,
  MenuItem,
  Menu,
  MenuList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  InputLabel, Select, FormGroup, InputBase
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemButton from "@mui/material/ListItemButton";

import ObjByString from "./ObjectByString";

import {
  EditOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  ArrowUpward,
  ArrowDownward,
  DeleteOutline,
  FilterOutlined,
  SearchOutlined,
  ExpandLessOutlined,
} from "@mui/icons-material";

import React, { useEffect, useRef, useState } from "react";

import Scrollbar from "src/components/Scrollbar";

import Components from "./ComponentType";
import { checkTargetForNewValues } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ServerError from "src/pages/Page500";
import set from "date-fns/esm/set";

let operators: { [key: string]: (a: any, b: any) => boolean } = {
  "==": (a: any, b: any) => a == b,
  ">": (a: any, b: any) => a > b,
  "<": (a: any, b: any) => a < b,
};






export default function Index(props: {
  rows?: any;
  columns: any;
  query: any;
  pageSize?: number;
  rowsPerPageOptions?: [number];
  filters?: FilterI[];
  checkboxSelection?: boolean;
  searchKeys?: string[];
}) {
  let {
    rows,
    columns,
    filters = [],
    checkboxSelection = true,
    query,
    pageSize = 5,
    rowsPerPageOptions = [5],
    searchKeys = [],
  } = props;

  let navigate = useNavigate();

  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(5);
  const [Searchq, setSearchq] = useState("");
  const [Filtered, setFiltered] = useState<{ [key: string]: any }>({})
  const [Selected, setSelected] = useState<any[]>([])

  const [Sort, setSort] = useState<{
    field: string | null;
    order: "Asc" | "Desc";
  }>({ field: null, order: "Asc" });







  /////Filter 

  let where: { [key: string]: any } = {}

  filters.forEach((e: TableSchemaI) => {
    let _key = e["field"]
    if (Filtered[_key]) {
      where[_key] = Filtered[_key].q
    }


  })

  if (Searchq) {
    searchKeys.forEach((_each) => {
      where[_each] = { ...where[_each], contains: Searchq }
    })
  }



  ////Apollo graphQl Variables 
  let variables: {
    skip?: number;
    take?: number;
    orderBy?: { [key: string]: "Asc" | "Desc" };
    where?: { [key: string]: FiltersSingle };
  } = {
    skip: (Page - 1) * Limit < 0 ? 0 : (Page - 1) * Limit,
    take: Limit,
    ...(Sort.field && { orderBy: { [Sort.field]: Sort["order"] } }),
    ...(where && { where }),

  };


  ///Set OrderBy variable if Sort is in Active


  ////Fetching data using 'variables'
  const { data, loading, error, refetch } = useQuery(query, {
    variables,
  });





  const [_rows, set_rows] = useState(rows);





  function GetTableData() {
    return data?.[Object.keys(data)[1]]
  }
  let TotalCount = data?.[Object.keys(data)[0]]?.count;


  let TotalPage = Math.ceil(TotalCount / Limit);

  function FilterGenerateLabel(obj: { [key: string]: string }) {
    let types: { [key: string]: (val: any) => string } = {
      equals: (val: any): string => val,
      gt: (val: any): string => "bigger than " + val
    }
    let _type = Object.keys(obj)[0]

    return types[_type](obj[_type])
  }

  function DataTable() {
    const [Search, setSearch] = useState(Searchq);


    function FilterMenu({ field, matches, type }: FilterI) {
      if (type == "simple") {
        return (<FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="">{field}</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Filtered[field]?.["ind"]}
            label={field}
            onChange={
              ({ target: { value } }) => {
                setFiltered((_e) => ({ ..._e, [field]: { ind: value, q: matches[value] } }))
              }
            }
          >


            <MenuItem value="">All</MenuItem>

            {
              matches.map((each, i) => (
                <MenuItem key={i} value={i}>{FilterGenerateLabel(each)}</MenuItem>

              ))
            }

          </Select>
        </FormControl>)
      }
      if (type == "one") {
        return (<FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="">{field}</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Filtered[field]?.["ind"]}
            label={field}
            onChange={
              ({ target: { value } }) => {
                setFiltered((_e) => ({ ..._e, [field]: { ind: value, q: matches[value] } }))
              }
            }
          >


            <MenuItem value="">All</MenuItem>

            {
              matches.map((each, i) => (
                <MenuItem key={i} value={i}>
                  {typeof each=="string"&&each}
                  {typeof each=="object"&&each[Object.keys(each)[0]]}
                </MenuItem>

              ))
            }

          </Select>
        </FormControl>)
      }
      return (<></>)
    }

    return (
      <Paper>
        <Stack direction="row" padding={2} spacing={2}>
          <Paper
            component="form"
            sx={{ p: '0px 0px', pl: "20px", display: 'flex', border: "1px solid lightgray", alignItems: 'center', }}
          >

            <InputBase
              placeholder={`Search`}
              value={Search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              size="small"
            ></InputBase>

            <IconButton
              sx={{
                margin: "0 10px"
              }}
              color="primary"
              onClick={() => {
                setSearchq(Search);
                setPage(1);
              }}
            >
              <SearchOutlined />
            </IconButton>

          </Paper>
          {
            //<Button onClick={() => { setOpenFil(true) }} ref={FilterRef} variant="outlined" size="small" startIcon={<FilterOutlined fontSize='small' />}>Add Filter</Button>
            //             {filters.length > 0 && <FilterMenu OpenFil={OpenFil} FilterRef={FilterRef} setOpenFil={setOpenFil} Filter={Filter} setFilter={setFilter} />}
          }
          {
            filters.map((e, i) => <FilterMenu key={i} {...e} />)
          }

        </Stack>
        <Table>
          <TableHead>
            <TableCell>
              <Checkbox
                checked={GetTableData()?.length == Selected.length}
                indeterminate={!(GetTableData()?.length == Selected.length) && Selected.length > 0}
                onChange={() => {
                  let _data = GetTableData() || []

                  if (Selected.length == _data.length) {
                    setSelected([])
                  } else {
                    setSelected(_data.map((e: any) => e.id))
                  }


                }} />
            </TableCell>
            {columns?.map((e: TableSchemaI,i:number) => (
              <TableCell
                key={i}
                onClick={() => {
                  setSort((_e: any) => {
                    if (_e.field == e.field) {
                      if (_e.order == "Asc") {
                        return { ..._e, order: "Desc" };
                      } else {
                        return { field: null, order: "Asc" };
                      }
                    } else {
                      return { field: e.field, order: "Asc" };
                    }
                  });
                }}
              >
                <Stack direction="row">
                  {Sort.field == e.field && (
                    <IconButton
                      sx={{
                        height: "20px",
                        width: "20px",
                      }}
                    >
                      {Sort.order == "Asc" ? (
                        <ArrowUpward
                          sx={{
                            height: "15px",
                            width: "15px",
                          }}
                        />
                      ) : (
                        Sort.order == "Desc" && (
                          <ArrowDownward
                            sx={{
                              height: "15px",
                              width: "15px",
                            }}
                          />
                        )
                      )}
                    </IconButton>
                  )}

                  {e.label}
                </Stack>
              </TableCell>
            ))}
          </TableHead>

          <TableBody>
            {loading &&
              Array.from({ length: Limit }).map((e,i) => (
                <TableRow key={i}>
                  {[...columns, "", ""].map((clm: any,i) => (
                    <TableCell key={i}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!error &&
              GetTableData()?.map((row: {[key:string]:any}, i: number) => (
                <TableRow selected={Selected.indexOf(row.id) > (-1)} key={"row" + i}>

                  <TableCell  width={25}>
                    <Checkbox 
                    checked={Selected.indexOf(row.id) > (-1)}
                    onChange={() => {
                      if (Selected.indexOf(row.id) > (-1)) {
                        setSelected(Selected.filter(_e => _e !== row.id))
                      } else {
                        setSelected((e) => ([...e, row.id]))

                      }
                    }} />
                  </TableCell>

                  {columns.map((clm: any) => (
                    <TableCell key={clm.field}>
                      {clm && clm.type
                        ? Components[clm.type] &&
                        React.createElement(
                          Components[clm.type],
                          { field: ObjByString(row, clm.field) },
                          null
                        )
                        : ObjByString(row, clm.field)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div
          style={{
            padding: "20px 30px",
            display: "flex",
          }}
        >
          <Stack style={{ marginLeft: "auto" }} direction="row">
            <IconButton size="small">
              {TotalCount ? (
                <span>
                  {Page}/{TotalPage}
                </span>
              ) : (
                "loading"
              )}
            </IconButton>
            <IconButton
              size="small"
              disabled={Page < 2}
              onClick={() => {
                setPage((e) => (e > 0 ? e - 1 : 0));
              }}
            >
              <ArrowLeftOutlined />
            </IconButton>

            <IconButton
              size="small"
              disabled={TotalPage <= Page}
              onClick={() => {
                setPage((e) => e + 1);
              }}
            >
              <ArrowRightOutlined />
            </IconButton>
          </Stack>
        </div>
      </Paper>
    );
  }

  return (
    <Scrollbar>
      <div style={{ width: "100%" }}>
        {error ? (
          <div style={{ textAlign: "center" }}>
            <ServerError />
            {error.message}
          </div>
        ) : (
          <DataTable />
        )}
      </div>
    </Scrollbar>
  );
}


////Filter Options 
type FiltersSingle =
  | { "contains": string }
  | { "endsWith": string }
  | { "equals": string }
  | { "gt": string }
  | { "gte": string }
  | { "lt": string }
  | { "lte": string }
  | { "not": string }
  | { "startsWith": string }
  | { "id": string };



type FilterArrayTypes =
  | { "some": [string] }
  | { "every": [string] };


type SimpleFilter = {
  field: string;
  type: "simple";
  matches: FiltersSingle[];
};
type ArrayManyFilter = {
  field: string;
  type: "many";
  matches: FilterArrayTypes;
};

type ArrayOneFilter = {
  field: string;
  type: "one";
  matches: any[];
};

export type FilterI = SimpleFilter | ArrayManyFilter | ArrayOneFilter;

export type TableSchemaI = {
  field: string;
  type?: string;
  label?: string;
  renderCell?: (e: { value: string }) => React.ElementType;
};
