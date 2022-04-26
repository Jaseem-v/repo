import { useState, useRef, ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom"
import { Product } from '../../@types/product';

import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';



import { makeStyles } from '@mui/styles';


import {
    Card,
    Chip,
    Grid,
    Stack,
    TextField,
    Typography,
    Autocomplete,
    InputAdornment,
    Button,
    Container
} from '@mui/material';

import {
    FormProvider,
    RHFSwitch,
    RHFSelect,
    RHFEditor,
    RHFTextField,
    RHFRadioGroup,
    // RHFUploadMultiFile,
} from '../../components/hook-form';
import DetailsSelect from './DetailsSelect';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

export interface IAppProps {
}


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const useStyle = makeStyles({
    "item-1": {
        paddingLeft: "0 !important",
        // paddingTop: "0 !important"
    },
    "item-2": {
        paddingTop: "0 !important"
    }
})

const data = {

    email: ["email", "email", "email", "email", "email"],
    Designation: ["Designation", "Designation", "Designation", "Designation", "Designation"],
    Company: ["Company", "Company", "Company", "Company", "Company"],
    Department: ["Department", "Department", "Department", "Department", "Department"],
    Nationality: ["Nationality", "Nationality", "Nationality", "Nationality", "Nationality"],

}

interface uploadedFileInterface {
    name?: string
}



export default function NewEmployee(props: IAppProps) {
    const classes = useStyle();

    const [uploadedFile, setUploadedFile] = useState<null | uploadedFileInterface>(null)
    const [edit, setEdit] = useState<boolean>(true)



    const fileOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setUploadedFile(e.target!.files[0]);

    }

    const uploadInputRef = useRef(null)

    return (
        <div>
            {/* <FormProvider methods={methods} > */}

            <Page title="Ecommerce: Create a new product">
                <Container maxWidth={"lg"}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>

                        <HeaderBreadcrumbs
                            heading="Employee Details"
                            links={[
                                { name: 'Employees', href: "/dashboard/app" },

                                { name: "Addnew", href: "/dashboard/addnew", }
                            ]}
                        />

                        <Button variant='contained' style={{ marginTop: "1rem" }} onClick={() => setEdit(!edit)}>
                            {edit ? "cancel" : "edit"}
                        </Button>
                    </div>

                    <form action="" >
                        <Grid container spacing={3}>
                            <Grid item md={8}>
                                <Card sx={{ p: 3 }}>
                                    <LabelStyle>Employee Name</LabelStyle>
                                    <Grid container spacing={3} rowSpacing={2}>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="First Name" value={"Reece "} edit={edit} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" lang={"arb"} label="First Name  (AR)" value={"Reece"} edit={edit} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="Middle Name" value={"Chung"} edit={edit} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" lang={"arb"} label="Middle Name (AR)" value={"Chung"} edit={edit} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="Last Name" value={"Gazali"} edit={edit} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" lang={"arb"} label="Last Name (AR)" value={"Gazali"} edit={edit} />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
                                    <LabelStyle>Document Details</LabelStyle>
                                    <Grid container spacing={3} rowSpacing={2}>
                                        <Grid item md={3}>
                                            <Button variant="outlined" disableElevation size="medium"
                                                style={{ width: "100%", height: "100%", fontSize: "1rem" }}
                                                endIcon={<QrCodeScannerOutlinedIcon />}>
                                                Scan EID</Button>
                                        </Grid>
                                        <Grid item md={9}>
                                            <RHFTextField name="name" label="Emirates ID" edit={edit} value={"990-588-5716"} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="Passport Number" edit={edit} value={"990-588-5716"} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="EID Expiry date" edit={edit} value={"990-588-5716"} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="Occupation (E.N)" edit={edit} value={"Business"} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="Visa Expiry Date" edit={edit} value={"2025"} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" label="Passport Expiry Date" edit={edit} value={"2025"} />
                                        </Grid>
                                        <Grid item md={6}>
                                            <RHFTextField name="name" lang={"arb"} label="Occupation (AR)" edit={edit} value={"Business"} />
                                        </Grid>
                                    </Grid>

                                </Card>
                                <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
                                    <LabelStyle>Employee Documents</LabelStyle>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Typography variant="body1" mt={2} >
                                            Upload employee one page document (PDF) <br />
                                            <span style={{ textDecoration: "underline", cursor: uploadedFile ? "pointer" : "" }}>
                                                {uploadedFile ? uploadedFile.name : "Download Sample Document"}
                                            </span>
                                        </Typography>
                                        <input
                                            ref={uploadInputRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={fileOnchange}
                                        />
                                        <Button variant="outlined" onClick={() => uploadInputRef.current && uploadInputRef.current!.click()}>
                                            Browse
                                        </Button>
                                    </div>


                                </Card>


                            </Grid>
                            <Grid item md={4} >
                                <Card sx={{ p: 3 }}>
                                    <LabelStyle>Official Details</LabelStyle>

                                    <DetailsSelect edit={edit} data={data["email"]} />
                                    <DetailsSelect edit={edit} data={data["Designation"]} />
                                    <DetailsSelect edit={edit} data={data["Company"]} />
                                    <DetailsSelect edit={edit} data={data["Department"]} />
                                    <DetailsSelect edit={edit} data={data["Nationality"]} />
                                </Card>

                                {edit ?

                                    <Button variant="contained" style={{ width: "100%", marginTop: "3rem" }} >Save</Button> : ""
                                }


                            </Grid>

                        </Grid>
                    </form>

                </Container>
            </Page>


            {/* </FormProvider> */}
        </div >
    );
}
