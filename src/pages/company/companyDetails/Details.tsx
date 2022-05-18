import {
    FormProvider,
} from '../../../components/hook-form';
import {
    Card,
    Grid,
    Button,
    Stack,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import {
    AssignDirectors,
    BasicDetails,
    ContactPersonDetails,
    ContractDetails,
    Status
} from '../common/FormComponents';
import { companySchema } from '../companySchema';
import { SubmitBtn } from '../../../components/ButtonSet';

// icons 

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { SaveOutlined } from '@mui/icons-material';


const extendedCompanySchema = companySchema.concat(Yup.object({
    status: Yup.string().required('Required Field'),
}))

type editProps = {
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CompanyDetailsWithEditForm({ isEdit, setIsEdit }: editProps) {
    const theme = useTheme()
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'))
    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo(() => ({
        name_ar: 'Arabic Name',
        name_en: 'English Name',
        trade_license: 'ABCGTE453RTSGS',
        trade_license_expiry: '12-12-2023',
        phone: '09877363865',
        remarks: 'hello world',
        director: 'sakeer',
        director_role: 'Admin',
        contract_purpose: 'New Purpose',
        contract_no: '123456',
        employee_required: '230',
        reliever_count: '32',
        first_name: 'Mohammed',
        last_name: 'sakeer',
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
                    <BasicDetails isEdit={isEdit} />
                    <AssignDirectors isEdit={isEdit} />
                    {!isEdit &&
                        <Stack
                            direction={largeScreen ? "row" : "column"}
                            justifyContent="flex-start"
                            alignItems="center"
                            mt={5}
                        >
                            <SubmitBtn variant='outlined' startIcon={<CloseOutlinedIcon />} onClick={() => setIsEdit(!isEdit)}>
                                {"Cancel"}
                            </SubmitBtn>
                            <SubmitBtn variant="contained" startIcon={<SaveOutlined />} type="submit"> Save Changes</SubmitBtn>

                        </Stack>
                    }
                </Grid>
                <Grid item xs={12} md={4} >
                    <Status />
                    <ContactPersonDetails isEdit={isEdit} />
                    {/* <Card sx={{ p: 3, m: 2 }}>
                        <Button variant='contained' type='submit'>Submit</Button>
                    </Card> */}
                </Grid>
            </Grid>
        </FormProvider>
    )
}