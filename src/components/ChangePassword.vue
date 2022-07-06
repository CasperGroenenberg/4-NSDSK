<template>
  <q-page-container>
    <q-page>
      <!-- header -->
      <div class="header-image">
        <div class="lt-sm header-image-mobile">
          <h3 :style="{ color: '#ffffff' }">
            Wachtwoord wijzigen
          </h3>
        </div>
      </div>

      <!-- success message -->
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

            <!-- error message -->
            <q-form v-if="showMessage('errorMessage')" @submit="validatePasswordResendForm">
              <div class="nsdsk-form__content">
                <div class="nsdsk-form__title">
                  <h3>
                     {{ getMessage('errorMessage') }}
                  </h3>
                  <b>
                    Verstuur email opnieuw
                  </b>
                </div>

                <div class="nsdsk-form__inputgroup q-mt-lg">
                  <span class="nsdsk-form__inputgroup-label">
                    Email
                  </span>
                  <q-input
                    class="nsdsk-form__inputgroup-input"
                    v-model="passwordResendForm.resendPassword"
                    type="text"
                    outlined
                    @input="$v.passwordResendForm.resendPassword.$touch()"
                    lazy-rules
                    :rules="[val => $v.passwordResendForm.resendPassword.email || `Vul een email adres in`]"
                  />
                </div>

                <!-- desktop submit -->
                <div class="submit-desktop q-py-md q-gutter-sm gt-xs">
                  <q-btn no-caps rounded size="lg" type="submit" color="orange">
                    Verstuur email
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
                    Verstuur email
                  </q-btn>
                </div>
              </div>
            </q-form>
          </div>
        </transition>
      </div>

      <!-- form -->
      <q-form class="nsdsk-form" @submit="validatePasswordForm">
        <div v-show="!Messages">
          <div class="nsdsk-form__content">
            <div class="q-my-lg gt-xs">
              <h3>Wachtwoord wijzigen</h3>
            </div>
            <div class="nsdsk-form__inputgroup">
              <span class="nsdsk-form__inputgroup-label">
                Nieuw wachtwoord
              </span>
              <q-input
                class="nsdsk-form__inputgroup-input"
                :type="isPwd ? 'password' : 'text'"
                v-model="passwordForm.password"
                outlined
                @input="$v.passwordForm.password.$touch()"
                lazy-rules
                :rules="[
                  val =>
                    $v.passwordForm.password.minLength ||
                    `wachtwoord moet meer dan 6 karakters bevatten`,
                  val =>
                    $v.passwordForm.password.maxLength ||
                    `wachtwoord mag maximaal 20 karakters bevatten`
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <div class="nsdsk-form__inputgroup">
              <span class="nsdsk-form__inputgroup-label"
                >Nieuw wachtwoord herhalen</span
              >
              <q-input
                class="nsdsk-form__inputgroup-input"
                v-model="passwordForm.repeatPassword"
                :type="isPwdConfirmation ? 'password' : 'text'"
                outlined
                @input="$v.passwordForm.repeatPassword.$touch()"
                lazy-rules
                :rules="[
                  val =>
                    $v.passwordForm.repeatPassword.identical ||
                    `wachtwoord komt niet overeen`
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwdConfirmation ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdConfirmation = !isPwdConfirmation"
                  />
                </template>
              </q-input>
            </div>

            <!-- desktop submit -->
            <div class="submit-desktop q-py-sm q-gutter-sm gt-xs">
              <q-btn no-caps size="lg" type="submit" color="orange">
                Wachtwoord opslaan
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
                Wachtwoord opslaan
              </q-btn>
            </div>
          </div>
        </div>
      </q-form>
    </q-page>
  </q-page-container>
</template>

<script>
import apiService from '@/services/ApiService'
import { validationMixin } from 'vuelidate'
import { messageMixin } from '@/components/mixins/messageMixin.js'
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

const messages = [
  {
    name: 'successMessage',
    message: 'Wachtwoord verandert.'
  },
  {
    name: 'errorMessage',
    message: 'Fout opgetreden.'
  }
]

export default {
  mixins: [validationMixin, messageMixin(messages)],
  data () {
    return {
      show: false,
      passwordForm: {
        password: '',
        repeatPassword: ''
      },
      passwordResendForm: {
        resendPassword: ''
      },
      isPwd: true,
      isPwdConfirmation: true
    }
  },
  validations: {
    passwordResendForm: {
      resendPassword: { email }
    },
    passwordForm: {
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20)
      },
      repeatPassword: {
        required,
        identical: sameAs('password')
      }
    }
  },
  methods: {
    validatePasswordForm () {
      this.$v.passwordForm.$touch()
      if (!this.$v.passwordForm.$error) {
        this.submitForm()
      }
    },
    validatePasswordResendForm () {
      this.$v.passwordResendForm.$touch()
      if (!this.$v.passwordResendForm.$error) {
        this.resendEmail()
      }
    },
    async submitForm () {
      this.resetMessages()
      try {
        await apiService.confirmPasswordChange({
          token: this.$route.query.token,
          password: this.passwordForm.password,
          password_confirmation: this.passwordForm.repeatPassword
        })
        this.setMessage('successMessage')
      } catch {
        this.setMessage('errorMessage')
      }
    },
    async resendEmail () {
      await apiService.resendPasswordChangeEmail(this.passwordResendForm)
    }
  }
}
</script>
