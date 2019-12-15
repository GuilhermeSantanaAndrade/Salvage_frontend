<template> 
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastro de Etapas do Processo (Workflow)</v-toolbar-title>
            </v-toolbar>
          </v-flex>
          <v-card-title> 
            <v-layout>
              <v-flex xs12> 
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-layout>
                      <v-flex xs12 md10>
                        <v-text-field label="Descrição" required :rules="requiredField" :maxlength="50" v-model="EtapaWorkflow.descricao"></v-text-field>
                      </v-flex>
                      <v-flex  xs12 md2>
                        <v-text-field label="Ordem" required :rules="requiredNumericField" :maxlength="2" v-model="EtapaWorkflow.ordem"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 md4>
                        <v-switch id="enviaEmail" label="Envia E-mail" color="blue" value v-model="EtapaWorkflow.enviaEmail"></v-switch>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-switch label="Envia SMS" required color="blue" value v-model="EtapaWorkflow.enviaSMS"></v-switch>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-switch v-if="(EtapaWorkflow.enviaEmail === true)" id="linkPushEmail" label="Permite Push via e-mail?" required color="blue" value v-model="EtapaWorkflow.linkPushEmail"></v-switch>
                      </v-flex>
                    </v-layout>                  
                    <v-textarea :counter="600" :maxlength="600" v-model="EtapaWorkflow.descricaoParaFazer" auto-grow label="Texto E-mail:" rows="3"></v-textarea>
                    <v-flex xs12 sm6 md6 lg6>
                      <v-select label="Entidade responsável" required :rules="requiredField" v-model="EtapaWorkflow.strTpEmpresa" :items="tpEmpresas"></v-select>
                    </v-flex>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-actions> 
            <v-spacer></v-spacer>
              <v-btn @click="redirecionar('editaWorkflow')" flat>Voltar</v-btn> 
            <v-btn @click="efetivar('editaWorkflow')" color="primary">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>     
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import {etapaWorkflow, workflow} from '../../../lib/app'

  export default {
    data () {
      return {
        isAlteracao: false,
        menu: false,
        EtapaWorkflow: {},
        wkfGuid: '',
        tpEmpresas: ['Seguradora', 'Guincheiro', 'Despachante', 'Oficina', 'Patio'],
        requiredField: [ v => !!v || 'Campo obrigatório' ],
        requiredNumericField: [
          v => !!v || 'Campo obrigatório',
          v => /^\d*$/.test(v) || 'Valor inválido'
        ]
      }
    },
    created: async function () {
      this.EtapaWorkflow = etapaWorkflow.EtapaWorkflow()
      await this.initialize()
    },
    computed: {
    },
    methods: {
      initialize () {
        if (this.$route.params.wkfGuid) {
          this.wkfGuid = this.$route.params.wkfGuid
        }

        if (this.$route.params.id) {
          this.isAlteracao = true
          Vue.showLoading()
          let This = this
          etapaWorkflow.listar({id: this.$route.params.id}).then(result => {
            This.EtapaWorkflow = result[0]
            Vue.hideLoading()
          },
          rejected => {
            Vue.showMessage('Erro: ' + rejected.toString(), 'error')
          })
        } else {
          this.EtapaWorkflow = etapaWorkflow.EtapaWorkflow()
        }
      },
      efetivar (value) {
        if (this.$refs.form.validate()) {
          Vue.showLoading()
          if (this.isAlteracao) {
            etapaWorkflow.alterar(this.EtapaWorkflow).then(result => {
              Vue.showMessage('Cadastro alterado.')
              this.redirecionar(value)
            },
            rejected => {
              Vue.showMessage(rejected.toString(), 'error')
            })
          } else {
            workflow.listar({guid: this.wkfGuid}).then(wkf => {
              this.EtapaWorkflow.workflow = wkf[0]
              etapaWorkflow.incluir(this.EtapaWorkflow).then(result => {
                Vue.showMessage('Cadastro realizado.')
                this.redirecionar(value)
              },
              rejected => {
                Vue.showMessage(rejected.toString(), 'error')
              })
            },
            rejected => {
              Vue.showMessage(rejected.toString(), 'error')
            })
          }
        }
      },
      redirecionar (value) {
        this.$router.push({ name: 'editaWorkflow', params: { guid: this.wkfGuid } })
      }
    }
  }
</script>

<style>

</style>
