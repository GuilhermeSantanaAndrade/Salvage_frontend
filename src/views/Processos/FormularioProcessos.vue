<template>
  <v-container fluid>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <v-flex hidden-md-and-down>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastro de Salvado</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn icon slot="activator" @click="dialogHistorico= true"><v-icon>history</v-icon></v-btn>
                <span>Histórico</span>
              </v-tooltip>
            </v-toolbar>
          </v-flex>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-subheader style="padding-left: 0px; color: blue">Dados Gerais</v-subheader>
              <v-layout row wrap>
                <!-- Imagem -->                
                <v-flex xs12 sm5 md4 lg3 style="padding-left: 0px; padding-right: 10px">
                  <v-img
                    :src="`http://www.navegantescorteedobra.com.br/wp-content/uploads/2012/01/sem-foto1.jpg`"
                    :lazy-src="`http://www.navegantescorteedobra.com.br/wp-content/uploads/2012/01/sem-foto1.jpg`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-height="183"
                    position="center center"
                  ></v-img>
                </v-flex>

                <!-- Dados Gerais -->
                <v-flex xs12 sm7 md8 lg9 style="padding-top: 0px; padding-bottom: 0px">
                  <v-layout row wrap>
                    <v-flex xs12 md12>
                      <v-select v-model="currentSeguradora" label="Seguradora" readonly required :items="Seguradoras" item-text="nome" item-value="id"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6>
                      <v-text-field label="Nº Processo (Sinistro)" required :rules="requiredField" :maxlength="20" v-model="Salvado.sinistro"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6>
                      <v-text-field label="Apólice" required :rules="requiredField" :maxlength="15" v-model="Salvado.apolice"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 sm6 md6 lg6>
                  <v-select label="Cidade" required :rules="requiredField" v-model="Salvado.cidade" :items="cidades"></v-select>
                </v-flex>
                
                <v-flex xs12 sm12 md12 lg12 style="padding-top: 0px; padding-bottom: 0px">
                  <v-text-field label="Nome Segurado" required :rules="requiredField" :maxlength="50" v-model="Salvado.nomeSegurado"></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-menu
                  v-model="showMenu1"
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
                  v-model="showMenu2"
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
                <v-flex xs12 sm12 md12>
                  <v-textarea :counter="1000" :maxlength="1000" auto-grow label="Observações" rows="2" v-model="Salvado.observacoes"></v-textarea>
                </v-flex>
                
                <v-divider></v-divider>
                
                <v-form ref="formVeiculo" lazy-validation>
                  <v-subheader style="padding-left: 0px; color: blue">Dados do veículo</v-subheader>
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs6 sm4 md6>
                        <v-select label="Marca" required :rules="requiredField" :items="marcas" v-model="Salvado.marca"></v-select>
                      </v-flex>
                      <v-flex xs6 sm4 md6>
                        <v-text-field label="Modelo" required :rules="requiredField" :maxlength="30" v-model="Salvado.modelo"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Ano" required :rules="requiredNumericField" :maxlength="4" v-model="Salvado.ano"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Placa" required :rules="requiredField" :maxlength="10" v-model="Salvado.placa"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Cor" required :rules="requiredField" :maxlength="20" v-model="Salvado.cor"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Valor de Tabela (FIPE)" required :rules="requiredField" :maxlength="15" v-model="Salvado.valorFipe"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>

                <v-form v-if="(Salvado.guincheiro.id != null) && (Salvado.guincheiro.id != -1)">
                  <v-subheader style="padding-left: 0px; color: blue">Guincheiro</v-subheader>
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 md12>
                        <v-select v-model="currentGuincheiro" label="Guincheiro" disabled :items="Guincheiros" item-text="nome" item-value="id"></v-select>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="CPF/CNPJ" disabled v-model="Salvado.guincheiro.cpf_cnpj_masked"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Tel" disabled v-model="Salvado.guincheiro.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="E-mail" disabled v-model="Salvado.guincheiro.email"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Endereço" disabled v-model="Salvado.guincheiro.enderecoCompleto"></v-text-field>
                      </v-flex>                      
                    </v-layout>
                  </v-container>
                </v-form>

                <v-form v-if="(Salvado.despachante.id != null) && (Salvado.despachante.id != -1)">
                  <v-subheader style="padding-left: 0px; color: blue">Despachante</v-subheader>
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 md12>
                        <v-select v-model="currentDespachante" label="Despachante" disabled :items="Despachantes" item-text="nome" item-value="id"></v-select>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="CPF/CNPJ" disabled v-model="Salvado.despachante.cpf_cnpj_masked"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Tel" disabled v-model="Salvado.despachante.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="E-mail" disabled v-model="Salvado.despachante.email"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Endereço" disabled v-model="Salvado.despachante.enderecoCompleto"></v-text-field>
                      </v-flex>                      
                    </v-layout>
                  </v-container>
                </v-form>

                <v-form v-if="(Salvado.oficina.id != null) && (Salvado.oficina.id != -1)">
                  <v-subheader style="padding-left: 0px; color: blue">Oficina</v-subheader>
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 md12>
                        <v-select v-model="currentOficina" label="Oficina" disabled :items="Oficinas" item-text="nome" item-value="id"></v-select>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="CPF/CNPJ" disabled v-model="Salvado.oficina.cpf_cnpj_masked"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Tel" disabled v-model="Salvado.oficina.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="E-mail" disabled v-model="Salvado.oficina.email"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Endereço" disabled v-model="Salvado.oficina.enderecoCompleto"></v-text-field>
                      </v-flex>                      
                    </v-layout>
                  </v-container>
                </v-form>

                <v-form v-if="(Salvado.patio.id != null) && (Salvado.patio.id != -1)">
                  <v-subheader style="padding-left: 0px; color: blue">Pátio</v-subheader>
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm12 md12>
                        <v-select v-model="currentPatio" label="Pátio" disabled :items="Patios" item-text="nome" item-value="id"></v-select>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="CPF/CNPJ" disabled v-model="Salvado.patio.cpf_cnpj_masked"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="Tel" disabled v-model="Salvado.patio.telefone"></v-text-field>
                      </v-flex>
                      <v-flex xs6 sm4 md4>
                        <v-text-field label="E-mail" disabled v-model="Salvado.patio.email"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Endereço" disabled v-model="Salvado.patio.enderecoCompleto"></v-text-field>
                      </v-flex>                      
                    </v-layout>
                  </v-container>
                </v-form>
              </v-layout>
            </v-container>
          </v-form>

          <v-card-actions>
            <v-btn @click="dialogHistorico= true"><v-icon class="mr-3">history</v-icon> Histórico</v-btn>
            <v-spacer></v-spacer>
            <v-btn :to="{ name: 'consultaProcessos' }" flat>Voltar</v-btn>
            <v-btn @click="efetivar('consultaProcessos')" color="primary" v-if="(EtapaAtual.ordem != (qtdeTotalEtapas - 1))">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>


    <!-- Modal Historico -->
    <v-dialog v-model="dialogHistorico" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Histórico do Salvado</span>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="logAndamentos" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.Data }}</td>
              <td>{{ props.item.Etapa }}</td>
              <td>{{ props.item.Usuario }}</td>
              <td>{{ props.item.Obs }}</td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Fim Modal Historico -->
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import {salvado, seguradora, endereco, funcoes, guincheiro, despachante, oficina, patio, etapaWorkflow} from '../../../lib/app'
  import moment from 'moment'
  import goTo from 'vuetify/lib/components/Vuetify/util/goTo'

  export default {
    data: () => ({
      isAlteracao: false,
      Salvado: salvado.Salvado(),
      Seguradoras: [],
      Guincheiros: [],
      Despachantes: [],
      Oficinas: [],
      Patios: [],
      ListEtapas: [],
      EtapaAtual: {},
      qtdeTotalEtapas: 0,
      currentSeguradora: 1,
      currentGuincheiro: -1,
      currentDespachante: -1,
      currentOficina: -1,
      currentPatio: -1,
      showMenu1: false,
      showMenu2: false,
      dataCriacao: new Date().toISOString().substr(0, 10),
      dataAtualizacao: new Date().toISOString().substr(0, 10),
      dialogHistorico: false,
      cidades: ['São Paulo'],
      marcas: ['AUDI', 'BMW', 'RENAULT', 'FIAT', 'FORD', 'NISSAN', 'HYUNDAI', 'PALIO', 'JEEP', 'VOLKSVAWAGEN', 'HONDA', 'TOYOTA', 'CITROEN', 'CHEVROLET', 'MITSUBISHI', 'PEUGEOT', 'VOLVO', 'CADILLAC', 'CHRYSLER', 'INFINITI', 'KIA', 'LAND ROVER', 'MERCEDES', 'MINI', 'PORSCHE', 'SMART', 'SUZUKI'],
      search: '',
      headers: [{
        text: 'Data', align: 'left', value: 'Data' },
      { text: 'Etapa', value: 'Etapa' },
      { text: 'Usuario', value: 'Usuario' },
      { text: 'Obs', value: 'Obs' }
      ],
      logAndamentos: [],
      requiredField: [ v => !!v || 'Campo obrigatório' ],
      requiredNumericField: [
        v => !!v || 'Campo obrigatório',
        v => /^\d*$/.test(v) || 'Valor inválido'
      ],
      requiredDecimalField: [
        v => !!v || 'Campo obrigatório',
        v => /^\s*(?:[1-9]\d{0,2}(?:\.\d{3})*|0),\d{2}$/.test(v) || 'Valor inválido'
      ]
    }),
    computed: {
      dataCriacaoFormatted () {
        return this.formatDate('dataCriacao')
      },
      dataAtualizacaoFormatted () {
        return this.formatDate('dataAtualizacao')
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.Salvado = salvado.Salvado()
      Vue.showLoading()
      this.initialize().then(() => {
        Vue.hideLoading()
      }).catch(() => {
        Vue.hideLoading()
      })
      goTo(0)
    },
    methods: {
      async initialize () {
        let This = this
        await this.loadLists()
        seguradora.listar({}).then(result => {
          This.Seguradoras = result
        })
        this.listEtapas = await etapaWorkflow.getEtapaWorkflow({})
        this.qtdeTotalEtapas = this.listEtapas.length
        if (this.$route.params.guid) {
          this.isAlteracao = true
          salvado.listar({guid: this.$route.params.guid}).then(result => {
            This.Salvado = result[0]
            This.calculateFields(This.Salvado)
            This.Salvado.dataCriacao = new Date(This.Salvado.dataCriacao).toISOString().substr(0, 10)
            This.currentSeguradora = result[0].seguradora.id
            This.currentGuincheiro = result[0].guincheiro.id
            This.currentDespachante = result[0].despachante.id
            This.currentPatio = result[0].patio.id
            This.currentOficina = result[0].oficina.id

            if (This.Salvado.passoEtapa.ordem === (This.qtdeTotalEtapas - 1)) {
              Vue.showMessage('Processa já está finalizado. Alteração não permitida', 'warning')
            }
            let etapa = This.listEtapas.filter(et => et.id === This.Salvado.passoEtapa.id)
            if (etapa.length > 0) {
              This.EtapaAtual = etapa[0]
            }
            salvado.getHistorico({guid: This.Salvado.guid}).then(historicos => {
              This.logAndamentos = historicos.map(hist => {
                return {Data: moment(hist.dataEvento).locale('pt-br').format('DD[/]MM[/]YYYY'),
                  Etapa: this.getEtapaDesc(hist.idPassoDe),
                  Usuario: hist.usuarioEmail,
                  Obs: hist.observacao}
              })
            })
          },
          rejected => {
            Vue.showMessage('Erro: ' + rejected.toString(), 'error')
          })
        } else {
          this.Salvado = salvado.Salvado()
          this.Salvado.ano = moment(new Date()).locale('pt-br').format('YYYY')
        }
      },
      efetivar (value) {
        if (this.$refs.form.validate()) {
          if (this.$refs.formVeiculo.validate()) {
            Vue.showLoading()
            try {
              salvado.listar({}).then(allSalvados => {
                let found = false
                found = allSalvados.filter((id, idx, arr) => arr[idx].apolice === this.Salvado.apolice)
                if (found.length > 0) {
                  Vue.showMessage('Nº de Apolice já existe', 'error')
                  throw Error('')
                }

                let seg = this.Seguradoras.filter((id, idx, arr) => arr[idx].id === this.currentSeguradora)
                if (seg.length > 0) {
                  this.Salvado.seguradora = seg[0]
                }
                this.Salvado.dataAtualizacao = new Date().toISOString().substr(0, 10)
                this.Salvado.usuario = this.$store.state.Usuario
                if (this.isAlteracao) {
                  salvado.alterar(this.Salvado).then(result => {
                    Vue.showMessage('Cadastro alterado.')
                    this.$router.push({ name: value })
                  },
                  rejected => {
                    Vue.showMessage(rejected.toString(), 'error')
                  })
                } else {
                  salvado.incluir(this.Salvado).then(result => {
                    Vue.showMessage('Cadastro realizado.')
                    this.$router.push({ name: value })
                  },
                  rejected => {
                    Vue.showMessage(rejected.toString(), 'error')
                  })
                }
              })
            } finally {
              Vue.hideLoading()
            }
          }
        }
      },
      getEtapaDesc (idEtapa) {
        const etapa = this.listEtapas.filter(et => et.id === idEtapa)
        if (etapa.length > 0) {
          return etapa[0].descricao
        }
        return ''
      },
      calculateFields () {
        this.Salvado.guincheiro.enderecoCompleto = endereco.compor(this.Salvado.guincheiro.endereco)
        this.Salvado.despachante.enderecoCompleto = endereco.compor(this.Salvado.despachante.endereco)
        this.Salvado.oficina.enderecoCompleto = endereco.compor(this.Salvado.oficina.endereco)
        this.Salvado.patio.enderecoCompleto = endereco.compor(this.Salvado.patio.endereco)

        this.Salvado.guincheiro.cpf_cnpj_masked = funcoes.applyCNPJ_or_CPFMask(this.Salvado.guincheiro.cpf_cnpj)
        this.Salvado.despachante.cpf_cnpj_masked = funcoes.applyCNPJ_or_CPFMask(this.Salvado.despachante.cpf_cnpj)
        this.Salvado.oficina.cpf_cnpj_masked = funcoes.applyCNPJ_or_CPFMask(this.Salvado.oficina.cpf_cnpj)
        this.Salvado.patio.cpf_cnpj_masked = funcoes.applyCNPJ_or_CPFMask(this.Salvado.patio.cpf_cnpj)
      },
      async loadLists () {
        this.Guincheiros = await guincheiro.listar({})
        this.Despachantes = await despachante.listar({})
        this.Oficinas = await oficina.listar({})
        this.Patios = await patio.listar({})
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
        let auxField = field === 'dataCriacao' ? this.Salvado.dataCriacao : this.Salvado.dataAtualizacao
        let dt = auxField !== undefined ? auxField : new Date()
        dt = dt ? moment(dt).locale('pt-br').format('DD[/]MM[/]YYYY [(]dddd[)]') : ''
        return dt
      }
    }
  }
</script>

<style>

</style>
