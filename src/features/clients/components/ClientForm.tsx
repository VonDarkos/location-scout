import React, { useRef, useState } from "react"
import { flushSync } from "react-dom"
import focusFirstInvalidField from "../../../shared/utils/focusFirstInvalidField"
import type { ClientFormErrors, ClientFormState } from "../types/clientForm"
import type { ClientInput } from "../types/client"



 type ClientFormProps = {
    initialValue:ClientFormState,
    onSubmit : (data:ClientInput)=>void
    isPending : boolean,
    submitLabel : string
 }

function validateClientForm(formData:ClientFormState):ClientFormErrors {
    const errors:ClientFormErrors = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.companyType) errors.companyType = "Select a client type"
    if (!formData.contactName.trim()) errors.contactName = "Contact name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Enter a valid email address"
    if (!formData.phone.trim()) errors.phone = "Phone is required"

    return errors
}

export default function ClientForm({initialValue,onSubmit,isPending,submitLabel}:ClientFormProps) {
    const[formData,setFormData]=useState(initialValue)
    const[errors,setErrors]=useState<ClientFormErrors>({})
    const formRef = useRef<HTMLFormElement>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
           const { name, value } = e.target;
            setFormData((prev) => ({
            ...prev,
            [name]: value,
            }));
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }

        const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            const validationErrors = validateClientForm(formData)
            // flushSync renders the errors before focus moves, so they are announced with the field
            flushSync(() => setErrors(validationErrors))
            if (Object.keys(validationErrors).length > 0 || !formData.companyType) {
                focusFirstInvalidField(formRef.current, Object.keys(validationErrors))
                return;
            }

            const newClient:ClientInput ={
                name:formData.name,
                companyType:formData.companyType,
                contactName:formData.contactName,
                email:formData.email,
                phone:formData.phone
            }
            onSubmit(newClient)
        }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate ref={formRef}>
        <div className="field">
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          </label>
          {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label>
            Client type
            <select name="companyType" value={formData.companyType} onChange={handleChange} aria-invalid={Boolean(errors.companyType)} aria-describedby={errors.companyType ? "companyType-error" : undefined}>
              <option value="">Select a client type</option>
              <option value="brand">Brand</option>
              <option value="agency">Agency</option>
              <option value="private">Private</option>
              <option value="other">Other</option>
            </select>
          </label>
          {errors.companyType && <p id="companyType-error" className="field-error">{errors.companyType}</p>}
        </div>
        <div className="field">
          <label>
            Contact name
            <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Contact Name" aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "contactName-error" : undefined} />
          </label>
          {errors.contactName && <p id="contactName-error" className="field-error">{errors.contactName}</p>}
        </div>
        <div className="field-row">
          <div className="field">
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            </label>
            {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
          </div>
          <div className="field">
            <label>
              Phone
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
            </label>
            {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isPending}>{isPending ? "Saving..." : submitLabel}</button>
        </div>
    </form>
  )
}
