import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { EmployeeSchema } from './common/EmployeeSchema';
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
    Container,
    Stepper,
    Step,
    StepLabel,
    Box,
    Stack,
} from '@mui/material';

import { FormProvider } from '../../components/hook-form';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { CommonDetails, DocumentDetails, EmployeeFileUpload, OfficialDetails } from './common/EmployeeFormComponents';
import { SubmitBtn } from 'src/components/ButtonSet';


// types
interface uploadedFileInterface {
    name?: string
}


export interface FormValidInputs {
    firstName: string;
    firstName_ar: string;
    middleName: string;
    middleName_ar: string;
    lastName: string;
    lastName_ar: string;
    passportNumber: string;
    emiratesID: string;
    EIDExpirydate: string;
    docImage: string;
    occupation_en: string,
    visaExpiryDate: string,
    passportExpiryDate: string,
    occupation_ar: string,
    phonenumber: string,
    email: string,
    nationality?: { code: string, label: string, phone: string }
}

const data = {
    Designation: ["Designation-1", "Designation-2", "Designation-3", "Designation-4", "Designation-5"],
    Company: ["Company-1", "Company-2", "Company-3", "Company-4", "Company-5"],
    Department: ["Department-1", "Department-2", "Department-3", "Department-4", "Department-5"],

}






export default function NewEmployee() {
    let navigate = useNavigate();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo((): FormValidInputs => ({
        firstName: "",
        firstName_ar: "",
        middleName: "",
        middleName_ar: "",
        lastName: "",
        lastName_ar: "",
        passportNumber: "",
        emiratesID: "",
        EIDExpirydate: "",
        occupation_en: "",
        visaExpiryDate: "",
        passportExpiryDate: "",
        occupation_ar: "",
        phonenumber: "",
        email: "",
        nationality: { code: "", label: "", phone: "" },
        docImage: ""
    }), []);



    const methods = useForm({
        resolver: yupResolver(EmployeeSchema),
        defaultValues,
    })

    const {
        watch,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
        getValues
    } = methods;


    const onSubmit = (data: any) => {
        if (formSubmit) {
            enqueueSnackbar('Successfully Added', { variant: 'success' })
            navigate("/dashboard/app")
        }
    }

    const [uploadedFile, setUploadedFile] = useState<null | uploadedFileInterface>({})
    const [formSubmit, setFormSubmit] = useState<boolean>(false)

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


    // clean function

    const [clear1, setClear] = useState(true)

    let CleanErrorOneTime = (function () {
        let executed = false;
        return function () {
            if (!executed) {
                executed = true;
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
    let CleanErrorSecondTime = function () {

        if (clear1) {
            setClear(false)

            clearErrors(["email", "phonenumber",
                "nationality"
            ])
        }
    };
    useEffect(() => {
        let form1 = ["firstName", "firstName_ar", "lastName", "lastName_ar", "middleName_ar", "middleName"]
        let form2 = ["passportExpiryDate", "passportNumber", "emiratesID", "EIDExpirydate", "visaExpiryDate", "passportExpiryDate"]
        let form3 = ["email", "phonenumber", "nationality"]
        form1.map((el1) => {
            if (errors && errors.hasOwnProperty(el1)
            ) {
                setActiveStep(0)
            }
            if (errors && !(errors.hasOwnProperty(el1))) {
                form2.map((el2) => {
                    if (errors.hasOwnProperty(el2)) {
                        setActiveStep(1)
                    }

                })

            }

            if (errors && activeStep == 1 && !errors.hasOwnProperty(el1)
            ) {
                CleanErrorOneTime();


            }

            if (errors && activeStep == 2 && !errors.hasOwnProperty(el1)
            ) {
                form2.map((el) => {
                    if (!errors.hasOwnProperty(el)) {
                        CleanErrorSecondTime()
                    }
                })

            }

            if (Object.keys(errors).length === 0 && activeStep === 2) {
                setFormSubmit(true)
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





    return (
        <div>

            <Page title="Ecommerce: Create a new product">
                <Container maxWidth={"lg"}>
                    <Stack mb={5}>

                        <HeaderBreadcrumbs
                            heading="Add New Employee"
                            links={[
                                { name: 'Employees', href: "/dashboard/app" },

                                { name: "Addnew", href: "/dashboard/addnew", }
                            ]}
                        />

                    </Stack>

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
                                            <EmployeeFileUpload
                                                uploadedFile={uploadedFile}
                                                setUploadedFile={setUploadedFile} />
                                        </>


                                    }
                                    {
                                        activeStep === 2 &&
                                        <OfficialDetails data={data} isEdit={false} setValue={setValue} getValue={getValues} />

                                    }

                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 3 }} >
                                        <SubmitBtn
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                            variant="outlined"
                                            size='small'
                                        >
                                            Back
                                        </SubmitBtn>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <SubmitBtn
                                            variant='contained'
                                            endIcon={!isLastStep() && <ArrowForwardIcon />}
                                            onClick={handleNext} sx={{ mr: 1 }}
                                            type="submit" size='small'
                                            color={!isLastStep() ? "primary" : "success"}
                                            style={{ color: "white" }}>
                                            {!isLastStep() ? "Next" : "submit"}
                                        </SubmitBtn>
                                    </Box>

                                    <pre>
                                        {JSON.stringify(watch(), null, 2)}
                                    </pre>
                                </FormProvider>

                            </Fragment>

                        </div>
                    </Box>


                </Container>
            </Page>

        </div >
    );
}
