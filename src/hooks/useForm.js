import { useState } from 'react'


//hook who handles an input value whenever it changes
export const useForm = (initialValues = {}) => {

    const [values, setValues] = useState(initialValues)


    const reset = () => {
        setValues(initialValues)
    }

    const hanldeInputChange = (e) => {

        setValues({
            ...values,
            [e.target.name] : e.target.value
        })

    }


  return [ values,hanldeInputChange, reset ]
}
