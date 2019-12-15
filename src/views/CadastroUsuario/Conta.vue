<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Dados do Usuário</v-toolbar-title>
            </v-toolbar>
          </v-flex>
          <v-card-text>
            <v-layout>
              <v-flex xs12>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-flex xs6 md2>
                      <v-text-field label="Código" disabled></v-text-field>
                    </v-flex>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-text-field label="Nome" disabled></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="E-mail"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-text-field label="Login" disabled></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Senha" type="password" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'home' }" flat>Cancelar</v-btn>
            <v-btn :to="{ name: 'home' }" color="primary">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'

  export default {
    data () {
      return {
        menu: false
      }
    },
    created: function () {
      Vue.showMessage('Formulário ainda não implementado.', 'warning')
    },
    methods: {
      redirecionar (value) {
        Vue.hideMessage()
        Vue.showLoading()
      }
    }
  }
</script>

<style>
</style>
