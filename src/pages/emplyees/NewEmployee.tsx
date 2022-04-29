import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { EmployeeSchema } from './common/EmployeeSchema';
import { styled } from '@mui/material/styles';
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useNavigate } from 'react-router-dom'






import {
    Card,
    Grid,
    Typography,
    Button,
    Container,
    Stepper,
    Step,
    StepLabel,
    Box,
    StepButton
} from '@mui/material';

import {
    FormProvider,
} from '../../components/hook-form';
import DetailsSelect from './DetailsSelect';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { CommonDetails, DocumentDetails, EmployeeFileUpload, OfficialDetails } from './common/EmployeeFormComponents';



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



export default function NewEmployee() {
    let navigate = useNavigate();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo(() => ({
        firstName: '',
        firstName_ar: '',
        middleName: '',
        middleName_ar: '',
        lastName: '',
        lastName_ar: '',
        passportNumber: '',
        emiratesID: '',
        EIDExpirydate: '',
        occupation_en: '',
        visaExpiryDate: '',
        passportExpiryDate: '',
        occupation_ar: '',
        phonenumber: '',
        email: '',
        nationality: ""
    }), []);



    const methods = useForm({
        resolver: yupResolver(EmployeeSchema),
        defaultValues,
    })

    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting, errors },
        clearErrors
    } = methods;

    const values = watch();


    const onSubmit = (data: any) => {
        if (Object.keys(errors).length === 0 && activeStep === 2) {
            enqueueSnackbar('Successfully Added', { variant: 'success' })
            navigate("/dashboard/app")
        }
    }

    // console.log(errors);


    const [uploadedFile, setUploadedFile] = useState<null | uploadedFileInterface>({})

    const steps = [
        'Basic Details',
        'Document Details',
        'Official Details',
    ];


    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };
    // clean function

    let CleanErrorOneTime = (function () {
        let executed = false;
        return function () {
            if (!executed) {
                executed = true;
                console.log("cleared");

                clearErrors(["passportExpiryDate", "passportNumber",
                    "emiratesID",
                    "EIDExpirydate",
                    "occupation_en",
                    "visaExpiryDate",
                    "passportExpiryDate",
                    "occupation_ar"])
            }
        };
    })();
    let CleanErrorSecondTime = (function () {
        let executed = false;
        return function () {
            if (!executed) {
                executed = true;
                console.log("cleared-2");

                // clearErrors(["passportExpiryDate", "passportNumber",
                //     "emiratesID",
                //     "EIDExpirydate",
                //     "occupation_en",
                //     "visaExpiryDate",
                //     "passportExpiryDate",
                //     "occupation_ar"])
            }
        };
    })();
    useEffect(() => {

        ["firstName", "firstName_ar", "lastName", "lastName_ar", "middleName_ar", "middleName"].map((el1) => {
            if (errors && errors.hasOwnProperty(el1)
            ) {
                setActiveStep(0)
            }
            if (errors && !(errors.hasOwnProperty(el1))) {
                ["passportExpiryDate", "passportNumber", "emiratesID", "EIDExpirydate", "visaExpiryDate", "passportExpiryDate"].map((el2) => {
                    if (errors.hasOwnProperty(el2)) {
                        setActiveStep(1)
                    }

                    if (errors && activeStep == 2 && !errors.hasOwnProperty(el1) && !errors.hasOwnProperty(el2)
                    ) {
                        CleanErrorOneTime();
                    }
                })

            }

            if (errors && activeStep == 1 && !errors.hasOwnProperty(el1)
            ) {
                CleanErrorOneTime();
            }
        })


    }, [errors])



    const handleNext = () => {
        const newActiveStep =
            isLastStep() ? activeStep
                : activeStep + 1;
        setActiveStep(newActiveStep);

    };



    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };





    return (
        <div>
            {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}

            <Page title="Ecommerce: Create a new product">
                <Container maxWidth={"lg"}>
                    <div>

                        <HeaderBreadcrumbs
                            heading="Add New Employee"
                            links={[
                                { name: 'Employees', href: "/dashboard/app" },

                                { name: "Addnew", href: "/dashboard/addnew", }
                            ]}
                        />

                    </div>

                    <Box sx={{ width: '100%' }} >
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]} >
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div style={{ margin: "3rem auto" }}>

                            <Fragment>

                                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                    {
                                        activeStep === 0 &&
                                        <CommonDetails isEdit={false} />
                                    }
                                    {
                                        activeStep === 1 &&
                                        <>
                                            <DocumentDetails isEdit={false} />
                                            <EmployeeFileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                                        </>


                                    }
                                    {
                                        activeStep === 2 &&
                                        <OfficialDetails data={data} isEdit={false} />

                                    }
                                    {/* <pre>
                                            {JSON.stringify(watch(), null, 2)}
                                        </pre> */}

                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 3 }} >
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext} sx={{ mr: 1 }} type="submit">
                                            {!isLastStep() ? "Next" : "finish"}
                                        </Button>
                                    </Box>
                                </FormProvider>

                            </Fragment>

                        </div>
                    </Box>
                    <Grid container spacing={3} mt={2}>
                        <Grid item md={12} xs={12}>

                            {/* <CommonDetails isEdit={false} /> */}
                            {/* <BasicDetails /> */}
                            {/* <DocumentDetails isEdit={false} /> */}
                            {/* <EmployeeFileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} /> */}




                            {/* <div style={{ display: "flex", justifyContent: "center" }}>

                                    <Button variant="contained" size="medium" style={{ width: "auto", height: "3rem", marginTop: "3rem", padding: "1rem 3rem" }}
                                        type="submit">
                                        Submit
                                    </Button>
                                </div> */}


                        </Grid>
                        {/* <Grid item md={12} xs={12}>

                                <OfficialDetails data={data} isEdit={false} />

                            </Grid> */}

                    </Grid>

                </Container>
            </Page>


            {/* </FormProvider> */}
        </div >
    );
}
