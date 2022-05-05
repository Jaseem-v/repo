import {
    Card, Stack,
} from '@mui/material'
import {
    RHFSwitch,
    RHFSelect,
    RHFEditor,
    RHFTextField,
    RHFRadioGroup,
} from 'src/components/hook-form';
import { GridBox, LabelStyle } from 'src/styles/global';



export function BasicDetails() {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Basic Details</LabelStyle>
            <GridBox>
                <RHFTextField name='name_en' label='Company Name (en)' />
                <RHFTextField name='name_ar' label='Company Name (ar)' />
                <RHFTextField name='trade_license' label='Trade License' />
                <RHFTextField name='trade_license_expiry' label='Trade License Expiry' />
                <RHFTextField name='phone' label='Phone' />
                <RHFTextField name='remarks' label='Remarks' />
            </GridBox>
        </Card>
    )
}


export function AssignDirectors() {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Assign Directors</LabelStyle>
            <GridBox>
                <RHFSelect name='director' label='Director'  >
                    <option value='1'> Option 1 </option>
                    <option value='2'> Option 2 </option>
                    <option value='3'> Option 3 </option>
                </RHFSelect>

                <RHFSelect name='director_role' label='Deligate Director'  >
                    <option value='1'> Option 1 </option>
                    <option value='2'> Option 2 </option>
                    <option value='3'> Option 3 </option>
                </RHFSelect>
            </GridBox>
        </Card>
    )
}


export function ContractDetails() {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Contract Details</LabelStyle>
            <GridBox>
                <RHFTextField name='contract_purpose' label='Contract Purpose' />
                <RHFTextField name='contract_no' label='Contract No' />
                <RHFTextField name='employee_required' label='Employee Required' />
                <RHFTextField name='reliever_count' label='Reliever Count' />
            </GridBox>
        </Card>

    )
}


export function ContactPersonDetails() {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Contract Person Details</LabelStyle>
            <Stack spacing={3}>
                <RHFTextField name='first_name' label='First Name' />
                <RHFTextField name='last_name' label='Last Name' />
                <RHFTextField name='email' label='Email' />
                <RHFTextField name='phone_2' label='Phone' />
            </Stack>
        </Card>
    )
}



export function Status() {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Status</LabelStyle>
            <RHFSelect name='status' label='Status'  >
                <option value=''> </option>
                <option value='1'> GHQ Approved </option>
                <option value='2'> GHQ Rejected </option>
            </RHFSelect>
        </Card>
    )
}