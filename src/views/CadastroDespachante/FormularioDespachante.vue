<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastro de Despachante</v-toolbar-title>
            </v-toolbar>
          </v-flex>
          <v-card-text>
            <v-layout>
              <v-flex xs12>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-text-field label="Nome" required :rules="requiredField" :maxlength="50" v-model="Despachante.nome"></v-text-field>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-select label="Tipo Pessoa" required :rules="requiredField" :items="tipos_pessoa" item-text="text" item-value="value" v-model="Despachante.tipo_pessoa"></v-select>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field label="CPF/CNPJ" required :rules="requiredField" v-model="Despachante.cpf_cnpj" :mask="(Despachante.tipo_pessoa === 'PJ' ? '##.###.###/####-##' : '###.###.###-##')"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="IE/RG" :maxlength="20" required v-model="Despachante.ie"></v-text-field>
                      </v-flex>                      
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :full-width=true
                        max-width="290"
                        disabled>
                          <v-text-field
                            slot="activator"
                            :value="dataCriacaoFormatted"
                            clearable
                            label="Data cadastro"
                            disabled>
                          </v-text-field>                      
                          <v-date-picker
                            v-model="dataCriacao"
                            @change="dataChange()"
                            disabled
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :full-width=true
                        max-width="290"
                        disabled>
                          <v-text-field
                            slot="activator"
                            :value="dataAtualizacaoFormatted"
                            clearable
                            label="Data atualização"
                            disabled>
                          </v-text-field>                      
                          <v-date-picker
                            v-model="dataAtualizacao"
                            @change="dataAtualizacaoChange()"
                            disabled
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>                      
                    </v-layout>                    
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="Telefone Principal" mask="(##) #########" required :rules="requiredField" v-model="Despachante.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field label="E-mail Principal" :maxlength="50" required :rules="emailRules" v-model="Despachante.email"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-subheader style="padding-left: 0px">Endereço</v-subheader>
                    <v-layout>
                      <v-flex xs2 md2 sm2>
                        <v-text-field label="CEP" mask="#####-###" v-on:change="search_cep" required :rules="requiredField" v-model="Despachante.endereco.cep"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md10>
                        <v-text-field label="Logradouro" :maxlength="50" required :rules="requiredField" v-model="Despachante.endereco.logradouro"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md2>
                        <v-text-field label="Número" :maxlength="10" required :rules="requiredField" v-model="Despachante.endereco.numero"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-text-field label="Complemento" :maxlength="50" required v-model="Despachante.endereco.complemento"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md8>
                        <v-text-field label="Bairro" :maxlength="50" required :rules="requiredField" v-model="Despachante.endereco.bairro"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md8>
                        <v-text-field label="Cidade" :maxlength="50" required :rules="requiredField" v-model="Despachante.endereco.cidade"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Estado" :maxlength="2" required :rules="requiredField" v-model="Despachante.endereco.uf"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <!--<v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="Contatos" required v-model="Despachante.contato"></v-text-field>
                      </v-flex>
                    </v-layout>-->
                    <v-textarea  :counter="200" :maxlength="200">
                      <div slot="label">Observações <small>(opcional)</small></div>
                    </v-textarea>
                    <v-switch label="Ativo" required color="blue" value v-model="Despachante.ativo"></v-switch>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'consultaDespachante' }" flat>Voltar</v-btn>
            <v-btn @click="efetivar('consultaDespachante')" color="primary">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import {despachante, funcoes} from '../../../lib/app'
  import moment from 'moment'

  export default {
    data () {
      return {
        isAlteracao: false,
        menu: false,
        menu2: false,
        Despachante: {},
        dataCriacao: new Date().toISOString().substr(0, 10),
        dataAtualizacao: new Date().toISOString().substr(0, 10),
        tipos_pessoa: [{text: 'FÍSICA', value: 'PF'}, {text: 'JURÍDICA', value: 'PJ'}],
        requiredField: [ v => !!v || 'Campo obrigatório' ],
        emailRules: [
          v => !!v || 'Campo obrigatório',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido'
        ]
      }
    },
    created: async function () {
      this.Despachante = despachante.Despachante()
      await this.initialize()
    },
    computed: {
      dataCriacaoFormatted () {
        return this.formatDate('dataCriacao')
      },
      dataAtualizacaoFormatted () {
        return this.formatDate('dataAtualizacao')
      }
    },
    methods: {
      initialize () {
        if (this.$route.params.guid) {
          this.isAlteracao = true
          Vue.showLoading()
          let This = this
          despachante.listar({guid: this.$route.params.guid}).then(result => {
            This.Despachante = result[0]
            This.Despachante.dataCriacao = new Date(This.Despachante.dataCriacao).toISOString().substr(0, 10)
            Vue.hideLoading()
          },
          rejected => {
            Vue.showMessage('Login inválido: ' + rejected.toString(), 'error')
          })
        } else {
          this.Despachante = despachante.Despachante()
        }
      },
      efetivar (value) {
        if (this.$refs.form.validate()) {
          Vue.showLoading()
          if (this.isAlteracao) {
            despachante.alterar(this.Despachante).then(result => {
              Vue.showMessage('Cadastro alterado.')
              this.$router.push({ name: value })
            },
            rejected => {
              Vue.showMessage(rejected.toString(), 'error')
            })
          } else {
            despachante.incluir(this.Despachante).then(result => {
              Vue.showMessage('Cadastro realizado.')
              this.$router.push({ name: value })
            },
            rejected => {
              Vue.showMessage(rejected.toString(), 'error')
            })
          }
        }
      },
      dataChange () {
        this.Despachante.dataCriacao = this.dataCriacao
        this.menu = false
      },
      dataAtualizacaoChange () {
        this.Despachante.dataAtualizacao = this.dataAtualizacao
        this.menu2 = false
      },
      formatDate (field) {
        let auxField = field === 'dataCriacao' ? this.Despachante.dataCriacao : this.Despachante.dataAtualizacao
        let dt = auxField !== undefined ? auxField : new Date()
        dt = dt ? moment(dt).locale('pt-br').format('DD[/]MM[/]YYYY [(]dddd[)]') : ''
        return dt
      },
      search_cep () {
        Vue.showLoading()
        let This = this
        funcoes.buscaCEP(this.Despachante.endereco.cep).then(result => {
          This.Despachante.endereco = result[0]
          Vue.hideLoading()
        },
        rejected => {
          this.Despachante.endereco.logradouro = ''
          this.Despachante.endereco.complemento = ''
          this.Despachante.endereco.bairro = ''
          this.Despachante.endereco.cidade = ''
          this.Despachante.endereco.uf = ''
          Vue.hideLoading()
        })
      }
    }
  }
</script>

<style>
</style>
