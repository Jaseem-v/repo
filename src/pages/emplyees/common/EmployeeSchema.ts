import * as Yup from 'yup';


export const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    firstName_ar: Yup.string().required('FirstName (AR) is required'),
    middleName: Yup.string().required('Middle Name is required'),
    middleName_ar: Yup.string().required('Middle Name (AR) is required'),
    lastName: Yup.string().required('Last Name is required'),
    lastName_ar: Yup.string().required('Last Name (AR) is required'),
    passportNumber: Yup.string().required('PassportNumber is required'),
    emiratesID: Yup.string().required('EmiratesID is required'),
    EIDExpirydate: Yup.string().required('EIDExpirydate is required'),
    occupation_en: Yup.string().required('Occupation is required'),
    visaExpiryDate: Yup.string().required('Visa Expiry Date is required'),
    passportExpiryDate: Yup.string().required('Passport Expiry Date is required'),
    occupation_ar: Yup.string().required('Occupation (AR) is required'),
});