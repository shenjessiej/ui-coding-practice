/**
 * Was asked to build a component that takes in a schema and renders a form
 * define how the schema should look like, for example how the validations would be handled, 
 * another usecase was how to handle multiple screens for a single form, 
 * also spend sometime discussing how a scenario like country - state - city inputs can be implemented 
 * where one input's values are dependent on the other. This was all discussed as part of the first 30 mins.
 * The next 30 mins I was asked to implement the schema + component which could handle basic validations and
 *  would console.log the field values and their validity on submit.
 * Text (Text, Password, Email, Date, Number — I only did Text & Password), Select, Checkbox, Radio, Textarea (Talked about it, did not implement)
* The component must accept a schema that defines both the data structure and the validation rules.
It should be designed to be reusable and configurable, allowing integration across multiple teams.
The component is intended to be part of a UI library, and thus should follow best practices for modularity, extensibility, and maintainability.
 */


import { useState } from "react";
const SCHEMA =
{
    "title": "Form title",
    "description": "Description",
    "fields": [
        {
            "name": "firstName",
            "type": "text",
            "title": "First Name",
            "validation": {
                "required": true,
                "minLength": 2
            }
        },
        {
            "name": "lastName",
            "type": "text",
            "title": "Last Name",
            "validation": {
                "required": true,
                "minLength": 2
                
            }
        },
        {
            "name": "email",
            "type": "email",
            "title": "Email"
        },
        {
            "name": "password",
            "type": "password",
            "title": "Password"
        },
        {
            "name": "date",
            "type": "date",
            "title": "Date"
        }, {
            "name": "number",
            "type": "number",
            "title": "Number"
        },
        {
            "name": "comment",
            "type": "textarea",
            "title": "Comment",
            "validation": {
                "required": true
            }
        },
        {
            "name": "select",
            "type": "select",
            "title": "Select",
            "options": [{
                "id": 1,
                "value": "option1",
                "label": "Option 1"
            }, {
                "id": 2,
                "value": "option2",
                "label": "Option 2"
            }]
        },
        {
            "name": "radio",
            "type": "radio",
            "title": "Radio",
            "options": [{
                "id": 3,
                "value": "option1",
                "label": "Option 1"
            }, {
                "id": 4,
                "value": "option2",
                "label": "Option 2"
            }]
        },
        {
            "name": "checkbox",
            "type": "checkbox",
            "title": "Checkbox",
            "options": [{
                "id": 5,
                "value": "option1",
                "label": "Option 1"
            }, {
                "id": 6,
                "value": "option2",
                "label": "Option 2"
            }]
        }


    ]

}

function FormSelect({ name, options }) {
    return (<select id={name} name={name}>
        {options && options.map((option) => {
            return (<option key={option.id} value={option.value}>{option.label}</option>)
        })}
    </select>)
}

function FormTextArea({ name }) {
    return <textarea id={name} name={name} />
}

function FormRadio({ name, options }) {
    return (options.map((option) => {
        return (<div key={option.id}>
            <label htmlFor={option.id}>{option.label}</label>
            <input type={"radio"} id={option.id} value={option.value} name={name} />
        </div>)
    }))
}

function FormCheckbox({ name, options }) {
    return (options.map((option) => {
        return (<div key={option.id}>
            <label htmlFor={option.id}>{option.label}</label>
            <input type={"checkbox"} id={option.id} value={option.value} name={name} />
        </div>)
    }))
}

function FormInput({ name, type, onChange }) {
    return (
        <input id={name} name={name} type={type} onChange={(e) => onChange(e.target.value)} />
    )
}
function FormField({ field, onChange }) {
    const [valid, setValid] = useState(true);

    function handleOnChange(val) {
        let valid = true;
        if (field.validation) {
            valid = field.validation.minLength ? (val.length >= field.validation.minLength) && valid : valid;
        }
        setValid(valid);
        onChange(field.name, valid);
    }

    return (<div>
        <label htmlFor={field.name}>{field.title}</label>
        {field.type === 'select' ? <FormSelect name={field.name} options={field.options} /> :
            field.type === 'textarea' ? <FormTextArea name={field.name} /> :
                field.type === 'radio' ? <FormRadio name={field.name} options={field.options} /> :
                    field.type === 'checkbox' ? <FormCheckbox name={field.name} options={field.options} /> :
                        <FormInput onChange={handleOnChange} name={field.name} type={field.type} />}
    </div>)

}

function Form({ schema }) {
    const [validFields, setValidFields] = useState(new Map());

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        schema.fields.forEach((field) => {
            console.log(`Field: ${field.title} Value: ${formData.get(field.name)} Valid: ${validFields.get(field.name)}`)
        })
    }

    // handle validation at form level so i can check other fields for specific values
    function handleOnChange(name, valid) {
        const newFields = new Map(validFields);
        newFields.set(name, valid);
        setValidFields(newFields);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>{schema.title}</h1>
            <p>{schema.description}</p>
            {schema.fields && schema.fields.map((field) => {
                return (<FormField onChange={handleOnChange} key={field.name} field={field} />);
            })}
            <input type="submit" value="Submit" />
        </form>
    )
}

function FormApp() {
    return <Form schema={SCHEMA} />;
}

export default FormApp;
