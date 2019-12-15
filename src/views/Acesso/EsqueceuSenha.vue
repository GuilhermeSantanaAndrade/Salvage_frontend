<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Esqueci minha senha</v-toolbar-title> 
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" prepend-icon="email" name="email" label="E-mail" type="text" :rules="emailRules"></v-text-field> 
          <router-link :to="{name:'login'}" >Voltar</router-link>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="enviarEmailClick()" color="primary">Enviar email</v-btn>
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
      valid: false,
      name: '',
      email: '',
      nameRules: [
        v => !!v || 'Login requerido',
        v => v.length <= 10 || 'Login necessita no mínimo 10 caracteres'
      ],
      emailRules: [
        v => !!v || 'E-mail requerido',
        v => /.+@.+/.test(v) || 'E-mail inválido'
      ]
    }
  },
  methods: {
    enviarEmailClick () {
      let result = acesso.esqueceuSenha(this.email)
      if (result && result.accept) {
        Vue.showMessage('Senha enviado ao e-mail informado.', 'success')
      } else {
        Vue.showMessage('Erro: ' + result.msg, 'error')
      }
    }
  }
}
</script>

<style>

</style>
