<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title> 
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field v-model="loginText" prepend-icon="person" name="login" label="Usuário" type="text" :rules="nameRules" @keypress="keyPress($event)"></v-text-field>
          <v-text-field v-model="passText" id="password" prepend-icon="lock" name="password" label="Senha" type="password" :rules="passwordRules" @keypress="keyPress($event)"></v-text-field>
          <!-- <router-link :to="{ name: 'esqueceusenha' }" >Esqueci minha senha</router-link> -->
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="loginClick()" color="primary">Entrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import {acesso} from '../../../lib/app'
import Vue from 'vue'

export default {
  data () {
    return {
      loginText: '',
      passText: '',
      emailEsqueciSenha: '',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Login requerido',
        v => true || (v && v.length <= 10) || 'Login necessita no mínimo 10 caracteres'
      ],
      email: '',
      passwordRules: [
        v => !!v || 'Senha requerida'
      ]
    }
  },
  methods: {
    loginClick () {
      if (this.loginText.toUpperCase() === 'PUSH') {
        Vue.showMessage('Usuário inválido', 'error')
        return false
      }
      Vue.showLoading()
      acesso.login(this.loginText, this.passText).then(result => {
        this.$store.commit('setUsuario', {Usuario: result})
        this.$router.push({name: 'home'})
      },
      rejected => {
        Vue.showMessage(rejected.toString(), 'error')
      })
    },
    keyPress (ev) {
      if (ev.charCode === 13) {
        this.loginClick()
      }
    }
  },
  props: {
    source: String
  },
  created () {
    this.$store.commit('setUsuario', {Usuario: {}})
  }
}
</script>

<style>

</style>
