import * as React from 'react';
import { CommonDetails } from '../common/EmployeeFormComponents';
import { FormProvider } from '../../../components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { BasicDetilsSchema } from "../common/EmployeeSchema"




const currentUser = {
    firstName: 'Lionel',
    firstName_ar: 'Lionel',
    middleName: 'Andress',
    middleName_ar: 'Andress',
    lastName: 'Messi',
    lastName_ar: 'Messi',
    passportNumber: '2a4568752',
    emiratesID: '2a4568752',
    EIDExpirydate: '24/5/2024',
    occupation_en: 'Business',
    visaExpiryDate: '24/5/2024',
    passportExpiryDate: '30/5/2023',
    occupation_ar: 'Business',
    phonenumber: "+91 97845 61230",
    email: "abc@gmail.com",
    nationality: "India"

}




export interface IAppProps {
}

export default function BasicDetails(props: IAppProps) {


    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo(() => ({
        firstName: '',
        firstName_ar: '',
        middleName: '',
        middleName_ar: '',
        lastName: '',
        lastName_ar: '',
    }), []);



    const methods = useForm({
        resolver: yupResolver(BasicDetilsSchema),
        defaultValues,
    })

    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = (data: any) => {
        console.log(data)
        enqueueSnackbar('Successfully Added', { variant: 'success' })
    }
    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <CommonDetails isEdit={false} />
            </FormProvider>

        </div>
    );
}










