import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box, Step,
    StepLabel, Stepper
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SubmitBtn } from '../../components/ButtonSet';
import { FormProvider } from '../../components/hook-form';
import { Address, CommonDetails, CompanyInfoTables, DocUploads, Military } from './common/CompanyRegistrationFormComponents';
import { CompanyRegistrationSchema } from './common/CompanyRegistrationSchema';



// types
interface uploadedFileInterface {
    name?: string
}


export interface FormValidInputs {
    companyName: string,
    companyName_ar: string,
    companyActivity: string,
    companyActivity_ar: string,
    companyCode: string,
    companyLicense: string,
    emirate: string,
    fax: string,
    area: string,
    area_ar: string,
    email: string,
    p_o_box: string,
    docImage1: string,
    docImage2: string,
    docImage3: string,
    docImage4: string,
    docImage5: string,
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
        companyName: "a",
        companyName_ar: "a",
        companyActivity: "a",
        companyActivity_ar: "a",
        companyCode: "a",
        companyLicense: "a",
        emirate: "",
        fax: "",
        area: "",
        area_ar: "",
        email: "",
        p_o_box: "",
        nationality: { code: "", label: "", phone: "" },
        docImage1: "",
        docImage2: "",
        docImage3: "",
        docImage4: "",
        docImage5: ""
    }), []);



    const methods = useForm({
        resolver: yupResolver(CompanyRegistrationSchema),
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
        'Address',
        'Related to Military',
        'Documents',
    ];


    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };


    // clean function

    const [clear1, setClear] = useState(true)
    const [clear2, setClear2] = useState(true)

    const CleanSecondFormErrorOneTime = () => {
        if (clear2) {
            setClear2(false)
            clearErrors(["emirate", "fax", "area", "area_ar", "email", "p_o_box"])
        }
    }
    const CleanThirdFormErrorOneTime = () => {
        if (clear1) {
            setClear(false)
            clearErrors(["docImage1", "docImage2", "docImage3", "docImage4", "docImage5"])
        }
    };

    useEffect(() => {
        let form1 = ["companyName", "companyName_ar", "companyCode", "companyLicense", "companyActivity_ar", "companyActivity"]
        let form2 = ["emirate", "fax", "area", "area_ar", "email", "p_o_box"]
        let form3 = ["docImage1", "docImage2", "docImage3", "docImage4", "docImage5"]
        form1.map((el1) => {
            if (errors && errors.hasOwnProperty(el1)
            ) {
                setActiveStep(0)
            }
            if (errors && activeStep == 2 && !(errors.hasOwnProperty(el1))) {
                form2.map((el2) => {
                    if (errors.hasOwnProperty(el2)) {
                        setActiveStep(2)
                    }

                })
            }
            if (errors && activeStep == 3 && !(errors.hasOwnProperty(el1))) {
                form2.map((el2) => {
                    if (errors.hasOwnProperty(el2)) {
                        setActiveStep(2)
                    }

                })
            }
            if (errors && activeStep == 2 && !errors.hasOwnProperty(el1)
            ) {
                CleanSecondFormErrorOneTime();

            }

            if (errors && activeStep == 4 && !errors.hasOwnProperty(el1)
            ) {
                form2.map((el) => {
                    if (!errors.hasOwnProperty(el)) {
                        CleanThirdFormErrorOneTime()
                    }
                })

            }

            if (Object.keys(errors).length === 0 && activeStep === 4) {
                setFormSubmit(true)
            }




        })

        watch()


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
                            <Military />
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
