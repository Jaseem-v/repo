import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { EmployeeSchema } from './common/EmployeeSchema';
import { styled } from '@mui/material/styles';
import { useStyles } from './common/EmployeeStyle';
import { Card, Grid, Typography, Button, Container } from '@mui/material';
import { FormProvider } from '../../components/hook-form';
import DetailsSelect from './DetailsSelect';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { CommonDetails, DocumentDetails, EmployeeFileUpload, OfficialDetails } from './common/EmployeeFormComponents';
// icons

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { SaveOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';




interface uploadedFileInterface {
    name?: string

}



const data = {
    Designation: ["Designation-1", "Designation-2", "Designation-3", "Designation-4", "Designation-5"],
    Company: ["Company-1", "Company-2", "Company-3", "Company-4", "Company-5"],
    Department: ["Department-1", "Department-2", "Department-3", "Department-4", "Department-5"],
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
    const classes = useStyles();
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
        phonenumber:"+91 97845 61230",
        email:"abc@gmail.com",
        nationality:"India"

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
        phonenumber: currentUser?.phonenumber,
        email: currentUser?.email,
        nationality:currentUser?.nationality
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

    console.log("error", errors);




    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                <Page title="Ecommerce: Create a new product">
                    <Container maxWidth={"lg"}>
                        <div className={classes.flexBox}>

                            <HeaderBreadcrumbs
                                heading="Employee Details"
                                links={[
                                    { name: 'Employees', href: "/dashboard/app" },

                                    { name: "EmployeeDetails", href: "/dashboard/EmployeeDetails", }
                                ]}
                            />

                            <div>
                                {isEdit && <>
                                    <Button variant='contained' color="warning" startIcon={<DisabledByDefaultIcon />} className={classes.funcButtons} >
                                        Disable
                                    </Button>
                                    <Button variant='contained' color="error" startIcon={<DeleteIcon />} className={classes.funcButtons}>
                                        Delete
                                    </Button>
                                </>
                                }
                                {isEdit &&
                                    <Button variant='contained' color={"info"} startIcon={<CreateOutlinedIcon />} style={{ marginTop: "1rem" }} onClick={() => setIsEdit(!isEdit)}>
                                        Edit
                                    </Button>
                                }
                            </div>

                        </div>
                        <Grid container spacing={3}>
                            <Grid item md={8} xs={12}>

                                <CommonDetails isEdit={isEdit} errors={errors} />
                                <DocumentDetails isEdit={isEdit} />
                                <EmployeeFileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} currentFile="details.doc" isEdit={isEdit} />

                                {!isEdit &&
                                    <div style={{ display: "flex", justifyContent: "start" }}>
                                        <Button variant="contained" style={{ width: "auto", height: "3rem", marginTop: "3rem", padding: "1rem 3rem", marginRight: "1rem" }} endIcon={<SaveOutlined />} type="submit">Save</Button>
                                        <Button variant='contained' color={"success"} startIcon={<CloseOutlinedIcon />} style={{ width: "auto", height: "3rem", marginTop: "3rem", padding: "1rem 3rem" }} onClick={() => setIsEdit(!isEdit)}>
                                            {"Cancel"}
                                        </Button>
                                    </div>
                                }

                            </Grid>
                            <Grid item md={4} xs={12} >
                                <OfficialDetails data={data} isEdit={isEdit} />



                            </Grid>

                        </Grid>

                    </Container>
                </Page>


            </FormProvider>
        </div >
    );
}
