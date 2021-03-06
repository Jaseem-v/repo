import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { EmployeeSchema } from './common/EmployeeSchema';
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, Button, Container, Stack } from '@mui/material';
import { FormProvider } from '../../components/hook-form';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CommonDetails, DocumentDetails, EmployeeFileUpload, OfficialDetails } from './common/EmployeeFormComponents';
// icons

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { SaveOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { SubmitBtn } from '../../components/ButtonSet';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormValidInputs } from './NewEmployee';


interface uploadedFileInterface {
    name?: string

}



const data = {
    Designation: ["Designation-1", "Designation-2", "Designation-3", "Designation-4", "Designation-5"],
    Company: ["Company-1", "Company-2", "Company-3", "Company-4", "Company-5"],
    Department: ["Department-1", "Department-2", "Department-3", "Department-4", "Department-5"],
}



export default function EditEmployee() {
    const theme = useTheme()
    const currentUser = {
        firstName: 'Lionel',
        firstName_ar: 'Lionel',
        middleName: 'Andress',
        middleName_ar: 'Andress',
        lastName: 'Messi',
        lastName_ar: 'Messi',
        passportNumber: '2a4568752',
        emiratesID: '2a4568752',
        EIDExpirydate: '2022-04-30T00:17:55.000Z',
        occupation_en: 'Business',
        visaExpiryDate: '2022-04-30T00:17:55.000Z',
        passportExpiryDate: '2022-04-30T00:17:55.000Z',
        occupation_ar: 'Business',
        phonenumber: "+91 97845 61230",
        email: "abc@gmail.com",
        nationality: { code: "in", label: "India", phone: "91" },
        docImage: "document-1.pdf"

    }


    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo((): FormValidInputs => ({
        firstName: currentUser?.firstName,
        firstName_ar: currentUser?.firstName_ar,
        middleName: currentUser?.middleName,
        middleName_ar: currentUser?.middleName_ar,
        lastName: currentUser?.lastName,
        lastName_ar: currentUser?.lastName_ar,
        passportNumber: currentUser?.passportNumber,
        emiratesID: currentUser?.emiratesID,
        EIDExpirydate: currentUser?.EIDExpirydate,
        occupation_en: currentUser?.occupation_en,
        visaExpiryDate: currentUser?.visaExpiryDate,
        passportExpiryDate: currentUser?.passportExpiryDate,
        occupation_ar: currentUser?.occupation_ar,
        phonenumber: currentUser?.phonenumber,
        email: currentUser?.email,
        nationality: currentUser?.nationality,
        docImage: currentUser?.docImage

    }), [currentUser])



    const methods = useForm({
        resolver: yupResolver(EmployeeSchema),
        defaultValues,
    })

    const { formState: { errors } } = useForm()

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

    const [uploadedFile, setUploadedFile] = useState<null | uploadedFileInterface>({})

    const [isEdit, setIsEdit] = useState<boolean>(true)

    const largeScreen = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                <Page title="Employee Details">
                    <Container maxWidth={"xl"}>
                        <Stack
                            direction={largeScreen ? "row" : "column"}
                            justifyContent="space-between"
                            alignItems="space-between"
                            mb={5}
                        >

                            <HeaderBreadcrumbs
                                heading="Employee Details"
                                links={[
                                    { name: 'Employees', href: "/dashboard/app" },

                                    { name: "Employee Details", href: "/dashboard/EmployeeDetails", }
                                ]}
                                style={{ marginBottom: 0 }}
                            />

                            <Stack direction={"row"}
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={3}>
                                {isEdit && <>
                                    <Button variant='outlined' color="warning" startIcon={<DisabledByDefaultIcon />}  >
                                        Block
                                    </Button>
                                    <Button variant='outlined' color="error" startIcon={<DeleteIcon />} >
                                        Delete
                                    </Button>
                                </>
                                }
                                {isEdit &&
                                    <Button variant='contained' color="primary" startIcon={<CreateOutlinedIcon />} onClick={() => setIsEdit(!isEdit)}>
                                        Edit Details
                                    </Button>
                                }
                            </Stack>

                        </Stack>
                        <Grid container spacing={3}>
                            <Grid item md={8} xs={12}>

                                <CommonDetails isEdit={isEdit} errors={errors} />
                                <DocumentDetails isEdit={isEdit} />
                                <EmployeeFileUpload detailsPage={true} setValue={setValue} getValue={getValues} isEdit={isEdit} />

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
                            <Grid item md={4} xs={12} >
                                <OfficialDetails data={data} isEdit={isEdit} setValue={setValue} getValue={getValues} />


                            </Grid>

                        </Grid>

                    </Container>
                </Page>


            </FormProvider>
        </div >
    );
}
