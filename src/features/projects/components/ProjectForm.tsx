import React, { useState, useRef } from "react"
import { flushSync } from "react-dom"
import focusFirstInvalidField from "../../../shared/utils/focusFirstInvalidField"
import type { ProjectInput } from "../types/project"
import type { ProjectFormErrors, ProjectFormState } from "../types/projectForm"
import type { Client } from "../../clients/types/client"

type ProjectFormProps = {
initialValue : ProjectFormState,
onSubmit: (data:ProjectInput)=>void,
isPending :boolean ,
submitLabel : string,
clients:Client[],
showOperationalStatus?: boolean
}

function validateProjectForm(formData:ProjectFormState):ProjectFormErrors {
    const errors:ProjectFormErrors = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.clientId) errors.clientId = "Select a client"
    if (!formData.productionType) errors.productionType = "Select a production type"
    if (!formData.startDate) errors.startDate = "Start date is required"
    if (!formData.endDate) errors.endDate = "End date is required"
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
        errors.endDate = "End date cannot be before start date"
    }
    if (!formData.city.trim()) errors.city = "City is required"
    if (!formData.area.trim()) errors.area = "Area is required"

    const locationBudget = Number(formData.locationBudget)
    if (!formData.locationBudget) errors.locationBudget = "Location budget is required"
    else if (Number.isNaN(locationBudget) || locationBudget <= 0) errors.locationBudget = "Location budget must be a positive number"

    const peopleCount = Number(formData.peopleCount)
    if (!formData.peopleCount) errors.peopleCount = "People count is required"
    else if (!Number.isInteger(peopleCount) || peopleCount <= 0) errors.peopleCount = "People count must be a positive whole number"

    return errors
}

// Empty optional fields are omitted, unless the user cleared an existing value:
// updates use PATCH, so only "" can remove a value that is already saved.
function toOptional(value:string, initialValue:string):string | undefined {
    return value.trim() === "" && initialValue === "" ? undefined : value
}

export default function ProjectForm({initialValue,onSubmit,isPending,submitLabel,clients,showOperationalStatus = false}:ProjectFormProps) {

    const [formData,setFormData]= useState<ProjectFormState>(initialValue)
    const [errors,setErrors] = useState<ProjectFormErrors>({})
    const formRef = useRef<HTMLFormElement>(null)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
       const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
      
      e.preventDefault()
      const validationErrors = validateProjectForm(formData)
      // flushSync renders the errors (and aria-invalid) before focus moves,
      // so screen readers announce the field as invalid together with its message
      flushSync(() => setErrors(validationErrors))
      if (Object.keys(validationErrors).length > 0 || !formData.productionType) {
      focusFirstInvalidField(formRef.current, Object.keys(validationErrors))
      return
    }
      const newProject:ProjectInput = {
        name: formData.name,
        clientId: formData.clientId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        city: formData.city,
        area: formData.area,
        locationBudget: Number(formData.locationBudget),
        peopleCount: Number(formData.peopleCount),
        description: toOptional(formData.description, initialValue.description),
        notes: toOptional(formData.notes, initialValue.notes),
        productionType: formData.productionType,
        operationalStatus: formData.operationalStatus,
      }
      onSubmit(newProject)
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
        <div className="field-row">
          <div className="field">
            <label>
              Client
              <select name="clientId" value={formData.clientId} onChange={handleChange} aria-invalid={Boolean(errors.clientId)} aria-describedby={errors.clientId ? "clientId-error" : undefined}>
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </label>
            {errors.clientId && <p id="clientId-error" className="field-error">{errors.clientId}</p>}
          </div>
          <div className="field">
            <label>
              Production type
              <select name="productionType" value={formData.productionType} onChange={handleChange} aria-invalid={Boolean(errors.productionType)} aria-describedby={errors.productionType ? "productionType-error" : undefined}>
                <option value="">Select production type</option>
                <option value="fashion">Fashion</option>
                <option value="commercial">Commercial</option>
                <option value="editorial">Editorial</option>
                <option value="product">Product</option>
                <option value="video">Video</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
            </label>
            {errors.productionType && <p id="productionType-error" className="field-error">{errors.productionType}</p>}
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>
              Start date
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} aria-invalid={Boolean(errors.startDate)} aria-describedby={errors.startDate ? "startDate-error" : undefined} />
            </label>
            {errors.startDate && <p id="startDate-error" className="field-error">{errors.startDate}</p>}
          </div>
          <div className="field">
            <label>
              End date
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} aria-invalid={Boolean(errors.endDate)} aria-describedby={errors.endDate ? "endDate-error" : undefined} />
            </label>
            {errors.endDate && <p id="endDate-error" className="field-error">{errors.endDate}</p>}
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>
              City
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined} />
            </label>
            {errors.city && <p id="city-error" className="field-error">{errors.city}</p>}
          </div>
          <div className="field">
            <label>
              Area
              <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Area" aria-invalid={Boolean(errors.area)} aria-describedby={errors.area ? "area-error" : undefined} />
            </label>
            {errors.area && <p id="area-error" className="field-error">{errors.area}</p>}
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>
              Location budget per day (€)
              <input type="number" name="locationBudget" value={formData.locationBudget} onChange={handleChange} placeholder="Location budget per day (€)" aria-invalid={Boolean(errors.locationBudget)} aria-describedby={errors.locationBudget ? "locationBudget-error" : undefined} />
            </label>
            {errors.locationBudget && <p id="locationBudget-error" className="field-error">{errors.locationBudget}</p>}
          </div>
          <div className="field">
            <label>
              People count
              <input type="number" name="peopleCount" value={formData.peopleCount} onChange={handleChange} placeholder="People count" aria-invalid={Boolean(errors.peopleCount)} aria-describedby={errors.peopleCount ? "peopleCount-error" : undefined} />
            </label>
            {errors.peopleCount && <p id="peopleCount-error" className="field-error">{errors.peopleCount}</p>}
          </div>
        </div>

        {showOperationalStatus && (
          <div className="field">
            <label>
              Operational status
              <select name="operationalStatus" value={formData.operationalStatus} onChange={handleChange}>
                <option value="none">None</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
          </div>
        )}

        <div className="field">
          <label>
            Description
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          </label>
        </div>
        <div className="field">
          <label>
            Notes
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isPending}>{isPending ? "Saving..." : submitLabel}</button>
        </div>
    </form>
  )
}
