import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { CompanyRegistrationSchema } from './common/CompanyRegistrationSchema';
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
import { Address, CommonDetails, CompanyInfoTables, DocUploads } from './common/CompanyRegistrationFormComponents';
import { SubmitBtn } from '../../components/ButtonSet';
import OwnerTable from './infoTables/OwnerTable';


// types
interface uploadedFileInterface {
    name?: string
}


export interface FormValidInputs {
    companyName: string;
    companyName_ar: string;
    companyActivity: string;
    companyActivity_ar: string;
    companyCode: string;
    companyLicense: string;
    passportNumber: string;
    emiratesID: string;
    EIDExpirydate: string;
    docImage1: string;
    docImage2: string;
    docImage3: string;
    docImage4: string;
    docImage5: string;
    occupation_en: string,
    visaExpiryDate: string,
    passportExpiryDate: string,
    occupation_ar: string,
    phonenumber: string,
    email: string,
    nationality?: { code: string, label: string, phone: string }
}

export default function CompanyRegistrationForm() {
    let navigate = useNavigate();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = useMemo((): FormValidInputs => ({
        companyName: "",
        companyName_ar: "",
        companyActivity: "",
        companyActivity_ar: "",
        companyCode: "",
        companyLicense: "",
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
        docImage1: "",
        docImage2: "",
        docImage3: "",
        docImage4: "",
        docImage5: ""
    }), []);



    const methods = useForm({
        // resolver: yupResolver(CompanyRegistrationSchema),
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

    const [formSubmit, setFormSubmit] = useState<boolean>(false)

    const onSubmit = (data: any) => {
        if (formSubmit) {
            enqueueSnackbar('Successfully Added', { variant: 'success' })
            navigate("/dashboard/app")
        }
    }


    const steps = [
        'Company Information',
        'Team Details',
        'address',
        'Related to miltary',
        'Documents',
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
    // useEffect(() => {
    //     let form1 = ["companyName", "companyName_ar", "companyCode", "companyLicense", "companyActivity_ar", "companyActivity"]
    //     let form2 = ["passportExpiryDate", "passportNumber", "emiratesID", "EIDExpirydate", "visaExpiryDate", "passportExpiryDate"]
    //     let form3 = ["email", "phonenumber", "nationality"]
    //     form1.map((el1) => {
    //         if (errors && errors.hasOwnProperty(el1)
    //         ) {
    //             setActiveStep(0)
    //         }
    //         if (errors && !(errors.hasOwnProperty(el1))) {
    //             form2.map((el2) => {
    //                 if (errors.hasOwnProperty(el2)) {
    //                     setActiveStep(1)
    //                 }

    //             })
    //         }
    //         if (errors && activeStep == 1 && !errors.hasOwnProperty(el1)
    //         ) {
    //             // CleanErrorOneTime();


    //         }

    //         if (errors && activeStep == 2 && !errors.hasOwnProperty(el1)
    //         ) {
    //             form2.map((el) => {
    //                 if (!errors.hasOwnProperty(el)) {
    //                     // CleanErrorSecondTime()
    //                 }
    //             })

    //         }

    //         if (Object.keys(errors).length === 0 && activeStep === 2) {
    //             setFormSubmit(true)
    //         }




    //     })

    //     watch()


    // }, [errors])



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
                            <CompanyInfoTables />
                        }

                    
                        {
                            activeStep === 2 &&
                            <>
                                <Address />
                            </>

                        }

                        {
                            activeStep === 3 &&
                            <>Related to Miltary</>
                        }
                        {
                            activeStep === 4 &&
                            <>
                                <DocUploads setValue={setValue} getValue={getValues} />

                            </>


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

                        {/* <pre>
                            {
                                JSON.stringify(watch(), null, 2)
                            }
                        </pre> */}
                    </FormProvider>

                </Fragment>

            </div>
        </Box>


    );
}
