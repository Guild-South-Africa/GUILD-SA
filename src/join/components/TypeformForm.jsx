import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { submitJoin } from '../lib/submitJoin'
import TeamInviteSuccess from './TeamInviteSuccess'

function buildInitialValues(steps, defaults = {}) {
  const values = { ...defaults }

  steps.flat().forEach((field) => {
    if (field.defaultValue !== undefined && values[field.name] === undefined) {
      values[field.name] = field.defaultValue
    }
    if (field.type === 'checkbox' && values[field.name] === undefined) {
      values[field.name] = false
    }
  })

  return values
}

function StepField({ field, value, touched, onChange }) {
  const { name, label, type, required, placeholder, options, accept, min, max, checkboxLabel, checkboxHref } = field
  const inputClass = touched ? 'is-touched' : ''

  if (type === 'checkbox') {
    return (
      <label>
        <input
          type="checkbox"
          name={name}
          checked={Boolean(value)}
          required={required}
          className={inputClass}
          onChange={(event) => onChange(name, event.target.checked)}
        />
        {name === 'consentAccepted' ? (
          <>
            I accept the{' '}
            <a href={checkboxHref || '/privacy.html'} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
              Terms & POPIA Consent
            </a>
          </>
        ) : (
          checkboxLabel || label
        )}
      </label>
    )
  }

  if (type === 'textarea') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          name={name}
          value={value ?? ''}
          required={required}
          placeholder={placeholder}
          className={inputClass}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </>
    )
  }

  if (type === 'select') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          name={name}
          value={value ?? ''}
          required={required}
          className={inputClass}
          onChange={(event) => onChange(name, event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    )
  }

  if (type === 'file') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          className={inputClass}
          onChange={(event) => onChange(name, event.target.files?.[0] ?? null)}
        />
      </>
    )
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ''}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className={inputClass}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </>
  )
}

function validateField(field, value) {
  if (field.type === 'file') {
    if (field.required && !value) return false
    return true
  }

  if (field.type === 'checkbox') {
    return field.required ? Boolean(value) : true
  }

  if (!field.required) {
    if (value === undefined || value === null || value === '') return true
  }

  if (value === undefined || value === null || String(value).trim() === '') {
    return false
  }

  if (field.type === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
  }

  if (field.type === 'url' && value) {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  if (field.type === 'number') {
    const num = Number(value)
    if (Number.isNaN(num)) return false
    if (field.min !== undefined && num < field.min) return false
    if (field.max !== undefined && num > field.max) return false
  }

  return true
}

export default function TypeformForm({ type, config, initialValues = {} }) {
  const steps = config.steps
  const flatSteps = useMemo(() => steps.map((stepFields) => stepFields), [steps])
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState(() => buildInitialValues(flatSteps, initialValues))
  const [touchedFields, setTouchedFields] = useState({})
  const [status, setStatus] = useState({ text: '', tone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [teamInvite, setTeamInvite] = useState(null)
  const formRef = useRef(null)

  const isFirstStep = activeStep === 0
  const isFinalStep = activeStep === flatSteps.length - 1
  const progress = `${((activeStep + 1) / flatSteps.length) * 100}%`

  const setFieldValue = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const markStepTouched = useCallback((stepIndex) => {
    const fields = flatSteps[stepIndex] || []
    setTouchedFields((prev) => {
      const next = { ...prev }
      fields.forEach((field) => {
        next[field.name] = true
      })
      return next
    })
  }, [flatSteps])

  const validateStep = useCallback((stepIndex) => {
    const fields = flatSteps[stepIndex] || []
    markStepTouched(stepIndex)
    return fields.every((field) => validateField(field, formData[field.name]))
  }, [flatSteps, formData, markStepTouched])

  const focusActiveField = useCallback(() => {
    const active = formRef.current?.querySelector('.typeform-step.is-active input:not([type="checkbox"]), .typeform-step.is-active textarea, .typeform-step.is-active select')
    window.setTimeout(() => active?.focus({ preventScroll: true }), 120)
  }, [])

  const moveStep = useCallback((direction) => {
    if (direction > 0 && !validateStep(activeStep)) {
      setStatus({ text: 'Fill this one in, then keep moving.', tone: 'is-error' })
      return
    }

    setStatus({ text: '', tone: '' })
    setActiveStep((prev) => Math.min(Math.max(prev + direction, 0), flatSteps.length - 1))
  }, [activeStep, flatSteps.length, validateStep])

  useEffect(() => {
    focusActiveField()
  }, [activeStep, focusActiveField])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateStep(activeStep)) {
      setStatus({ text: 'One answer still needs attention.', tone: 'is-error' })
      return
    }

    setSubmitting(true)
    setStatus({ text: 'Preparing your application...', tone: '' })

    try {
      const hasUploads = Object.values(formData).some((value) => value instanceof File && value.size)
      setStatus({
        text: hasUploads ? 'Uploading and submitting your application...' : 'Submitting your application...',
        tone: '',
      })

      const result = await submitJoin(type, formData)

      if (result.inviteCode && result.inviteUrl) {
        setTeamInvite({
          inviteCode: result.inviteCode,
          inviteUrl: result.inviteUrl,
          emailSent: result.inviteEmailSent === true,
          leaderEmail: formData.leaderEmail || '',
        })
        setStatus({ text: '', tone: '' })
        return
      }

      setStatus({ text: 'Success! You are now in the system.', tone: 'is-success' })
      setFormData(buildInitialValues(flatSteps, initialValues))
      setActiveStep(0)
      setTouchedFields({})
    } catch (error) {
      setStatus({ text: error.message || 'Network error. Please try again.', tone: 'is-error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || event.target.matches('textarea')) return
    event.preventDefault()
    if (isFinalStep) {
      handleSubmit(event)
    } else {
      moveStep(1)
    }
  }

  return (
    teamInvite ? (
      <TeamInviteSuccess
        inviteCode={teamInvite.inviteCode}
        inviteUrl={teamInvite.inviteUrl}
        emailSent={teamInvite.emailSent}
        leaderEmail={teamInvite.leaderEmail}
      />
    ) : (
    <form
      ref={formRef}
      className={`typeform-form is-active${isFirstStep ? ' is-first-step' : ''}${isFinalStep ? ' is-final-step' : ''}`}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="form-progress">
        <span style={{ '--progress': progress }} />
      </div>

      {flatSteps.map((stepFields, stepIndex) => (
        <div key={stepIndex} className={`typeform-step${stepIndex === activeStep ? ' is-active' : ''}`}>
          {stepFields.map((field) => (
            <StepField
              key={field.name}
              field={field}
              value={formData[field.name]}
              touched={touchedFields[field.name]}
              onChange={setFieldValue}
            />
          ))}
        </div>
      ))}

      <div className="typeform-actions">
        <button className="button secondary" type="button" data-form-back disabled={isFirstStep} onClick={() => moveStep(-1)}>
          Back
        </button>
        <button className="button" type="button" data-form-next onClick={() => moveStep(1)}>
          Next
        </button>
        <button className="button" type="submit" data-form-submit disabled={submitting}>
          Submit
        </button>
      </div>

      <p className={`form-note${status.tone ? ` ${status.tone}` : ''}`}>{status.text}</p>
    </form>
    )
  )
}
