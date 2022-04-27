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
    currentFile?: string
    isEdit?: boolean

}


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

interface editInterface {
    isEdit: boolean
}
export const CommonDetails = ({ isEdit }: editInterface) => {
    return (
        <Card sx={{ p: 3 }}>
            <LabelStyle>Employee Name</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6}>
                    <RHFTextField name="firstName" label="First Name" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="firstName_ar" label="First Name  (AR)" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="middleName" label="Middle Name" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="middleName_ar" label="Middle Name (AR)" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="lastName" label="Last Name" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="lastName_ar" label="Last Name (AR)" disabled={isEdit} />
                </Grid>
            </Grid>
        </Card>
    )
}

export const DocumentDetails = ({ isEdit }: editInterface) => {
    return (
        <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
            <LabelStyle>Document Details</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={3}>
                    <Button variant="outlined" disableElevation size="medium"
                        style={{ width: "100%", height: "100%", fontSize: "1rem" }}
                        endIcon={<QrCodeScannerOutlinedIcon />} disabled={isEdit}>
                        Scan EID</Button>
                </Grid>
                <Grid item md={9}>
                    <RHFTextField name="emiratesID" label="Emirates ID" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="passportNumber" label="Passport Number" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="EIDExpirydate" label="EID Expiry date" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="occupation_en" label="Occupation (E.N)" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="visaExpiryDate" label="Visa Expiry Date" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="passportExpiryDate" label="Passport Expiry Date" disabled={isEdit} />
                </Grid>
                <Grid item md={6}>
                    <RHFTextField name="occupation_ar" label="Occupation (AR)" disabled={isEdit} />
                </Grid>
            </Grid>

        </Card>
    )
}

export const EmployeeFileUpload = ({ uploadedFile, setUploadedFile, currentFile, isEdit }: Props) => {
    const uploadInputRef = useRef<HTMLInputElement>(null)

    const fileOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setUploadedFile(e.target.files?.[0] || null)
    }

    const uploadDocumentHandle = () => {
        return uploadInputRef.current && uploadInputRef.current!.click()
    }

    console.log(uploadedFile);


    return (

        <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
            <LabelStyle>Employee Documents</LabelStyle>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body1" mt={2} >
                    {!currentFile && "Upload employee one page document (PDF)"}
                    <span style={{ textDecoration: "underline", cursor: uploadedFile ? "pointer" : "" }}>
                        {uploadedFile?.name ? uploadedFile.name : currentFile}
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
                />
            </div>


        </Card>
    )
}