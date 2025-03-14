import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const MemberForm = () => {
    const [loading, setLoading] = useState(false);
    const [agGroups, setAgGroups] = useState([])
    const navigate = useNavigate()
    const api = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch(`${api}group`);
                if (!response.ok) throw new Error("Failed to fetch AG Groups");
                const data = await response.json();
                setAgGroups(data);
            } catch (error) {
                console.error("Error fetching AG Groups:", error);
            }
        };
        fetchGroups();
    }, []);

    const schoolType = {
        "University/College": "university",
        "High School": "high_school",
        "Primary School": "primary_school",
        "Other": "other"
    }

    const genderOptions = {
        "Telios (Male)": "telios",
        "Elysian (Female)": "elysian"
    }

    const phoneRegex = /^(\+254\d{9}|07\d{8}|01\d{8}|\d{10,15})$/;
    

    const formik = useFormik({
        initialValues: {
            firstName: '',
            secondName: '',
            surName: '',
            date_of_birth: '',
            location: '',
            phone: '',
            altPhone: '',
            email: '',
            isStudent: false,
            school_type: '',
            school: '',
            occupation: '',
            group: '',
            gender: '',
            status: 'active',
            contact_name: '',
            contact_phone: '',
            contact_alt_phone: '',
            relationship: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            secondName: Yup.string().required('Required'),
            date_of_birth: Yup.date().required('Required'),
            location: Yup.string().required('Required'),
            phone: Yup.string()
                .matches(phoneRegex, "Invalid phone number format")
                .required('Required'),
            alt_phone: Yup.string()
                .matches(phoneRegex, "Invalid phone number format"),
            gender: Yup.string().required('Required'),
            contact_name: Yup.string().required('Required'),
            contact_phone: Yup.string()
                .matches(phoneRegex, "Invalid phone number format")
                .required('Required'),
            contact_alt_phone: Yup.string()
                .matches(phoneRegex, "Invalid phone number format"),
            relationship: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setLoading(true)
            try {
                const memberData = {
                    first_name: values.firstName,
                    second_name: values.secondName,
                    sur_name: values.surName,
                    date_of_birth: values.date_of_birth,
                    location: values.location,
                    phone: values.phone,
                    alt_phone: values.altPhone,
                    email: values.email,
                    is_student: values.isStudent,
                    school_type: values.isStudent ? schoolType[values.school_type]: null,
                    school: values.isStudent ? values.school : null,
                    occupation: values.occupation,
                    ag_group: values.group,
                    gender: values.gender,
                    status: values.status,
                    contact_name: values.contact_name,
                    contact_phone: values.contact_phone,
                    contact_alt_phone: values.contact_alt_phone,
                    relationship: values.relationship,
                };

                const response = await fetch(`${api}member`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(memberData),
                });

                if (response.ok) {
                    toast.success("Registered successfully🤗🫶!");
                    resetForm();
                    setTimeout(() => navigate("/vaulthanks"), 1000)
                } else {
                    const errorData = await response.json();
                    toast.error(`Failed to register‼️. ${errorData.error || 'Please try again🙁.'}`);
                }
            } catch (err) {
                toast.error('An error occurred. Please try again later.');
            } finally {
                setSubmitting(false);
                setLoading(false)
            }
        },
    });

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            {loading && 
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
                >
                    <LoadingSpinner />
                </div>
            }
            <div className="mb-6 p-6 bg-gray-700 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2"><strong>Vault Ministry</strong> registration desk</h1>
                    <p className="text-gray-300 text-center">
                        Welcome to Vault Forms. Please ensure the details you provide are correct and accurate. Don't share this form with anyone outside the Vault family to avoid faulty statistics. This information helps us stay connected and provide better support within the Vault family.
                    </p>
            </div>
            <div className={`w-full max-w-3xl bg-gray-800 shadow-lg rounded-lg p-8 transition ${loading ? "blur-sm pointer-events-none" : ""}`}>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField formik={formik} name="firstName" label="First Name" />
                    <InputField formik={formik} name="secondName" label="Second Name" />
                    <InputField formik={formik} name="surName" label="Surname" />
                    <RadioField formik={formik} name="gender" label="Gender" options={genderOptions} />
                    <InputField formik={formik} name="date_of_birth" label="Date of Birth" type="date" />
                    <InputField formik={formik} name="location" label="Location" />
                    <InputField formik={formik} name="phone" label="Phone" type="tel" />
                    <InputField formik={formik} name="altPhone" label="Alternative Phone" type="tel" />
                    <InputField formik={formik} name="email" label="Email" type="email" />
                    <CheckboxField formik={formik} name="isStudent" label="Are you a student?" />
                    {formik.values.isStudent && (
                        <>
                            <SelectField formik={formik} name="school_type" label="School Type" options={schoolType} />
                            <InputField formik={formik} name="school" label="School Name" />
                        </>
                    )}
                    <InputField formik={formik} name="occupation" label="Occupation" />
                    <SelectField formik={formik} name="group" label="AG Group" options={agGroups} />
                    {/* <SelectField formik={formik} name="status" label="Status" options={["active", "inactive"]} /> */}
                    <fieldset className="col-span-1 md:col-span-2 mt-6">
                        <legend className="text-lg font-medium mb-4">Emergency Contact (next of kin)</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField formik={formik} name="contact_name" label="Name" />
                            <InputField formik={formik} name="contact_phone" label="Phone" type="tel" />
                            <InputField formik={formik} name="contact_alt_phone" label="Alt Phone" type="tel" />
                            <InputField formik={formik} name="relationship" label="Relation" />
                        </div>
                    </fieldset>
                    <button type="submit" disabled={formik.isSubmitting} className="w-full md:col-span-2 py-3 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
                        Submit
                    </button>
                </form>
            </div>
            <div className='flex items-center justify-center m-4'>
                <span>Vault Forms, powered by <strong>Vaultech</strong></span>
            </div>
        </div>
    );
};

const InputField = ({ formik, name, label, type = "text" }) => (
    <div>
        <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
        <input id={name} type={type} {...formik.getFieldProps(name)} className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500" />
        {formik.touched[name] && formik.errors[name] && <p className="text-red-400 text-sm">{formik.errors[name]}</p>}
    </div>
);

const CheckboxField = ({ formik, name, label }) => (
    <div className="flex items-center">
        <input id={name} type="checkbox" checked={formik.values[name]} onChange={formik.handleChange} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
        <label htmlFor={name} className="font-medium">{label}</label>
    </div>
);

const SelectField = ({ formik, name, label, options }) => (
    <div>
        <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
        <select
            id={name}
            {...formik.getFieldProps(name)}
            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Select {label}</option>
            {Array.isArray(options)
                ? options.map((option) => (
                    <option key={option.id} value={option.id}>{option.group_name}</option>
                ))
                : Object.keys(options).map((key) => (
                    <option key={key} value={options[key]}>{key}</option>
                ))
            }
        </select>
    </div>
);

const RadioField = ({ formik, name, label, options }) => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <div className="flex space-x-4">
        {Object.entries(options).map(([label, value]) => (
                <label key={value} className="flex items-center">
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        checked={formik.values[name] === value}
                        onChange={formik.handleChange}
                        className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500"
                    />
                    {label}
                </label>
        ))}
        </div>
    </div>
);

export default MemberForm;
