import {
    Button, Card, CardHeader, Grid, InputAdornment, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ChangeEvent, useRef } from 'react';
// import DetailsSelect from '../DetailsSelect';
import { Controller, useFormContext, UseFormGetValues, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { RHFSelect, RHFTextField } from '../../../components/hook-form';
import { FormValidInputs } from '../CompanyRegitsrationForm';
import AuthorisedSignatureTable from '../infoTables/AuthorisedSignatureTable';
import MilitaryInfoTable from '../infoTables/MilitaryInfoTable';
import NationalitiesWorkingTable from '../infoTables/NationalitiesWorkingTable';
import OwnerTable from '../infoTables/OwnerTable';
import StaffListTable from '../infoTables/StaffListTable';
import { ErrorMessage } from '@hookform/error-message';




// Types

type Props = {
    detailsPage?: boolean
    isEdit?: boolean
    setValue: UseFormSetValue<FormValidInputs>
    getValue: UseFormGetValues<FormValidInputs>
    schema: "docImage1" | "docImage2" | "docImage3" | "docImage4" | "docImage5"
    title: string
}
type DocProps = {
    isEdit?: boolean
    setValue: UseFormSetValue<FormValidInputs>
    getValue: UseFormGetValues<FormValidInputs>

}

type Errors = UseFormSetError<FormValidInputs>

interface dropDownData {
    data: {
        Designation: string[],
        Company: string[],
        Department: string[],
    },
    isEdit?: boolean
    setValue: UseFormSetValue<FormValidInputs>
    getValue: UseFormGetValues<FormValidInputs>
}

interface inputValueProps {

    code: string;
    label: string;
    phone: string;


}

interface editInterface {
    errors?: {
        [x: string]: any;
    }
    isEdit: boolean
}

// LabelStyle

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const CustomError = styled(Typography)(() => ({
    color: "#FF4842",
    lineHeight: 1.5,
    fontSize: "0.75rem",
    fontWeight: 400,
    margin: "8px 14px 0 14px"
}))


export const CommonDetails = ({ errors, isEdit }: editInterface) => {

    return (
        <Card sx={{ p: 3 }}>

            <CardHeader title={"Company Information"} sx={{ mb: 3, p: 0 }} />
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyName" label="Company Name (EN)" disabled={isEdit} fullWidth />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyName_ar" label="Company Name  (AR)" disabled={isEdit} dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyActivity" label="Company Activity (EN)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyActivity_ar" label="Company Activity (AR)" disabled={isEdit} dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyCode" label="Company Code" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFSelect name='companyLicense' label='Licencing Authority' >
                        <option value=''> </option>
                        <option value='1'> GHQ Approved </option>
                        <option value='2'> GHQ Rejected </option>
                    </RHFSelect>
                </Grid>
            </Grid>
        </Card>
    )
}

export const DocUploads = ({ setValue, getValue }: DocProps) => {
    return (
        <div>
            <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
                <CardHeader title={"Documents"} sx={{ mb: 3, p: 0 }} />
                <Grid container spacing={3} rowSpacing={2}>

                    <Grid item md={6} xs={12} mt={2}>
                        <FileUpload schema='docImage1' title="Valid Company Trade License" setValue={setValue} getValue={getValue} />
                    </Grid>
                    <Grid item md={6} xs={12} mt={2}>
                        <FileUpload schema='docImage2' title="Company Owner and Co-workers " setValue={setValue} getValue={getValue} />
                    </Grid>
                    <Grid item md={6} xs={12} mt={2}>
                        <FileUpload schema='docImage3' title="Valid Company Emigration Card Copy" setValue={setValue} getValue={getValue} />
                    </Grid>
                    <Grid item md={6} xs={12} mt={2}>
                        <FileUpload schema='docImage4' title="List of company Employees  " setValue={setValue} getValue={getValue} />
                    </Grid>
                    <Grid item md={12} xs={12} mt={2}>
                        <FileUpload schema='docImage5' title="Company Registration - From Tasheel with MOL or Tasbeel Stamp" setValue={setValue} getValue={getValue} />
                    </Grid>
                    {/* <FileUpload schema='docImage2' title="Upload employee" setValue={setValue} getValue={getValue} /> */}
                    {/* <FileUpload schema='docImage3' title="Upload employee" setValue={setValue} getValue={getValue} /> */}
                </Grid>
            </Card>
        </div>
    )

}
export const FileUpload = ({ schema, setValue, getValue, title }: Props) => {
    const uploadInputRef = useRef<HTMLInputElement>(null)

    const fileOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setValue(schema, e.target.files[0].name)
        }

    }

    const uploadDocumentHandle = () => {
        return uploadInputRef.current && uploadInputRef.current!.click()
    }



    const currentFile = getValue(schema)
    // console.log(currentFile);


    const { control } = useFormContext();



    return (
        <>
            <Card sx={{ p: 2 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="body1" mt={0} >
                        {title} {currentFile ? <br /> : null}
                        <span style={{ textDecoration: "underline", cursor: currentFile ? "pointer" : "" }}>
                            {currentFile}
                        </span>
                    </Typography>

                    <Button variant="outlined" onClick={uploadDocumentHandle} >
                        {currentFile ? "Upload New" : "Browse"}
                    </Button>






                </div>
            </Card>
            <Controller
                name={schema}
                control={control}
                render={({ field, fieldState: { error } }) => {
                    console.log("sinError", error);

                    return (
                        <>
                            {/* // <TextField {...field} fullWidth error={!!error} helperText={error?.message} style={{ borderColor: "#ff7730" }} /> */}
                            <input
                                ref={uploadInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={fileOnchange}
                                // disabled={isEdit}
                                name={schema}
                            />
                            {/* <p></p> */}
                            {!currentFile &&

                                <CustomError>{error?.message}</CustomError>
                            }
                            {/* <p style={{ fontSize: "1.5rem", margin: "0.81rem 1rem", color: "#FF4842" }}>{error?.message}</p> */}
                        </>
                    )
                }}

            />
        </>
    )
}

export const Address = () => {
    const { control, watch } = useFormContext();

    return (
        <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
            <CardHeader title={"Address"} sx={{ mb: 3, p: 0 }} />
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFSelect name='emirate' label='Emirate' >
                        <option value=''></option>
                        <option value='1'> Abu Dhabi</option>
                        <option value='2'> Dubai </option>
                        <option value='2'> Sharjah </option>
                        <option value='2'>  Ajman </option>
                        <option value='2'> Umm Al-Quwain </option>
                        <option value='2'> Ras Al Khaimah </option>
                    </RHFSelect>
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="fax" type="number" label="Fax" InputProps={{
                        startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                    }} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="area" label="Area" />

                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="area_ar" label="Area (AR)" dir="rtl" />

                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="email" label="Email" />
                </Grid>

                <Grid item md={6} xs={12}>
                    <RHFTextField name="p_o_box" label="P.O Box" />
                </Grid>
            </Grid>

        </Card>
    )
}


export const CompanyInfoTables = () => {
    const tableMokeData = {
        ownerName: "abdulla",
        place_of_work: "Dubai",
        unified_no: 25489,
        notes: "Main Owner of the Company",
    }
    const SignatureMockData = [{
        ownerName: "sakkeer",
        place_of_work: "Doha",
        unified_no: 444,
        country: "Qatar",
        notes: "Main Owner of the Company",
    }]
    const StaffMockData = [{
        ownerName: "surya",
        job: "Accountant",
        unified_no: 250,
        country: "Iran",
        notes: "hard worker",
    }]
    const NationalityMockData = [{
        number: 5,
        country: "India",
        notes: "hard worker",
    }]
    return (
        <div>

            <OwnerTable title="Owner Info"
                tableData={[tableMokeData, tableMokeData, tableMokeData, tableMokeData, tableMokeData, tableMokeData]}
                tableLabels={[
                    { id: 'owner_name', label: 'Owner Name' },
                    { id: 'place_of_work', label: 'Place Of Work' },
                    { id: 'unified_no', label: 'Unified Number' },
                    { id: 'notes', label: 'Notes' },
                    // { id: 'status', label: 'Status' },
                    { id: '' },
                ]} />

            <AuthorisedSignatureTable style={{ marginTop: "2rem" }} title="Authorised Signature"
                tableData={SignatureMockData}
                tableLabels={[
                    { id: 'owner_name', label: 'Owner Name' },
                    { id: 'place_of_work', label: 'Place Of Work' },
                    { id: 'unified_no', label: 'Unified Number' },
                    { id: 'country', label: 'Country' },
                    { id: 'notes', label: 'Notes' },
                    // { id: 'status', label: 'Status' },
                    { id: '' },
                ]} />
            <StaffListTable style={{ marginTop: "2rem" }} title="Staff List - Administration"
                tableData={StaffMockData}
                tableLabels={[
                    { id: 'owner_name', label: 'Owner Name' },
                    { id: 'Job', label: 'Job' },
                    { id: 'unified_no', label: 'Unified Number' },
                    { id: 'country', label: 'Country' },
                    { id: 'notes', label: 'Notes' },
                    // { id: 'status', label: 'Status' },
                    { id: '' },
                ]} />
            <NationalitiesWorkingTable style={{ marginTop: "2rem" }} title="Nationalities Working"
                tableData={NationalityMockData}
                tableLabels={[
                    { id: 'number', label: 'Number' },
                    { id: 'country', label: 'Country' },
                    { id: 'notes', label: 'Notes' },
                    // { id: 'status', label: 'Status' },
                    { id: '' },
                ]} />



        </div>
    )
}


export const Military = () => {
    const tableMokeData = {
        ownerName: "abdulla",
        position: "owner",
        unit: 4,
        rank: "25th",
        military_number: 9999,
        notes: "Main Owner of the Company",
    }
    return (
        <div>
            <MilitaryInfoTable title="Related to Military"
                tableData={[tableMokeData, tableMokeData, tableMokeData, tableMokeData, tableMokeData, tableMokeData]}
                tableLabels={[
                    { id: 'name', label: 'Name' },
                    { id: 'position', label: 'Owner / Partner' },
                    { id: 'unit', label: 'Unit' },
                    { id: 'rank', label: 'Rank' },
                    { id: 'military_number', label: 'Military Number' },
                    { id: 'notes', label: 'notes' },
                    // { id: 'status', label: 'Status' },
                    { id: '' },
                ]} />
        </div>
    )
}