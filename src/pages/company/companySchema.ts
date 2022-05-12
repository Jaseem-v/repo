import * as Yup from 'yup';


export const companySchema = Yup.object().shape({
    name_ar: Yup.string().required('Name Arabic is required'),
    name_en: Yup.string().required('Name English is required'),
    trade_license: Yup.string().required('Trade License is required'),
    trade_license_expiry: Yup.string().required('Trade License Expiry Date is required'),
    phone: Yup.string().required('Phone is required'),
    remarks: Yup.string().required('Remarks English is required'),
    // director: Yup.string().required('Name English is required'),
    // director_role: Yup.string().required('Name English is required'),
    contract_purpose: Yup.string().required('Contact Purpose English is required'),
    contract_no: Yup.string().required('Contact number is required'),
    employee_required: Yup.string().required('Employee Required is required'),
    reliever_count: Yup.string().required('Reliever Count is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    phone_2: Yup.string().required('Phone Number is required'),
})
export const contractSchema = Yup.object().shape({
    contract_purpose: Yup.string().required('Contact Purpose English is required'),
    contract_no: Yup.string().required('Contact number is required'),
    employee_required: Yup.string().required('Employee Required is required'),
    reliever_count: Yup.string().required('Reliever Count is required'),
})