import * as React from 'react';
import { styled } from '@mui/material/styles';
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


export default function App(props: IAppProps) {
    const classes = useStyle();

    return (
        <div>
            {/* <FormProvider methods={methods} > */}

            <Page title="Ecommerce: Create a new product">
                <Container maxWidth={"lg"}>
                    <HeaderBreadcrumbs
                        heading="Add New Employee"
                        links={[
                            { name: 'Employees', href:"/dashboard/app" },
                            
                            { name: "Addnew",href:"/dashboard/addnew",}
                        ]}
                    />

                    <Grid container spacing={3}>
                        <Grid item md={8}>
                            <Card sx={{ p: 3 }}>
                                <LabelStyle>Employee Name</LabelStyle>
                                <Grid container spacing={3} rowSpacing={1}>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="First Name" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="First Name  (AR)" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Middle Name" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Middle Name (AR)" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Last Name" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Last Name (AR)" />
                                    </Grid>
                                </Grid>

                            </Card>
                            <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
                                <LabelStyle>Document Details</LabelStyle>
                                <Grid container spacing={3} rowSpacing={1}>
                                    <Grid item md={3}>
                                        <Button variant="outlined" disableElevation size="medium"
                                            style={{ width: "100%", height: "100%", fontSize: "1rem" }}
                                            endIcon={<QrCodeScannerOutlinedIcon />}>
                                            Scan EID</Button>
                                    </Grid>
                                    <Grid item md={9}>
                                        <RHFTextField name="name" label="Emirates ID" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Passport Number" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="EID Expiry date" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Occupation (E.N)" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Visa Expiry Date" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Passport Expiry Date" />
                                    </Grid>
                                    <Grid item md={6}>
                                        <RHFTextField name="name" label="Occupation (AR)" />
                                    </Grid>
                                </Grid>

                            </Card>
                            <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
                                <LabelStyle>Employee Documents</LabelStyle>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography variant="body1" mt={2} >
                                        Upload employee one page document (PDF)
                                        <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                                            Download Sample Document
                                        </Typography>
                                    </Typography>
                                    <Button variant="outlined">Browse</Button>
                                </div>


                            </Card>

                            <Button variant="contained" style={{ width: "100%", marginTop: "3rem" }} >Submit</Button>

                        </Grid>
                        <Grid item md={4} >
                            <Card sx={{ p: 3 }}>
                                <LabelStyle>Official Details</LabelStyle>

                                <DetailsSelect data={data["email"]} />
                                <DetailsSelect data={data["Designation"]} />
                                <DetailsSelect data={data["Company"]} />
                                <DetailsSelect data={data["Department"]} />
                                <DetailsSelect data={data["Nationality"]} />
                            </Card>

                        </Grid>
                    </Grid>
                </Container>
            </Page>


            {/* </FormProvider> */}
        </div>
    );
}
