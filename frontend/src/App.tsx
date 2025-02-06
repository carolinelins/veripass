/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from 'react'
import './App.css'
import logo from './assets/logo_transparent.png'
import { login, register } from './services/auth'

function App() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [identifierValidation, setIdentifierValidation] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function clearValidation() {
    setIdentifierValidation('')
    setPasswordValidation('')
  }

  function handleOnClickButtonReset() {
    clearValidation()
    setIdentifier('')
    setPassword('')
  }

  function handleOnInputIdentifier(evt: React.FormEvent<HTMLInputElement>) {
    clearValidation()
    setIdentifier(evt.currentTarget.value)
  }

  function handleOnInputPassword(evt: React.FormEvent<HTMLInputElement>) {
    clearValidation()
    setPassword(evt.currentTarget.value)
  }

  function handleOnInvalid(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    evt.stopPropagation()

    const target = evt.target as HTMLFormElement

    if (target.id === 'identifiant') setIdentifierValidation(target.validationMessage)
    if (target.id === 'mot-de-passe') setPasswordValidation(target.validationMessage)
  }

  async function handleOnSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    evt.stopPropagation()
    setSuccessMessage('')
    setErrorMessage('')

    const submitter = (evt.nativeEvent as SubmitEvent).submitter

    switch (submitter?.id) {
      case 'login':
        try {
          const response = await login(identifier, password)
          setSuccessMessage(response.message)
        } catch (error: any) {
          setErrorMessage(error.response.data.message)
        }
        break
      case 'register':
        try {
          const response = await register(identifier, password)
          setSuccessMessage(response.message)
        } catch (error: any) {
          setErrorMessage(error.response.data.message)
        }
        break
      default:
        break
    }
  }

  return <>
    <img src={logo} width={100} height={132} alt="VeriPass" className="mx-auto d-block mb-4" />
    <div className="card p-0">
      {(successMessage || errorMessage) && <div className="card-header">
        <div className={`alert alert-${successMessage ? 'success' : 'danger'}`}>
          {successMessage || errorMessage}
        </div>
      </div>}

      <form className={`${identifierValidation || passwordValidation ? 'was-validated' : ''}`} onSubmit={handleOnSubmit} onInvalid={handleOnInvalid}>
        <div className="card-body p-4">
          <div>
            <label htmlFor="identifiant" className="form-label">Identifiant</label>
            <input
              type="text"
              className="form-control"
              id="identifiant"
              value={identifier}
              onInput={handleOnInputIdentifier}
              required
            />
            <div className="invalid-feedback">
              {identifierValidation}
            </div>
          </div>
          <div>
            <label htmlFor="mot-de-passe" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="mot-de-passe"
              className="form-control"
              value={password}
              onInput={handleOnInputPassword}
              required
            />
            <div className="invalid-feedback">
              {passwordValidation}
            </div>
          </div>
        </div>
        <div className="card-footer p-4">
          <div className="d-flex gap-3">
            <button type="button" id="reset" className="btn btn-outline-primary" onClick={handleOnClickButtonReset}>Reset</button>
            <button type="submit" id="login" className="btn btn-primary">Valider</button>
            <button type="submit" id="register" className="btn btn-outline-primary">Ajout d'un compte</button>
          </div>
        </div>
      </form>
    </div>
  </>
}

export default App
