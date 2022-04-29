import React, { useRef, ChangeEvent } from 'react'
import {
    Card,
    Grid,
    Typography,
    Button,
    TextField
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { RHFTextField, RHFSelect } from '../../../components/hook-form';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import {
    countries
} from "../../../data/_countries"
import DetailsSelect from '../DetailsSelect';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';


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
    errors?: {
        [x: string]: any;
    }
    isEdit: boolean
}

const today = new Date();
export const CommonDetails = ({ errors, isEdit }: editInterface) => {

    return (
        <Card sx={{ p: 3 }}>
            <LabelStyle>Employee Name</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="firstName" label="First Name" disabled={isEdit} fullWidth />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="firstName_ar" label="First Name  (AR)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="middleName" label="Middle Name" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="middleName_ar" label="Middle Name (AR)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="lastName" label="Last Name" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="lastName_ar" label="Last Name (AR)" disabled={isEdit} />
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
                        style={{ width: "100%", height: "100%", fontSize: "1rem" }}
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
                    {/* <RHFTextField name="EIDExpirydate" label="EID Expiry date" disabled={isEdit} /> */}


                    <Controller
                        name="EIDExpirydate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                label="EID Expiry date"
                                value={field.value}
                                onChange={(newValue) => {
                                    field.onChange(newValue);
                                }}
                                minDate={today}
                                disabled={isEdit}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth error={!!error} helperText={error?.message} disabled={isEdit} />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="occupation_en" label="Occupation (E.N)" disabled={isEdit} />
                </Grid>
                <Grid item md={6} xs={12}>
                    {/* <RHFTextField name="visaExpiryDate" label="Visa Expiry Date" disabled={isEdit} /> */}

                    <Controller
                        name="visaExpiryDate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                label="visa Expiry Date"
                                value={field.value}
                                onChange={(newValue) => {
                                    field.onChange(newValue);
                                }}
                                minDate={today}
                                disabled={isEdit}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth error={!!error} helperText={error?.message} disabled={isEdit} />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    {/* <RHFTextField name="passportExpiryDate" label="Passport Expiry Date" disabled={isEdit} /> */}

                    <Controller
                        name="passportExpiryDate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                label="passport Expiry Date"
                                value={field.value}
                                onChange={(newValue) => {
                                    field.onChange(newValue);
                                }}
                                minDate={today}
                                disabled={isEdit}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth error={!!error} helperText={error?.message} disabled={isEdit} />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
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



    return (

        <Card sx={{ p: 3 }} style={{ marginTop: "2rem" }}>
            <LabelStyle>Employee Documents</LabelStyle>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body1" mt={2} >
                    {!currentFile && "Upload employee one page document (PDF)"} {!currentFile && uploadedFile && <br />}
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

interface dropDownData {
    data: {
        Designation: string[],
        Company: string[],
        Department: string[],
    },
    isEdit?: boolean
}

export const OfficialDetails = ({ data, isEdit }: dropDownData) => {
    const keys = Object.keys(data)

    return (
        <Card sx={{ p: 3 }}>
            <LabelStyle>Official Details</LabelStyle>
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

                <RHFSelect name="nationality"  label="Choose Nationality" placeholder="India" disabled={isEdit}>
                    <option value="" selected={true} ></option>
                    {countries.map((option) => (
                        <option key={option.code} value={option.label}>
                            {option.label}
                        </option>
                    ))}
                </RHFSelect>
            </div>

        </Card>
    )
}