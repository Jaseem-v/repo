import React, { useRef, ChangeEvent, useState } from 'react'
import {
    Card,
    Grid,
    Typography,
    Button,
    TextField,
    Autocomplete,
    Box
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { RHFTextField, RHFSelect } from '../../../components/hook-form';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import {
    countries
} from "../../../data/_countries"
import DetailsSelect from '../DetailsSelect';
import { useFormContext, Controller, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import { FormValidInputs } from '../NewEmployee';

// Types
type Props = {
    detailsPage?: boolean
    isEdit?: boolean
    setValue: UseFormSetValue<FormValidInputs>
    getValue: UseFormGetValues<FormValidInputs>
}

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



export const CommonDetails = ({ errors, isEdit }: editInterface) => {

    return (
        <Card sx={{ p: 3 }}>
            <LabelStyle sx={{ marginBottom: 3 }}>Employee Name</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="firstName" label="First Name (EN)" disabled={isEdit} fullWidth />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="firstName_ar" label="First Name  (AR)" disabled={isEdit} dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="middleName" label="Middle Name (EN)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="middleName_ar" label="Middle Name (AR)" disabled={isEdit} dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="lastName" label="Last Name (EN)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="lastName_ar" label="Last Name (AR)" disabled={isEdit} dir="rtl" />
                </Grid>
            </Grid>
        </Card>
    )
}

export const DocumentDetails = ({ isEdit }: editInterface) => {
    const { control, watch } = useFormContext();

    return (
        <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
            <LabelStyle>Document Details</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={3} xs={12}>
                    <Button variant="outlined" disableElevation size="medium"
                        style={{ width: "100%", height: "3.5rem", fontSize: "1rem" }}
                        endIcon={<QrCodeScannerOutlinedIcon />} disabled={isEdit}>
                        Scan EID</Button>
                </Grid>
                <Grid item md={9} xs={12}>
                    <RHFTextField name="emiratesID" label="Emirates ID" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="passportNumber" label="Passport Number" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFDatePicker name="EIDExpirydate" label="EID Expiry date" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFDatePicker name="passportExpiryDate" label="Passport Expiry Date" disabled={isEdit} />

                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFDatePicker name="visaExpiryDate" label="Visa Expiry Date" disabled={isEdit} />
                </Grid>

                <Grid item md={6} xs={12}>
                    <RHFTextField name="occupation_en" label="Occupation (EN)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="occupation_ar" label="Occupation (AR)" disabled={isEdit} dir="rtl" />
                </Grid>
            </Grid>

        </Card>
    )
}

export const EmployeeFileUpload = ({ detailsPage, isEdit, setValue, getValue }: Props) => {
    const uploadInputRef = useRef<HTMLInputElement>(null)

    const fileOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setValue("docImage", e.target.files[0].name)
        }

    }

    const uploadDocumentHandle = () => {
        return uploadInputRef.current && uploadInputRef.current!.click()
    }

    const currentFile = getValue("docImage")
    console.log(currentFile);





    return (

        <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
            <LabelStyle>Employee Documents</LabelStyle>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body1" mt={2} >
                    {currentFile ? "" : "Upload employee one page document (PDF)"} {currentFile ? null : <br />}
                    <span style={{ textDecoration: "underline", cursor: currentFile ? "pointer" : "" }}>
                        {currentFile}
                    </span>
                </Typography>

                <Button variant="outlined" onClick={uploadDocumentHandle} disabled={isEdit}>
                    {currentFile ? "Upload New" : "Browse"}
                </Button>
                <input
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={fileOnchange}
                    disabled={isEdit}
                    name={"docImage"}
                />
            </div>


        </Card>
    )
}

export const OfficialDetails = ({ data, isEdit, setValue, getValue }: dropDownData) => {

    return (
        <Card sx={{ p: 3 }}>
            <LabelStyle style={{ marginBottom: "1.5rem" }}>Official Details</LabelStyle>
            
            <div>
                <RHFTextField name="phonenumber" label="Phone Number" disabled={isEdit} />
            </div>
            <div style={{ marginTop: "1.5rem" }}>
                <RHFTextField name="email" label="Email" disabled={isEdit} />
            </div>

            <DetailsSelect data={data["Designation"]} isEdit={isEdit} />
            <DetailsSelect data={data["Company"]} isEdit={isEdit} />
            <DetailsSelect data={data["Department"]} isEdit={isEdit} />

            <div style={{ marginTop: "1.5rem" }}>
                <Autocomplete
                    id="nationality"
                    fullWidth
                    options={countries}
                    autoHighlight
                    autoSelect
                    getOptionLabel={(option) => option.label}
                    onChange={(_, newValue: inputValueProps | null) => {
                        if (newValue) {
                            setValue("nationality", newValue)
                        }

                    }}
                    disableClearable={true}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""
                            />
                            {option.label} ({option.code})
                        </Box>
                    )}
                    disabled={isEdit}
                    renderInput={(params) => (
                        <RHFTextField name="nationality" {...params}
                            label="Choose Nationality"
                            disabled={isEdit}
                            value={getValue("nationality.label") ? getValue("nationality.label") : ""}
                        />
                    )}
                    defaultValue={getValue("nationality.label") ? getValue("nationality") : undefined}

                />
            </div>

        </Card>
    )
}