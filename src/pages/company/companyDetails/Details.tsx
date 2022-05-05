import {
    FormProvider,
} from 'src/components/hook-form';
import {
    Card,
    Grid,
    Button
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import {
    AssignDirectors,
    BasicDetails,
    ContactPersonDetails,
    ContractDetails,
    Status
} from '../common/FormComponents';
import { companySchema } from '../companySchema';


const extendedCompanySchema = companySchema.concat(Yup.object({
    status: Yup.string().required('Required Field'),
}))


export default function CompanyDetailsWithEditForm() {

    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo(() => ({
        name_ar: 'Arabic Name',
        name_en: 'English Name',
        trade_license: 'ABCGTE453RTSGS',
        trade_license_expiry: '12-12-2023',
        phone: '09877363865',
        remarks: 'hello world',
        director: 'Shahul',
        director_role: 'Admin',
        contract_purpose: 'New Purpose',
        contract_no: '123456',
        employee_required: '230',
        reliever_count: '32',
        first_name: 'Mohammed',
        last_name: 'Shahul',
        email: 'sbc@sb.com',
        phone_2: '98574673647',
        status: '',
    }), [])

    const methods = useForm({
        resolver: yupResolver(extendedCompanySchema),
        defaultValues,
    })

    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = (data: any) => {
        console.log(data)
        enqueueSnackbar('Successfully Updated', { variant: 'success' })
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} >
                    <BasicDetails />
                    <AssignDirectors />
                    <ContractDetails />
                </Grid>
                <Grid item xs={12} md={4} >
                    <Status />
                    <ContactPersonDetails />
                    <Card sx={{ p: 3, m: 2 }}>
                        <Button variant='contained' type='submit'>Submit</Button>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    )
}