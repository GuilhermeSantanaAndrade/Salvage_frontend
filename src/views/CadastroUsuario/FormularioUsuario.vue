<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastro de Usuário</v-toolbar-title>
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
                        <v-text-field label="Nome"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="E-mail"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-text-field label="Login" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Senha" type="password" required></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-divider></v-divider>
                    <br/>
                    Tipo de Usuário:
                    <v-radio-group v-model="row" row>
                      <v-radio label="Seguradora" value="radio-1"></v-radio>
                      <v-radio label="Despachante" value="radio-2"></v-radio>
                      <v-radio label="Guincheiro" value="radio-3"></v-radio>
                    </v-radio-group>
                    <v-flex xs12 sm6 md8>
                      <v-select label="Empresa"></v-select>
                    </v-flex>
                    <v-divider></v-divider>
                    
                    <br/>
                    <v-layout>
                    <v-flex xs12 md3>
                      <v-switch label="Administrador" required color="blue" value input-value="true"></v-switch>
                    </v-flex>
                    <v-flex xs12 md3>
                      <v-switch label="Pusher" required color="blue" value input-value="false"></v-switch>
                    </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'consultaUsuario' }" flat>Voltar</v-btn>
            <v-btn :to="{ name: 'consultaUsuario' }" color="primary">OK</v-btn>
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
