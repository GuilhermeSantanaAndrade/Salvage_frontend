<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastro de Oficina</v-toolbar-title>
            </v-toolbar>
          </v-flex>
          <v-card-text>
            <v-layout>
              <v-flex xs12>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-text-field label="Nome" :rules="requiredField" :maxlength="50" required v-model="Oficina.nome"></v-text-field>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-select label="Tipo Pessoa" :rules="requiredField" required :items="tipos_pessoa" item-text="text" item-value="value" v-model="Oficina.tipo_pessoa"></v-select>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field label="CPF/CNPJ" :rules="requiredField" :mask="(Oficina.tipo_pessoa === 'PJ' ? '##.###.###/####-##' : '###.###.###-##')" required v-model="Oficina.cpf_cnpj"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="IE/RG" :maxlength="20" required v-model="Oficina.ie"></v-text-field>
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
                        <v-text-field label="Telefone Principal" mask="(##) #########" required :rules="requiredField" v-model="Oficina.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field label="E-mail Principal" :maxlength="50" required :rules="emailRules" v-model="Oficina.email"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-subheader style="padding-left: 0px">Endereço</v-subheader>
                    <v-layout>
                      <v-flex xs2 md2 sm2>
                        <v-text-field label="CEP" mask="#####-###" v-on:change="search_cep" required :rules="requiredField" v-model="Oficina.endereco.cep"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md10>
                        <v-text-field label="Logradouro" :maxlength="50" required :rules="requiredField" v-model="Oficina.endereco.logradouro"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md2>
                        <v-text-field label="Número" :maxlength="10" required :rules="requiredField" v-model="Oficina.endereco.numero"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-text-field label="Complemento"  :maxlength="50" v-model="Oficina.endereco.complemento"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md8>
                        <v-text-field label="Bairro" :maxlength="50" required :rules="requiredField" v-model="Oficina.endereco.bairro"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md8>
                        <v-text-field label="Cidade" :maxlength="50" required :rules="requiredField" v-model="Oficina.endereco.cidade"></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Estado" :maxlength="2" required :rules="requiredField" v-model="Oficina.endereco.uf"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <!--<v-layout>
                      <v-flex xs12 md6>
                        <v-text-field label="Contatos" required v-model="Oficina.contato"></v-text-field>
                      </v-flex>
                    </v-layout>-->
                    <v-textarea>
                      <div slot="label">Observações <small>(opcional)</small></div>
                    </v-textarea>
                    <v-switch label="Ativo" required color="blue" value v-model="Oficina.ativo"></v-switch>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'consultaOficina' }" flat>Voltar</v-btn>
            <v-btn @click="efetivar('consultaOficina')" color="primary">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import Vue from 'vue'
  import {oficina, funcoes} from '../../../lib/app'
  import moment from 'moment'

  export default {
    data () {
      return {
        isAlteracao: false,
        menu: false,
        menu2: false,
        Oficina: {},
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
      this.Oficina = oficina.Oficina()
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
          oficina.listar({guid: this.$route.params.guid}).then(result => {
            This.Oficina = result[0]
            This.Oficina.dataCriacao = new Date(This.Oficina.dataCriacao).toISOString().substr(0, 10)
            Vue.hideLoading()
          },
          rejected => {
            Vue.showMessage('Login inválido: ' + rejected.toString(), 'error')
          })
        } else {
          this.Oficina = oficina.Oficina()
        }
      },
      efetivar (value) {
        if (this.$refs.form.validate()) {
          Vue.showLoading()
          if (this.isAlteracao) {
            oficina.alterar(this.Oficina).then(result => {
              Vue.showMessage('Cadastro alterado.')
              this.$router.push({ name: value })
            },
            rejected => {
              Vue.showMessage(rejected.toString(), 'error')
            })
          } else {
            oficina.incluir(this.Oficina).then(result => {
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
        this.Oficina.dataCriacao = this.dataCriacao
        this.menu = false
      },
      dataAtualizacaoChange () {
        this.Oficina.dataAtualizacao = this.dataAtualizacao
        this.menu2 = false
      },
      formatDate (field) {
        let auxField = field === 'dataCriacao' ? this.Oficina.dataCriacao : this.Oficina.dataAtualizacao
        let dt = auxField !== undefined ? auxField : new Date()
        dt = dt ? moment(dt).locale('pt-br').format('DD[/]MM[/]YYYY [(]dddd[)]') : ''
        return dt
      },
      search_cep () {
        Vue.showLoading()
        let This = this
        funcoes.buscaCEP(this.Oficina.endereco.cep).then(result => {
          This.Oficina.endereco = result[0]
          Vue.hideLoading()
        },
        rejected => {
          this.Oficina.endereco.logradouro = ''
          this.Oficina.endereco.complemento = ''
          this.Oficina.endereco.bairro = ''
          this.Oficina.endereco.cidade = ''
          this.Oficina.endereco.uf = ''
          Vue.hideLoading()
        })
      }
    }
  }
</script>

<style>
</style>
