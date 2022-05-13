import * as Yup from 'yup';


export const CompanyRegistrationSchema = Yup.object().shape({
    companyName: Yup.string().required('FirstName is required'),
    companyName_ar: Yup.string().required('FirstName (AR) is required'),
    companyActivity: Yup.string().required('Middle Name is required'),
    companyActivity_ar: Yup.string().required('Middle Name (AR) is required'),
    companyCode: Yup.string().required('Last Name is required'),
    companyLicense: Yup.string().required('Last Name (AR) is required'),
    passportNumber: Yup.string().required('PassportNumber is required'),
    emiratesID: Yup.string().required('EmiratesID is required'),
    EIDExpirydate: Yup.string().required('EIDExpirydate is required'),
    occupation_en: Yup.string().required('Occupation is required'),
    visaExpiryDate: Yup.string().required('Visa Expiry Date is required'),
    passportExpiryDate: Yup.string().required('Passport Expiry Date is required'),
    occupation_ar: Yup.string().required('Occupation (AR) is required'),
    phonenumber: Yup.string().required('phonenumber is required'),
    email: Yup.string().required('email is required'),
    nationality: Yup.object().shape({
        code: Yup.string().required('nationality is required'),
        label: Yup.string().required('nationality is required'),
        phone: Yup.string().required('nationality is required')
    }),
    docImage: Yup.string().required('File is required')
});