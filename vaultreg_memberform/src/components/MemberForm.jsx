import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

const MemberForm = () => {
    const api = import.meta.env.VITE_API_URL;

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
            phone: Yup.string().required('Required'),
            gender: Yup.string().required('Required'),
            contact_name: Yup.string().required('Required'),
            contact_phone: Yup.string().required('Required'),
            contact_alt_phone: Yup.string().required('Required'),
            relationship: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
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
                    is_student: values.isStudent ? "Yes" : "No",
                    school_type: values.isStudent ? values.school_type : '',
                    school: values.isStudent ? values.school : '',
                    occupation: values.occupation,
                    ag_group: parseInt(values.group),
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
                    toast.success("Member registered successfully!");
                    resetForm();
                } else {
                    const errorData = await response.json();
                    toast.error(`Failed to register member. ${errorData.error || 'Please try again.'}`);
                }
            } catch (err) {
                toast.error('An error occurred. Please try again later.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            <div className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-lg p-8">
            <div className="mb-6 p-6 bg-gray-700 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2">Vault Ministry</h1>
                    <p className="text-gray-300 text-center">
                        Welcome to Vault Forms. Please ensure the details you provide are correct and accurate. This information helps us stay connected and provide better support within the Vault family.
                    </p>
                </div>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField formik={formik} name="firstName" label="First Name" />
                    <InputField formik={formik} name="secondName" label="Second Name" />
                    <InputField formik={formik} name="surName" label="Sur Name" />
                    <RadioField formik={formik} name="gender" label="Gender" options={["Telios", "Elysian"]} />
                    <InputField formik={formik} name="date_of_birth" label="Date of Birth" type="date" />
                    <InputField formik={formik} name="location" label="Location" />
                    <InputField formik={formik} name="phone" label="Phone" type="tel" />
                    <InputField formik={formik} name="altPhone" label="Alternative Phone" type="tel" />
                    <InputField formik={formik} name="email" label="Email" type="email" />
                    <CheckboxField formik={formik} name="isStudent" label="Are you a student?" />
                    {formik.values.isStudent && (
                        <>
                            <SelectField formik={formik} name="school_type" label="School Type" options={["University/College", "High School", "Primary School", "Other"]} />
                            <InputField formik={formik} name="school" label="School Name" />
                        </>
                    )}
                    <InputField formik={formik} name="occupation" label="Occupation" />
                    <SelectField formik={formik} name="group" label="AG Group" options={["Transformers", "Pacesetters", "Ignition", "Relentless", "Innovators", "Gifted", "Visionaries", "Elevated"]} />
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
                <span>Vault Forms powered by Vault Tech</span>
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
        <select id={name} {...formik.getFieldProps(name)} className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select {label}</option>
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

const RadioField = ({ formik, name, label, options }) => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <div className="flex space-x-4">
            {options.map((option) => (
                <label key={option} className="flex items-center">
                    <input type="radio" name={name} value={option} checked={formik.values[name] === option} onChange={formik.handleChange} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500" />
                    {option}
                </label>
            ))}
        </div>
    </div>
);

export default MemberForm;
