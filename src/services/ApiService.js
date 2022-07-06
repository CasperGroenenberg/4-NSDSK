import axios from 'axios'

const Api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
})

export default {
  confirmRegistration (token) {
    return Api().post('me/confirm_registration', {
      token
    })
  },
  resendConfirmRegistrationEmail (email) {
    return Api().post('me/resend_confirmation', {
      email
    })
  },
  confirmPasswordChange (payload) {
    return Api().post('me/confirm_password_reset', {
      payload
    })
  },
  resendPasswordChangeEmail (email) {
    return Api().post('me/reset_password', {
      email
    })
  },
  confirmEmailChange (payload) {
    return Api().post('me/confirm_email_change', {
      payload
    })
  },
  resendEmailChangeEmail (email) {
    return Api().post('me/reset_email', {
      email
    })
  }
}
