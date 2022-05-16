import React, { useRef, ChangeEvent, useState, useEffect } from 'react'
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

import { RHFTextField, RHFSelect, RHFRadioGroup } from '../../../../components/hook-form';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import {
    countries
} from "../../../../data/_countries"
// import DetailsSelect from '../DetailsSelect';
import { useFormContext, Controller, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import { FormValidInputs } from '../../CompanyRegitsrationForm';

import TableComponent from "../../TableComponent"
import { inputValueProps } from 'src/pages/emplyees/common/EmployeeFormComponents';
import { stafflistFormValue } from '../StaffListTable';

// Types
// LabelStyle

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: "#000",
    fontSize: "1.2rem",
    marginBottom: theme.spacing(1),
}));



export const OwnerPopup = () => {
    const GENDER_OPTION = [
        { label: 'Owner', value: 'Owner' },
        { label: 'Partner', value: 'Partner' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <LabelStyle sx={{ marginBottom: 3 }}>Owner/Partner Info</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="ownerName" label="Owner Name (EN)" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="ownerName_ar" label="Owner Name  (AR)" dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <div>
                        <LabelStyle style={{ fontSize: "1rem", color: "#637381", fontWeight: "400", marginBottom: " 0px" }}>Position Type</LabelStyle>
                        <RHFRadioGroup
                            name="position"
                            options={GENDER_OPTION}
                            sx={{
                                '& .MuiFormControlLabel-root': { mr: 4 },
                            }}
                            style={{ marginLeft: "1rem" }}
                        />
                    </div>
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="unified_code" type="number" label="Unified Code" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="work_place" label="Place Of Work" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="work_place_ar" label="Place Of Work (AR)" dir="rtl" />
                </Grid>
                <Grid item md={12} xs={12}>
                    <RHFTextField name="Notes" label="Notes" multiline rows={3} />
                </Grid>
            </Grid>
        </Box>
    )
}
export const AuthorisedSignaturePopup = () => {

    return (
        <Box sx={{ p: 3 }}>
            <LabelStyle sx={{ marginBottom: 3 }}>Authorised Signature Info</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="ownerName" label="Owner Name (EN)" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="ownerName_ar" label="Owner Name  (AR)" dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Autocomplete
                        id="nationality"
                        fullWidth
                        options={countries}
                        autoHighlight
                        autoSelect
                        getOptionLabel={(option) => option.label}
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
                        renderInput={(params) => (
                            <RHFTextField name="nationality" {...params}
                                label="Choose Nationality"
                            />
                        )}

                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyActivity_ar" type="number" label="Unified Code" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyCode" label="Place Of Work" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="companyCode_ar" label="Place Of Work (AR)" dir="rtl" />
                </Grid>
                <Grid item md={12} xs={12}>
                    <RHFTextField name="Notes" label="Notes" multiline rows={3} />
                </Grid>
            </Grid>
        </Box>
    )
}

interface stafflistProps {
    setValue: UseFormSetValue<stafflistFormValue>
    getValue: UseFormGetValues<stafflistFormValue>
}
export const StaffListPopup = ({ setValue, getValue }: stafflistProps) => {

    return (
        <Box sx={{ p: 3 }}>
            <LabelStyle sx={{ marginBottom: 3 }}>Staff List - Administration Info</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="staffName" label="Name (EN)" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="staffName_ar" label="Name  (AR)" dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
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

                        renderInput={(params) => (
                            <RHFTextField name="nationality" {...params}
                                label="Choose Nationality"

                                value={getValue("nationality.label") ? getValue("nationality.label") : ""}
                            />
                        )}
                        defaultValue={getValue("nationality.label") ? getValue("nationality") : undefined}

                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="unified_code" type="number" label="Unified Code" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="job" label="Job" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="job_ar" label="Job (AR)" dir="rtl" />
                </Grid>
                <Grid item md={12} xs={12}>
                    <RHFTextField name="notes" label="Notes" multiline rows={3} />
                </Grid>
            </Grid>
        </Box>
    )
}
export const NationalitiesWorkingPopup = () => {

    return (
        <Box sx={{ p: 3 }}>
            <LabelStyle sx={{ marginBottom: 3 }}>Nationalities Working</LabelStyle>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <RHFTextField name="numbers" label="Number" dir="rtl" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Autocomplete
                        id="nationality"
                        fullWidth
                        options={countries}
                        autoHighlight
                        autoSelect
                        getOptionLabel={(option) => option.label}
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
                        renderInput={(params) => (
                            <RHFTextField name="nationality" {...params}
                                label="Choose Nationality"
                            />
                        )}

                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <RHFTextField name="Notes" label="Notes" multiline rows={3} />
                </Grid>
            </Grid>
        </Box>
    )
}


