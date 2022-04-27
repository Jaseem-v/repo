import React, { useRef, ChangeEvent } from 'react'
import {
    Card,
    Grid,
    Typography,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
    FormProvider,
    RHFSwitch,
    RHFSelect,
    RHFEditor,
    RHFTextField,
    RHFRadioGroup,
    // RHFUploadMultiFile,
} from '../../../components/hook-form';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';

type Props = {
    uploadedFile: {
        name?: string
    } | null;
    setUploadedFile: React.Dispatch<React.SetStateAction<Props["uploadedFile"]>>

}


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
export const CommonDetails = () => {
    return (
        <Card sx={{ p: 3 }}>
            <LabelStyle>Employee Name</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6}>
                    <RHFTextField name="firstName" label="First Name" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="firstName_ar" label="First Name  (AR)" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="middleName" label="Middle Name" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="middleName_ar" label="Middle Name (AR)" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="lastName" label="Last Name" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="lastName_ar" label="Last Name (AR)" />
                </Grid>
            </Grid>
        </Card>
    )
}

export const DocumentDetails = () => {
    return (
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
                    <RHFTextField name="emiratesID" label="Emirates ID" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="passportNumber" label="Passport Number" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="EIDExpirydate" label="EID Expiry date" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="occupation_en" label="Occupation (E.N)" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="visaExpiryDate" label="Visa Expiry Date" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="passportExpiryDate" label="Passport Expiry Date" />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="occupation_ar" label="Occupation (AR)" />
                </Grid>
            </Grid>

        </Card>
    )
}

export const EmployeeFileUpload = ({ uploadedFile, setUploadedFile }: Props) => {
    const uploadInputRef = useRef<HTMLInputElement>(null)
    const fileOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files[0]) {
        setUploadedFile(e.target.files?.[0] || null)
        // } else {
        console.log("error");

        // }

    }

    const uploadDocumentHandle = () => {
        return uploadInputRef.current && uploadInputRef.current!.click()
    }

    return (

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
                <Button variant="outlined" onClick={uploadDocumentHandle}>
                    Browse
                </Button>
            </div>


        </Card>
    )
}