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

import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { AssignDirectors, BasicDetails, ContactPersonDetails, ContractDetails } from '../common/FormComponents';
import { companySchema } from '../companySchema';


export default function CreateNewCompanyForm() {

    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo(() => ({
        name_ar: '',
        name_en: '',
        trade_license: '',
        trade_license_expiry: '',
        phone: '',
        remarks: '',
        director: '',
        director_role: '',
        contract_purpose: '',
        contract_no: '',
        employee_required: '',
        reliever_count: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_2: '',
    }), [])

    const methods = useForm({
        resolver: yupResolver(companySchema),
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
        enqueueSnackbar('Successfully Added', { variant: 'success' })
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
                    <ContactPersonDetails />
                    <Card sx={{ p: 2, m: 1 }}>
                        <Button variant='contained' type='submit'>Submit</Button>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    )
}