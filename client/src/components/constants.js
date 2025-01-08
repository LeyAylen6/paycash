export const formFields = [
    {
        type: "text",
        name: "name",
        placeholder: "First Name",
        required: true,
    },
    {
        type: "text",
        name: "lastname",
        placeholder: "Last Name",
        required: true,
    },
    {
        type: "select",
        name: "gender",
        options: [
            { value: "", label: "Select Gender" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Otro" },
        ],
        required: true,
    },
    {
        type: "date",
        name: "birthdate",
        required: true,
    },
    {
        type: "email",
        name: "email",
        placeholder: "Email",
        required: true,
    },
    {
        type: "text",
        name: "phone",
        placeholder: "Phone",
        required: true,
    },
    {
        type: "select",
        name: "maritalStatus",
        options: [
            { value: "", label: "Marital Status" },
            { value: "single", label: "Single" },
            { value: "married", label: "Married" },
            { value: "divorced", label: "Divorced" },
            { value: "widowed", label: "Widowed" },
        ],
        required: true,
    },
];
