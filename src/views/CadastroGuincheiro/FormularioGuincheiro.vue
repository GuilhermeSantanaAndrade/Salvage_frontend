<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastro de Guincheiro</v-toolbar-title>
            </v-toolbar>
          </v-flex>
          <v-card-text>
            <v-layout>
              <v-flex xs12>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-text-field label="Nome" required :rules="requiredField" :maxlength="50" v-model="Guincheiro.nome"></v-text-field>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-select label="Tipo Pessoa" required :rules="requiredField" :items="tipos_pessoa" item-text="text" item-value="value" v-model="Guincheiro.tipo_pessoa"></v-select>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field label="CPF/CNPJ" required :rules="requiredField" v-model="Guincheiro.cpf_cnpj" :mask="(Guincheiro.tipo_pessoa === 'PJ' ? '##.###.###/####-##' : '###.###.###-##')"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="IE/RG" :maxlength="20" v-model="Guincheiro.ie"></v-text-field>
                      </v-flex>                      
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-menu v-model="menu" :close-on-content-click="false" :full-width=true max-width="290" disabled>
                          <v-text-field slot="activator" :value="dataCriacaoFormatted" clearable label="Data cadastro" disabled>
                          </v-text-field>                      
                          <v-date-picker v-model="dataCriacao" @change="dataChange()" disabled ></v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-menu v-model="menu2" :close-on-content-click="false" :full-width=true max-width="290" disabled>
                          <v-text-field slot="activator" :value="dataAtualizacaoFormatted" clearable label="Data atualização" disabled>
                          </v-text-field>                      
                          <v-date-picker v-model="dataAtualizacao" @change="dataAtualizacaoChange()" disabled></v-date-picker>
                        </v-menu>
                      </v-flex>                      
                    </v-layout>                    
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="Telefone Principal" mask="(##) #########" required :rules="requiredField" v-model="Guincheiro.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field label="E-mail Principal" :maxlength="50" required :rules="emailRules" v-model="Guincheiro.email"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-subheader style="padding-left: 0px">Endereço</v-subheader>
                    <v-layout>
                      <v-flex xs2 md2 sm2>
                        <v-text-field label="CEP" mask="#####-###" v-on:change="search_cep" required :rules="requiredField" v-model="Guincheiro.endereco.cep"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md10>
                        <v-text-field label="Logradouro" :maxlength="50" required :rules="requiredField" v-model="Guincheiro.endereco.logradouro"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md2>
                        <v-text-field label="Número" :maxlength="10" required :rules="requiredField" v-model="Guincheiro.endereco.numero"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-text-field label="Complemento" :maxlength="50" v-model="Guincheiro.endereco.complemento"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md8>
                        <v-text-field label="Bairro" :maxlength="50" required :rules="requiredField" v-model="Guincheiro.endereco.bairro"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md8>
                        <v-text-field label="Cidade" :maxlength="50" required :rules="requiredField" v-model="Guincheiro.endereco.cidade"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Estado" :maxlength="2" required :rules="requiredField" v-model="Guincheiro.endereco.uf"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <!--<v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="Contatos" required v-model="Guincheiro.contato"></v-text-field>
                      </v-flex>
                    </v-layout>-->
                    <v-textarea :counter="200" :maxlength="200">
                      <div slot="label">Observações <small>(opcional)</small></div>
                    </v-textarea>
                    <v-switch label="Ativo" required color="blue" value v-model="Guincheiro.ativo"></v-switch>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'consultaGuincheiro' }" flat>Voltar</v-btn>
            <v-btn @click="efetivar('consultaGuincheiro')" color="primary">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import {guincheiro, funcoes} from '../../../lib/app'
  import moment from 'moment'

  export default {
    data () {
      return {
        isAlteracao: false,
        menu: false,
        menu2: false,
        Guincheiro: {},
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
      this.Guincheiro = guincheiro.Guincheiro()
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
          guincheiro.listar({guid: this.$route.params.guid}).then(result => {
            This.Guincheiro = result[0]
            This.Guincheiro.dataCriacao = new Date(This.Guincheiro.dataCriacao).toISOString().substr(0, 10)
            Vue.hideLoading()
          },
          rejected => {
            Vue.showMessage('Erro: ' + rejected.toString(), 'error')
          })
        } else {
          this.Guincheiro = guincheiro.Guincheiro()
        }
      },
      efetivar (value) {
        if (this.$refs.form.validate()) {
          Vue.showLoading()
          this.Guincheiro.dataAtualizacao = new Date().toISOString().substr(0, 10)
          if (this.isAlteracao) {
            guincheiro.alterar(this.Guincheiro).then(result => {
              Vue.showMessage('Cadastro alterado.')
              this.$router.push({ name: value })
            },
            rejected => {
              Vue.showMessage(rejected.toString(), 'error')
            })
          } else {
            guincheiro.incluir(this.Guincheiro).then(result => {
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
        this.Guincheiro.dataCriacao = this.dataCriacao
        this.menu = false
      },
      dataAtualizacaoChange () {
        this.Guincheiro.dataAtualizacao = this.dataAtualizacao
        this.menu2 = false
      },
      formatDate (field) {
        let auxField = field === 'dataCriacao' ? this.Guincheiro.dataCriacao : this.Guincheiro.dataAtualizacao
        let dt = auxField !== undefined ? auxField : new Date()
        dt = dt ? moment(dt).locale('pt-br').format('DD[/]MM[/]YYYY [(]dddd[)]') : ''
        return dt
      },
      search_cep () {
        Vue.showLoading()
        let This = this
        funcoes.buscaCEP(this.Guincheiro.endereco.cep).then(result => {
          This.Guincheiro.endereco = result[0]
          Vue.hideLoading()
        },
        rejected => {
          this.Guincheiro.endereco.logradouro = ''
          this.Guincheiro.endereco.complemento = ''
          this.Guincheiro.endereco.bairro = ''
          this.Guincheiro.endereco.cidade = ''
          this.Guincheiro.endereco.uf = ''
          Vue.hideLoading()
        })
      }
    }
  }
</script>

<style>
</style>
