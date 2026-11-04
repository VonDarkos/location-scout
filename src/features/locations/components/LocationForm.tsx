
import type { LocationInput } from "../types/location";
import type { LocationFormErrors, LocationFormState } from "../types/locationForm"
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import focusFirstInvalidField from "../../../shared/utils/focusFirstInvalidField";

type LocationFormProps = {
    initialValue:LocationFormState;
    onSubmit: (data: LocationInput) => void;
    isPending?:boolean
    submitLabel: string;
}

import React from 'react'

function validatePositiveNumber(value:string, label:string, wholeNumber = false):string | undefined {
  if (!value) return `${label} is required`
  const number = Number(value)
  if (Number.isNaN(number) || number <= 0) return `${label} must be a positive number`
  if (wholeNumber && !Number.isInteger(number)) return `${label} must be a whole number`
  return undefined
}

function validateLocationForm(formData:LocationFormState):LocationFormErrors {
  const errors:LocationFormErrors = {}

  if (!formData.name.trim()) errors.name = "Name is required"
  if (!formData.city.trim()) errors.city = "City is required"
  if (!formData.address.trim()) errors.address = "Address is required"
  if (!formData.type) errors.type = "Select a type"
  if (!formData.environment) errors.environment = "Select an environment"

  const dailyPriceError = validatePositiveNumber(formData.dailyPrice, "Daily price")
  if (dailyPriceError) errors.dailyPrice = dailyPriceError
  const capacityError = validatePositiveNumber(formData.capacity, "Capacity", true)
  if (capacityError) errors.capacity = capacityError
  const surfaceError = validatePositiveNumber(formData.surface, "Surface")
  if (surfaceError) errors.surface = surfaceError

  if (!formData.image.trim()) errors.image = "Image URL is required"
  if (!formData.contactName.trim()) errors.contactName = "Contact name is required"
  if (!formData.phone.trim() && !formData.email.trim()) errors.contact = "Add at least a phone number or an email"

  return errors
}

// Empty optional fields are omitted, unless the user cleared an existing value:
// updates use PATCH, so only "" can remove a value that is already saved.
function toOptional(value:string, initialValue:string):string | undefined {
  return value.trim() === "" && initialValue === "" ? undefined : value
}

export default function LocationForm({
    initialValue,onSubmit,isPending,submitLabel
}:LocationFormProps) {

    const [formData, setFormData] = useState<LocationFormState>(initialValue)
    const [errors, setErrors] = useState<LocationFormErrors>({})
    const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  setErrors((prev) => ({
    ...prev,
    [name]: undefined,
    ...(name === "phone" || name === "email" ? { contact: undefined } : {}),
  }));
};

const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name,checked} = e.target

  setFormData((prev)=>({
    ...prev,
    [name]:checked,
  }))
}

const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const validationErrors = validateLocationForm(formData)
    // flushSync renders the errors before focus moves, so they are announced with the field
    flushSync(() => setErrors(validationErrors))
    if (Object.keys(validationErrors).length > 0 || !formData.type || !formData.environment) {
  // "contact" is shared by phone and email: focus phone, the first of the two
  const invalidFields = Object.keys(validationErrors).map((field) => field === "contact" ? "phone" : field)
  focusFirstInvalidField(formRef.current, invalidFields)
  return;
  }
    const newLocation: LocationInput = {
    name: formData.name,
    city: formData.city,
    address: formData.address,
    type: formData.type,
    environment: formData.environment,
    dailyPrice: Number(formData.dailyPrice),
    capacity: Number(formData.capacity),
    surface: Number(formData.surface),
    parking: formData.parking,
    naturalLight: formData.naturalLight,
    electricity: formData.electricity,
    accessible: formData.accessible,
    image: formData.image,
    contactName: formData.contactName,
    phone: toOptional(formData.phone, initialValue.phone),
    email: toOptional(formData.email, initialValue.email),
    description: toOptional(formData.description, initialValue.description),
    notes: toOptional(formData.notes, initialValue.notes),
  }
  onSubmit(newLocation)
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
            City
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined} />
          </label>
          {errors.city && <p id="city-error" className="field-error">{errors.city}</p>}
        </div>
        <div className="field">
          <label>
            Address
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "address-error" : undefined} />
          </label>
          {errors.address && <p id="address-error" className="field-error">{errors.address}</p>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>
            Type
            <select name="type" value={formData.type} onChange={handleChange} aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? "type-error" : undefined}>
              <option value="">Select type</option>
              <option value="studio">Studio</option>
              <option value="loft">Loft</option>
              <option value="villa">Villa</option>
              <option value="warehouse">Warehouse</option>
              <option value="office">Office</option>
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option>
              <option value="outdoor-space">Outdoor space</option>
              <option value="other">Other</option>
            </select>
          </label>
          {errors.type && <p id="type-error" className="field-error">{errors.type}</p>}
        </div>
        <div className="field">
          <label>
            Environment
            <select name="environment" value={formData.environment} onChange={handleChange} aria-invalid={Boolean(errors.environment)} aria-describedby={errors.environment ? "environment-error" : undefined}>
              <option value="">Select environment</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="both">Both</option>
            </select>
          </label>
          {errors.environment && <p id="environment-error" className="field-error">{errors.environment}</p>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>
            Daily price (€)
            <input type="number" name="dailyPrice" value={formData.dailyPrice} onChange={handleChange} placeholder="Daily price (€)" aria-invalid={Boolean(errors.dailyPrice)} aria-describedby={errors.dailyPrice ? "dailyPrice-error" : undefined} />
          </label>
          {errors.dailyPrice && <p id="dailyPrice-error" className="field-error">{errors.dailyPrice}</p>}
        </div>
        <div className="field">
          <label>
            Capacity (people)
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity (people)" aria-invalid={Boolean(errors.capacity)} aria-describedby={errors.capacity ? "capacity-error" : undefined} />
          </label>
          {errors.capacity && <p id="capacity-error" className="field-error">{errors.capacity}</p>}
        </div>
      </div>
      <div className="field">
        <label>
          Surface (m²)
          <input type="number" name="surface" value={formData.surface} onChange={handleChange} placeholder="Surface (m²)" aria-invalid={Boolean(errors.surface)} aria-describedby={errors.surface ? "surface-error" : undefined} />
        </label>
        {errors.surface && <p id="surface-error" className="field-error">{errors.surface}</p>}
      </div>

      <div className="checkbox-group">
        <label>
          <input type="checkbox" name="parking" checked={formData.parking} onChange={handleCheckboxChange} />
          Parking
        </label>
        <label>
          <input type="checkbox" name="naturalLight" checked={formData.naturalLight} onChange={handleCheckboxChange} />
          Natural light
        </label>
        <label>
          <input type="checkbox" name="electricity" checked={formData.electricity} onChange={handleCheckboxChange} />
          Electricity
        </label>
        <label>
          <input type="checkbox" name="accessible" checked={formData.accessible} onChange={handleCheckboxChange} />
          Accessible
        </label>
      </div>

      <div className="field">
        <label>
          Image URL
          <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" aria-invalid={Boolean(errors.image)} aria-describedby={errors.image ? "image-error" : undefined} />
        </label>
        {errors.image && <p id="image-error" className="field-error">{errors.image}</p>}
      </div>
      <div className="field">
        <label>
          Contact name
          <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Contact name" aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "contactName-error" : undefined} />
        </label>
        {errors.contactName && <p id="contactName-error" className="field-error">{errors.contactName}</p>}
      </div>
      <div>
        <div className="field-row">
          <div className="field">
            <label>
              Phone
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : undefined} />
            </label>
          </div>
          <div className="field">
            <label>
              Email
              <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : undefined} />
            </label>
          </div>
        </div>
        {errors.contact && <p id="contact-error" className="field-error">{errors.contact}</p>}
      </div>

      <div className="field">
        <label>
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
        </label>
      </div>
      <div className="field">
        <label>
          Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes"/>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isPending}>{isPending ? "Saving..." : submitLabel}</button>
      </div>
    </form>

  )
}
