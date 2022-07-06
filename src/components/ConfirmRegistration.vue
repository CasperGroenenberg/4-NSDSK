<template>
  <q-page-container>
    <q-page>
      <!-- header -->
      <div class="header-image">
        <div class="lt-sm header-image-mobile" />
      </div>

      <!-- success message -->
      <div class="nsdsk-form">
        <div v-if="showMessage('successMessage')" class="nsdsk-form__content">
          <div class="nsdsk-form__message-title">
            <h3>
              {{ getMessage('successMessage') }}
            </h3>
          </div>
        </div>

        <!-- error message -->
        <div v-if="showMessage('errorMessage')" class="nsdsk-form__message-title q-my-lg">
          <div class="nsdsk-form__content">
            <q-form @submit="validateForm">
              <h3>
                {{ getMessage('errorMessage') }}
              </h3>

              <!-- error resend message -->
              <div v-if="showMessage('resendEmailError')" class="q-mt-xs">
                <small class="message-error">
                   {{ getMessage('resendEmailError') }}
                </small>
              </div>

              <div class="nsdsk-form__inputgroup q-mt-lg q-mb-xl">
                <span class="nsdsk-form__inputgroup-label">
                  Email
                </span>
                <q-input
                  class="nsdsk-form__inputgroup-input"
                  v-model="emailForm.email"
                  type="text"
                  outlined
                  @input="$v.emailForm.email.$touch()"
                  lazy-rules
                  :rules="[val => $v.emailForm.email.email || `Vul een email adres in`]"
                />
              </div>

              <!-- desktop submit -->
              <div class="submit-desktop float-right q-py-sm q-gutter-sm gt-xs">
                <q-btn no-caps rounded size="lg" type="submit" color="orange">
                  Verstuur email opnieuw
                </q-btn>
              </div>

              <!-- mobile submit -->
              <div class="submit-mobile lt-sm">
                <q-btn
                  no-caps
                  class="full-width"
                  size="lg"
                  type="submit"
                  color="orange"
                >
                  Verstuur email opnieuw
                </q-btn>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import apiService from '@/services/ApiService'
import { validationMixin } from 'vuelidate'
import { email } from 'vuelidate/lib/validators'
import { messageMixin } from '@/components/mixins/messageMixin.js'

const messages = [
  {
    name: 'successMessage',
    message: 'Account aangemaakt.'
  },
  {
    name: 'errorMessage',
    message: 'Account kan niet aangemaakt worden.'
  },
  {
    name: 'resendEmailError',
    message: 'Email kon niet verstuurd worden, probeer het opnieuw.'
  }
]

export default {
  mixins: [validationMixin, messageMixin(messages)],
  data () {
    return {
      emailForm: {
        email: ''
      }
    }
  },
  validations: {
    emailForm: {
      email: { email }
    }
  },
  mounted () {
    this.confirmRegistration()
  },
  methods: {
    validateForm () {
      this.$v.emailForm.$touch()
      if (!this.$v.emailForm.$error) {
        this.resendConfirmationEmail()
      }
    },
    async confirmRegistration () {
      try {
        await apiService.confirmPasswordChange({
          token: this.$route.query.token
        })
        this.setMessage('successMessage')
      } catch {
        this.setMessage('errorMessage')
      }
    },
    async resendConfirmationEmail () {
      try {
        await apiService.resendConfirmRegistrationEmail({
          email: this.email
        })
      } catch {
        this.setMessage('resendEmailError')
      }
    }
  }
}
</script>
