import React from "react";
import styles from "./form.module.css"
import { formFields } from "../constants";
import { updatePeople, createPeople } from "./../../apiService"

const Form = ({ form, handleChange, handleSubmit }) => {
    const handleClick = () => {
        return form.id
            ? updatePeople(form.id, form)
            : createPeople(form)
    }


    const thereAreEmptyValues = () => {
        return (
            !form.name ||
            !form.lastname ||
            !form.gender ||
            !form.birthdate ||
            !form.email ||
            !form.phone ||
            !form.maritalStatus
        )
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {formFields.map((field, index) => {
                if (field.type === "select") {
                    return (
                        <select
                            key={index}
                            name={field.name}
                            value={form[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                        >
                            {field.options.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    );
                } else {
                    return (
                        <input
                            key={index}
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                        />
                    );
                }
            })}
            <button onClick={handleClick} type="submit" >
                {form.id ? "Update Person" : "Add Person"}
            </button>
        </form>
    )
}

export default Form;