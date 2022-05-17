import * as Yup from 'yup';


export const CompanyRegistrationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyName_ar: Yup.string().required('Company Name (AR) is required'),
    companyActivity: Yup.string().required('Company Activity is required'),
    companyActivity_ar: Yup.string().required('Company Activity (AR) is required'),
    companyCode: Yup.string().required('Company Code is required'),
    companyLicense: Yup.string().required('Company License (AR) is required'),
    emirate: Yup.string().required('Emirate is required'),
    fax: Yup.string().required('Fax is required'),
    area: Yup.string().required('Area is required'),
    area_ar: Yup.string().required('Area (AR) is required'),
    p_o_box: Yup.string().required('P.O is required'),
    email: Yup.string().required('Email is required'),
    docImage1: Yup.string().required('File is required'),
    docImage2: Yup.string().required('File is required'),
    docImage3: Yup.string().required('File is required'),
    docImage4: Yup.string().required('File is required'),
    docImage5: Yup.string().required('File is required'),

});
export const StaffListPopupSchema = Yup.object().shape({
    staffName: Yup.string().required('Staff Name is required'),
    staffName_ar: Yup.string().required('Staff Name is required'),
    job: Yup.string().required('Job is required'),
    job_ar: Yup.string().required('Job (AR) is required'),
    unified_code: Yup.string().required('Unified Code is required'),
    nationality: Yup.object().shape({
        code: Yup.string().required('nationality is required'),
        label: Yup.string().required('nationality is required'),
        phone: Yup.string().required('nationality is required')
    }),
});
export const NatinalityPopupSchema = Yup.object().shape({
    number: Yup.string().required('Numbers is required'),
    nationality: Yup.object().shape({
        code: Yup.string().required('nationality is required'),
        label: Yup.string().required('nationality is required'),
        phone: Yup.string().required('nationality is required')
    }),
});
export const OwnerPopupSchema = Yup.object().shape({
    ownerName: Yup.string().required('Owner Name is required'),
    ownerName_ar: Yup.string().required('Owner Name (AR) is required'),
    position: Yup.string().required('Position is required'),
    unified_code: Yup.string().required('Unified Code is required'),
    work_place: Yup.string().required('Work Place is required'),
    work_place_ar: Yup.string().required('Work Place (AR) is required'),
});
export const MilitaryPopupSchema = Yup.object().shape({
    ownerName: Yup.string().required('Owner Name is required'),
    ownerName_ar: Yup.string().required('Owner Name (AR) is required'),
    position: Yup.string().required('Position is required'),
    unit: Yup.string().required('Unit is required'),
    rank: Yup.string().required('Rank is required'),
    military_number: Yup.string().required('Military Number is required'),
});
export const AuthorisedSignatureSchema = Yup.object().shape({
    ownerName: Yup.string().required('Owner Name is required'),
    ownerName_ar: Yup.string().required('Owner Name (AR) is required'),
    unified_code: Yup.string().required('Unified Code is required'),
    work_place: Yup.string().required('Work Place is required'),
    work_place_ar: Yup.string().required('Work Place (AR) is required'),
    nationality: Yup.object().shape({
        code: Yup.string().required('nationality is required'),
        label: Yup.string().required('nationality is required'),
        phone: Yup.string().required('nationality is required')
    }),
});

