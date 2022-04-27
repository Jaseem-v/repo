import { useState, useRef, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { companySchema } from './common/EmployeeSchema';
import { styled } from '@mui/material/styles';

// icons

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { SaveOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';


import {
    Card,
    Grid,
    Typography,
    Button,
    Container
} from '@mui/material';

import {
    FormProvider,
} from '../../components/hook-form';
import DetailsSelect from './DetailsSelect';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { CommonDetails, DocumentDetails, EmployeeFileUpload } from './common/EmployeeFormComponents';

export interface IAppProps {
}

interface uploadedFileInterface {
    name?: string

}



const data = {

    email: ["email-1", "email-2", "email-3", "email-4", "email-5"],
    Designation: ["Designation-1", "Designation-2", "Designation-3", "Designation-4", "Designation-5"],
    Company: ["Company-1", "Company-2", "Company-3", "Company-4", "Company-5"],
    Department: ["Department-1", "Department-2", "Department-3", "Department-4", "Department-5"],
    Nationality: ["Nationality-1", "Nationality-2", "Nationality-3", "Nationality-4", "Nationality-5"],

}


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

type props = {
    isEdit?: boolean;
}

export default function EditEmployee() {

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

    }


    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo(() => ({
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
    }), [currentUser])



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

    const [uploadedFile, setUploadedFile] = useState<null | uploadedFileInterface>({})

    const [edit, setEdit] = useState<boolean>(false)


    const uploadInputRef = useRef(null)

    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                <Page title="Ecommerce: Create a new product">
                    <Container maxWidth={"lg"}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>

                            <HeaderBreadcrumbs
                                heading="Add New Employee"
                                links={[
                                    { name: 'Employees', href: "/dashboard/app" },

                                    { name: "Addnew", href: "/dashboard/addnew", }
                                ]}
                            />

                            <div>
                                <Button variant='contained' color="warning" startIcon={<DisabledByDefaultIcon />} style={{ marginTop: "1rem", marginRight: "1rem" }} onClick={() => setEdit(!edit)}>
                                    Disable
                                </Button>
                                <Button variant='contained' color="error" startIcon={<DeleteIcon />} style={{ marginTop: "1rem", marginRight: "1rem" }} onClick={() => setEdit(!edit)}>
                                    Delete
                                </Button>
                                <Button variant='contained' color="secondary" startIcon={<CreateOutlinedIcon />} style={{ marginTop: "1rem" }} onClick={() => setEdit(!edit)}>
                                    Edit
                                </Button>
                            </div>

                        </div>
                        <Grid container spacing={3}>
                            <Grid item md={8}>

                                <CommonDetails />
                                <DocumentDetails />
                                <EmployeeFileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />



                            </Grid>
                            <Grid item md={4} >
                                <Card sx={{ p: 3 }}>
                                    <LabelStyle>Official Details</LabelStyle>

                                    <DetailsSelect data={data["email"]} />
                                    <DetailsSelect data={data["Designation"]} />
                                    <DetailsSelect data={data["Company"]} />
                                    <DetailsSelect data={data["Department"]} />
                                    <DetailsSelect data={data["Nationality"]} />
                                </Card>


                                <Button variant="contained" style={{ width: "100%", marginTop: "3rem" }} endIcon={<SaveOutlined />} type="submit">Save</Button> : ""

                            </Grid>

                        </Grid>

                    </Container>
                </Page>


            </FormProvider>
        </div >
    );
}
