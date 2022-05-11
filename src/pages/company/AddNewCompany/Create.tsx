import {
    FormProvider,
} from '../../../components/hook-form';
import {
    Card,
    Grid,
    Button,
    Box,
    Step,
    StepLabel,
    Stepper
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMemo, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { AssignDirectors, BasicDetails, ContactPersonDetails, ContractDetails } from '../common/FormComponents'
import { companySchema } from '../companySchema';
import { SubmitBtn } from '../../../components/ButtonSet';
import { useNavigate } from 'react-router-dom';


export default function CreateNewCompanyForm() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});
    const [formSubmit, setFormSubmit] = useState<boolean>(false)


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
        contact_purpose: '',
        contact_no: '',
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
        clearErrors,
        formState: { isSubmitting, errors },
    } = methods;

    const values = watch();

    const [clear1, setClear] = useState(true)
    const steps = [
        'Basic Details',
        'Assign and Contact',
        'Contact Person Details',
    ];
    console.log("test");



    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    let CleanErrorOneTime = (function () {
        let executed = false;
        return function () {
            if (!executed) {
                executed = true;
                clearErrors(["director", "director_role", "contact_purpose", "contact_no", "employee_required", "reliever_count"])
            }
        };
    })();
    let CleanErrorSecondTime = function () {

        if (clear1) {
            setClear(false)
            clearErrors(["first_name", "last_name", "email", "phone_2"])
        }
    };


    useEffect(() => {
        let form1 = ["name_ar", "name_en", "trade_license", "trade_license_expiry", "phone", "remarks"]
        let form2 = ["director", "director_role", "contact_purpose", "contact_no", "employee_required", "reliever_count"]
        let form3 = ["first_name", "last_name", "email", "phone_2"]
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
    let navigate = useNavigate();


    const onSubmit = (data: any) => {
        if (formSubmit) {
            enqueueSnackbar('Successfully Added', { variant: 'success' })
            navigate("/dashboard/app")
        }
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]} >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div style={{ margin: "3rem auto" }}></div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {
                    activeStep === 0 &&
                    <BasicDetails isEdit={false} />
                }
                {
                    activeStep === 1 &&
                    <>
                        <AssignDirectors isEdit={false} />
                        <ContractDetails isEdit={false} />
                    </>


                }
                {
                    activeStep === 2 &&
                    <ContactPersonDetails isEdit={false} />

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
                        onClick={handleNext} sx={{ mr: 1 }}
                        type="submit" size='small'
                        color={!isLastStep() ? "primary" : "success"}
                        style={{ color: "white" }}>
                        {!isLastStep() ? "Next" : "submit"}
                    </SubmitBtn>
                </Box>
            </FormProvider>
        </Box>

    )
}