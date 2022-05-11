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
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import { GridBox, LabelStyle } from 'src/styles/global';

type componentProps = {
    isEdit: boolean
}



export function BasicDetails({ isEdit }: componentProps) {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Basic Details</LabelStyle>
            <GridBox>
                <RHFTextField name='name_en' label='Company Name (EN)' disabled={isEdit} />
                <RHFTextField name='name_ar' label='Company Name (AR)' dir='rtl' disabled={isEdit} />
                <RHFTextField name='trade_license' label='Trade License' disabled={isEdit} />
                {/* <RHFTextField name='trade_license_expiry' label='Trade License Expiry' /> */}
                <RHFDatePicker name="trade_license_expiry" label="Trade License Expiry" disabled={isEdit} />
                <RHFTextField name='phone' label='Phone' disabled={isEdit} />
                <RHFTextField name='remarks' label='Remarks' disabled={isEdit} />
            </GridBox>
        </Card>
    )
}


export function AssignDirectors({ isEdit }: componentProps) {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Assign Directors</LabelStyle>
            <GridBox>
                <RHFSelect name='director' label='Director' disabled={isEdit}>
                    <option value='1'> Option 1 </option>
                    <option value='2'> Option 2 </option>
                    <option value='3'> Option 3 </option>
                </RHFSelect>

                <RHFSelect name='director_role' label='Deligate Director' disabled={isEdit}>
                    <option value='1'> Option 1 </option>
                    <option value='2'> Option 2 </option>
                    <option value='3'> Option 3 </option>
                </RHFSelect>
            </GridBox>
        </Card>
    )
}


export function ContractDetails({ isEdit }: componentProps) {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Contract Details</LabelStyle>
            <GridBox>
                <RHFTextField name='contract_purpose' label='Contract Purpose' disabled={isEdit} />
                <RHFTextField name='contract_no' label='Contract No' disabled={isEdit} />
                <RHFTextField name='employee_required' type="number" label='Employees Required' disabled={isEdit} />
                <RHFTextField name='reliever_count' type="number" label='Reliever Count' disabled={isEdit} />
            </GridBox>
        </Card>

    )
}


export function ContactPersonDetails({ isEdit }: componentProps) {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Contact Person Details</LabelStyle>
            <Stack spacing={3}>
                <RHFTextField name='first_name' label='First Name' disabled={isEdit} />
                <RHFTextField name='last_name' label='Last Name' disabled={isEdit} />
                <RHFTextField name='email' label='Email' disabled={isEdit} />
                <RHFTextField name='phone_2' label='Phone' disabled={isEdit} />
            </Stack>
        </Card>
    )
}



export function Status() {

    return (
        <Card sx={{ p: 3, my: 2 }}>
            <LabelStyle>Status</LabelStyle>
            <RHFSelect name='status' label='Status' >
                <option value=''> </option>
                <option value='1'> GHQ Approved </option>
                <option value='2'> GHQ Rejected </option>
            </RHFSelect>
        </Card>
    )
}