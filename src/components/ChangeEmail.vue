<template>
  <q-page-container>
    <q-page>
      <!-- header -->
      <div class="header-image">
        <div class="lt-sm header-image-mobile">
          <h3 :style="{ color: '#ffffff' }">
            Email wijzigen
          </h3>
        </div>
      </div>

      <!-- success change message -->
      <div class="nsdsk-form" v-show="Messages">
        <transition name="slide-fade">
          <div v-if="Messages">
            <div v-if="showMessage('successMessage')" class="nsdsk-form__content">
              <div class="nsdsk-form__message-title">
                <h3>
                  {{ getMessage('successMessage') }}
                </h3>
              </div>
            </div>

            <!-- success resend message -->
            <div v-if="showMessage('resendMessageSuccess')" class="nsdsk-form__message-title">
              <h3>
                {{ getMessage('resendMessageSuccess') }}
              </h3>
            </div>

            <!-- error message -->
            <div v-if="showMessage('errorMessage')" class="nsdsk-form__content">
              <q-form @submit="validateEmailResendForm">
                <div class="nsdsk-form__title">
                  <h3>
                    {{ getMessage('errorMessage') }}
                  </h3>

                  <!-- error resend message -->
                  <div v-if="showMessage('resendMessageError')" class="q-my-sm text-left">
                    <small class="message-error q-my-xs">
                      {{ getMessage('resendMessageError') }}
                    </small>
                  </div>
                </div>

                <div class="nsdsk-form__inputgroup q-mt-lg">
                  <span class="nsdsk-form__inputgroup-label">
                    Email
                  </span>
                  <q-input
                    class="nsdsk-form__inputgroup-input"
                    v-model="emailResendForm.resendEmail"
                    type="text"
                    outlined
                    @input="$v.emailResendForm.resendEmail.$touch()"
                    lazy-rules
                    :rules="[val => $v.emailResendForm.resendEmail.email || `Vul een email adres in`]"
                  />
                </div>

                <!-- desktop submit -->
                <div class="submit-desktop q-py-md q-gutter-sm gt-xs">
                  <q-btn no-caps size="lg" type="submit" color="orange">
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
        </transition>
      </div>

      <!-- form -->
      <q-form v-show="!Messages" class="nsdsk-form" @submit="validateEmailForm">
        <div class="nsdsk-form__content">
          <div class="q-my-lg gt-xs">
            <h3>Email wijzigen</h3>
          </div>

          <div class="nsdsk-form__inputgroup">
            <span class="nsdsk-form__inputgroup-label">
              Nieuwe email
            </span>
            <q-input
              class="nsdsk-form__inputgroup-input"
              type="text"
              v-model="emailForm.email"
              outlined
              @input="$v.emailForm.email.$touch()"
              lazy-rules
              :rules="[
                val => $v.emailForm.email.email || `vul een email adres in`
              ]"
            >
            </q-input>
          </div>

          <div class="nsdsk-form__inputgroup">
            <span class="nsdsk-form__inputgroup-label"
              >Nieuwe email herhalen</span
            >
            <q-input
              class="nsdsk-form__inputgroup-input"
              v-model="emailForm.repeatEmail"
              type="text"
              outlined
              @input="$v.emailForm.repeatEmail.$touch()"
              lazy-rules
              :rules="[val => $v.emailForm.repeatEmail.identical || `email adres komt niet overeen`]"
            />
          </div>

          <!-- desktop submit -->
          <div class="submit-desktop q-py-sm q-gutter-sm gt-xs">
            <q-btn no-caps size="lg" type="submit" color="orange">
              Email opslaan
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
              Email opslaan
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-page>
  </q-page-container>
</template>

<script>
import apiService from '@/services/ApiService'
import { validationMixin } from 'vuelidate'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { messageMixin } from '@/components/mixins/messageMixin.js'

const messages = [
  {
    name: 'successMessage',
    message: 'Email aangepast.'
  },
  {
    name: 'errorMessage',
    message: 'Fout opgetreden.'
  },
  {
    name: 'resendMessageSuccess',
    message: 'Email verstuurt.'
  },
  {
    name: 'resendMessageError',
    message: 'Email kon niet verstuurd worden, probeer het opnieuw.'
  }
]

export default {
  mixins: [validationMixin, messageMixin(messages)],
  data () {
    return {
      show: false,
      emailForm: {
        email: '',
        repeatEmail: ''
      },
      emailResendForm: {
        resendEmail: ''
      },
      isPwd: true,
      isPwdConfirmation: true
    }
  },
  validations: {
    emailResendForm: {
      resendEmail: { email }
    },
    emailForm: {
      email: {
        email
      },
      repeatEmail: {
        required,
        identical: sameAs('email')
      }
    }
  },
  methods: {
    validateEmailForm () {
      this.$v.emailForm.$touch()
      if (!this.$v.emailForm.$error) {
        this.submitForm()
      }
    },
    validateEmailResendForm () {
      this.$v.emailResendForm.$touch()
      if (!this.$v.emailResendForm.$error) {
        this.resendEmail()
      }
    },
    async submitForm () {
      this.resetMessages()
      try {
        await apiService.confirmEmailChange({
          token: this.$route.query.token,
          email: this.emailForm.email,
          email_confirmation: this.emailForm.repeatEmail
        })
        this.setMessage('successMessage')
      } catch {
        this.setMessage('errorMessage')
      }
    },
    async resendEmail () {
      try {
        await apiService.resendEmailChangeEmail({
          email: this.emailResendForm.resendEmail
        })
        this.resetMessages()
        this.setMessage('resendMessageSuccess')
      } catch {
        this.setMessage('resendMessageError')
      }
    }
  }
}
</script>
