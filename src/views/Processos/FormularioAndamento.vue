<template> 
  <v-container fluid>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card v-if="(!hasError)">
          <v-card-title> 
            <v-layout col wrap>
              <v-flex xs12 sm5 md4 lg3 style="padding-left: 0px; padding-right: 10px"> 
                <v-subheader style="padding-left: 0px; color: blue">Foto veículo</v-subheader>
                <v-img
                  :src="`http://www.navegantescorteedobra.com.br/wp-content/uploads/2012/01/sem-foto1.jpg`"
                  :lazy-src="`http://www.navegantescorteedobra.com.br/wp-content/uploads/2012/01/sem-foto1.jpg`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-height="183"
                  position="center center">
                </v-img>
              </v-flex>

              <v-flex xs12 sm7 md8 lg9 style="padding-top: 0px; padding-bottom: 0px">
                <v-subheader style="padding-left: 0px; color: blue">Dados do Processo</v-subheader>
                <v-layout>
                  <v-flex xs12 xm12 md6 lg6 style="padding-top: 0px; padding-bottom: 0px">
                    <v-text-field label="Status Atual" required disabled v-model="EtapaAtual.descricao" style="font-weight: bold"></v-text-field>
                  </v-flex>
                  <v-flex v-if="(!modoPushAtivo)" xs12 xm12 md6 lg6 style="padding-top: 0px; padding-bottom: 0px">
                    <v-text-field label="Status Para" required disabled v-model="EtapaProxima.descricao" style="font-weight: bold" v-if="(EtapaAtual.ordem != (qtdeTotalEtapas - 1))"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-text-field label="Apólice" required disabled v-model="Salvado.apolice"></v-text-field>
                <v-text-field label="Nº Processo (Sinistro)" required disabled v-model="Salvado.sinistro"></v-text-field>
                <v-flex xs12 sm12 md12 lg12>
                  <v-menu
                    v-model="showMenu1"
                    :close-on-content-click="false"
                    :full-width=true
                    max-width="290"
                    disabled
                    v-if="(EtapaAtual.ordem != (qtdeTotalEtapas - 1))">
                    <v-text-field
                      slot="activator"
                      :value="dataCriacaoFormatted"
                      clearable
                      label="Data Evento"
                      disabled>
                    </v-text-field>                      
                    <v-date-picker
                      v-model="dataCriacao"
                      @change="dataChange()"
                      disabled
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-flex>
              
              <v-flex xs12 sm12 md12 lg12>
                <!-- Etapa Novo -->
                <v-form v-if="!!EtapaAtual.codigoEtapa && (EtapaAtual.codigoEtapa === codigosEtapas._CODIGO_ETAPA_NOVO)">
                  <v-subheader style="padding-left: 0px; color: blue">Dados do Andamento</v-subheader>
                  <v-select v-model="currentOficina" label="Oficina" :rules="requiredField" required :items="Oficinas" item-text="nome" item-value="id"></v-select>
                  <v-select v-model="currentPatio" label="Pátio" :rules="requiredField" required :items="Patios" item-text="nome" item-value="id"></v-select>
                  <v-textarea
                    v-model="EtapaInput.observacao"
                    auto-grow
                    label="Observações"
                    rows="2">
                  </v-textarea>                      
                </v-form>

                <!-- Etapa Aguardando Atrib. Guincheiro -->
                <v-form v-if="!!EtapaAtual.codigoEtapa && (EtapaAtual.codigoEtapa === codigosEtapas._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO)">
                  <v-subheader style="padding-left: 0px; color: blue">Dados do Andamento</v-subheader>
                  <v-select v-model="currentGuincheiro" label="Guincheiro" :rules="requiredField" required :items="Guincheiros" item-text="nome" item-value="id"></v-select>
                  <v-textarea
                    v-model="EtapaInput.observacao"
                    auto-grow
                    label="Observações"
                    rows="2">
                  </v-textarea>                      
                </v-form>

                <!-- Etapa Aguardando Guincho -->
                <v-form v-if="!!EtapaAtual.codigoEtapa && (EtapaAtual.codigoEtapa === codigosEtapas._CODIGO_ETAPA_AGUARDANDO_GUINCHO)">
                  <v-subheader style="padding-left: 0px; color: blue">Dados do Andamento</v-subheader>
                  <v-textarea
                    v-model="EtapaInput.observacao"
                    auto-grow
                    label="Observações"
                    rows="2">
                  </v-textarea>
                </v-form>

                <!-- Etapa Aguardando Atrib. Despachante -->
                <v-form v-if="!!EtapaAtual.codigoEtapa && (EtapaAtual.codigoEtapa === codigosEtapas._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE)">
                  <v-subheader style="padding-left: 0px; color: blue">Dados do Andamento</v-subheader>
                  <v-select v-model="currentDespachante" label="Despachante" :rules="requiredField" required :items="Despachantes" item-text="nome" item-value="id"></v-select>
                  <v-textarea
                    v-model="EtapaInput.observacao"
                    auto-grow
                    label="Observações"
                    rows="2">
                  </v-textarea>
                </v-form>

                <!-- Etapa Despacho -->
                <v-form v-if="!!EtapaAtual.codigoEtapa && (EtapaAtual.codigoEtapa === codigosEtapas._CODIGO_ETAPA_AGUARDANDO_DESPACHO)">
                  <v-subheader style="padding-left: 0px; color: blue">Dados do Andamento</v-subheader>
                  <v-textarea
                    v-model="EtapaInput.observacao"
                    auto-grow
                    label="Observações"
                    rows="2">
                  </v-textarea>
                </v-form>                
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-actions> 
            <v-spacer></v-spacer>
            <v-btn v-if="(!modoPushAtivo)" :to="{ name: 'consultaProcessos' }" flat>Voltar</v-btn> 
            <v-btn @click="efetivar()" color="primary" v-if="(EtapaAtual.ordem != (qtdeTotalEtapas - 1))">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>     
  </v-container>
</template>

<script>
import moment from 'moment'
import {guincheiro, salvado, etapaWorkflow, constantes, oficina, patio, despachante, funcoes, acesso} from '../../../lib/app'
import Vue from 'vue'
import goTo from 'vuetify/lib/components/Vuetify/util/goTo'

export default {
  data () {
    return {
      modoPushAtivo: false,
      url: '',
      inputGuidSalvado: '',
      hasError: false,
      inputIdPasso: null,
      showMenu1: false,
      showMenu2: false,
      dataCriacao: new Date().toISOString().substr(0, 10),
      requiredField: [ v => !!v || 'Campo obrigatório' ],
      Salvado: {},
      qtdeTotalEtapas: 0,
      listEtapas: [],
      EtapaAtual: {},
      EtapaProxima: {},
      EtapaInput: {},
      codigosEtapas: {},
      currentGuincheiro: -1,
      Guincheiros: [],
      Oficinas: [],
      currentOficina: -1,
      Patios: [],
      currentPatio: -1,
      currentDespachante: -1,
      Despachantes: [],
      Usuario: undefined
    }
  },
  async created () {
    await this.getInputs()
    this.validateInputs()
    this.inputIdPasso = Number(this.inputIdPasso)
    this.initialize()
    goTo(0)
  },
  computed: {
    dataCriacaoFormatted () {
      return this.formatDate('dataCriacao')
    }
  },
  methods: {
    getCodigoEtapa (etapa) {
      switch (etapa.ordem) {
        case 0: return '524486384'
        case 1: return '123456789'
        case 2: return '726446281'
        case 3: return '682468420'
        case 4: return '731958242'
        case 5: return '053096769'
        default: return ''
      }
    },
    atribuirValoresExclusivosEtapaCorrente (etapa) {
      switch (etapa.codigoEtapa) {
        case constantes._CODIGO_ETAPA_NOVO: {
          const ofic = this.Oficinas.filter((id, idx, arr) => arr[idx].id === this.currentOficina)
          if (ofic.length > 0) {
            this.EtapaInput.oficina = ofic[0]
          }
          const pat = this.Patios.filter((id, idx, arr) => arr[idx].id === this.currentPatio)
          if (pat.length > 0) {
            this.EtapaInput.patio = pat[0]
          }
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO: {
          const guin = this.Guincheiros.filter((id, idx, arr) => arr[idx].id === this.currentGuincheiro)
          if (guin.length > 0) {
            this.EtapaInput.guincheiro = guin[0]
          }
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_GUINCHO: {
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE: {
          const desp = this.Despachantes.filter((id, idx, arr) => arr[idx].id === this.currentDespachante)
          if (desp.length > 0) {
            this.EtapaInput.despachante = desp[0]
          }
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_DESPACHO: break
        case constantes._CODIGO_ETAPA_FINALIZADO: break
        default: break
      }
    },
    setEtapaInput (etapa) {
      switch (etapa.codigoEtapa) {
        case constantes._CODIGO_ETAPA_NOVO: {
          this.EtapaInput = salvado.EtapaNovo()
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO: {
          this.EtapaInput = salvado.EtapaAguardandoAtribGuincheiro()
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_GUINCHO: {
          this.EtapaInput = salvado.EtapaAguardandoGuincho()
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE: {
          this.EtapaInput = salvado.EtapaAguardandoAtribDespachante()
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_DESPACHO: {
          this.EtapaInput = salvado.EtapaAguardandoDespacho()
          break
        }
        case constantes._CODIGO_ETAPA_FINALIZADO: {
          this.EtapaInput = salvado.EtapaFinalizado()
          break
        }
        default: throw Error('')
      }
    },
    async loadClassesEtapaCorrente (etapa) {
      switch (etapa.codigoEtapa) {
        case constantes._CODIGO_ETAPA_NOVO: {
          this.Oficinas = await oficina.listar({})
          this.Patios = await patio.listar({})
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO: {
          this.Guincheiros = await guincheiro.listar({})
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_GUINCHO: {
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE: {
          this.Despachantes = await despachante.listar({})
          break
        }
        case constantes._CODIGO_ETAPA_AGUARDANDO_DESPACHO: {
          break
        }
        case constantes._CODIGO_ETAPA_FINALIZADO: {
          break
        }
        default: break
      }
    },
    async initialize () {
      Vue.showLoading()
      try {
        this.listEtapas = await etapaWorkflow.getEtapaWorkflow({})
        this.qtdeTotalEtapas = this.listEtapas.length
        this.codigosEtapas = constantes
        let salv = []
        try {
          salv = await salvado.listar({guid: this.inputGuidSalvado})
        } catch (err) {
          Vue.showMessage('Processo não encontrado', 'error')
          this.hasError = true
          throw Error('')
        }
        if ((!salv) || ((salv.length || 0) === 0)) {
          Vue.showMessage('Processo não encontrado', 'error')
          this.hasError = true
          throw Error('')
        }
        let passo = (this.modoPushAtivo ? this.inputIdPasso : salv[0].passoEtapa.id)
        if (this.modoPushAtivo && (this.inputIdPasso !== salv[0].passoEtapa.id)) {
          Vue.showMessage('Link expirado. O processo já se encontra em outra fase.', 'error')
          this.hasError = true
          throw Error('')
        }
        let etapa = this.listEtapas.filter(et => et.id === passo)
        if (etapa.length === 0) {
          Vue.showMessage('Etapa não encontrada', 'error')
          this.hasError = true
          throw Error('')
        }
        etapa = etapa[0]
        etapa.codigoEtapa = this.getCodigoEtapa(etapa)
        this.setEtapaInput(etapa)
        await this.loadClassesEtapaCorrente(etapa)
        this.EtapaAtual = etapa
        if ((this.EtapaAtual.ordem + 1) >= (this.qtdeTotalEtapas)) {
          this.EtapaProxima = {id: -1, descricao: ''}
        } else {
          this.EtapaProxima = this.listEtapas[this.EtapaAtual.ordem + 1]
        }
        this.Salvado = salv[0]
      } finally {
        Vue.hideLoading()
      }
    },
    formatDate (field) {
      let auxField = this.Salvado.dataCriacao
      let dt = auxField !== undefined ? auxField : new Date()
      dt = dt ? moment(dt).locale('pt-br').format('DD[/]MM[/]YYYY [(]dddd[)]') : ''
      return dt
    },
    async getInputs () {
      this.url = window.location.href
      if (this.url.includes('andamentoProcessoPush')) {
        this.modoPushAtivo = true
        this.inputGuidSalvado = funcoes.getParameterByName(this.url, 'guid')
        this.inputIdPasso = funcoes.getParameterByName(this.url, 'passo')
        try {
          this.Usuario = await acesso.login('push', 'push')
        } catch (err) {
        }
      } else {
        this.inputGuidSalvado = this.$route.params.guid
        this.Usuario = this.$store.state.Usuario
      }
    },
    validateInputs () {
      if (!this.inputGuidSalvado || this.inputGuidSalvado === null || this.inputGuidSalvado === '') {
        Vue.showMessage('Não foi informado GUID', 'error')
        this.hasError = true
        throw Error('Não foi informado GUID')
      }
      if (this.modoPushAtivo && (!this.inputIdPasso || (this.inputIdPasso && (this.inputIdPasso.toString().trim() === '')))) {
        Vue.showMessage('Erro: Link inválido. PASSO não foi informado', 'error')
        this.hasError = true
        throw Error('')
      }
      if (this.modoPushAtivo && (this.Usuario === undefined || this.Usuario.id === -1 || this.Usuario.id === null)) {
        Vue.showMessage('Erro: Usuário de PUSH não foi atribuído corretamente', 'error')
        this.hasError = true
        throw Error('')
      }
    },
    efetivar () {
      Vue.showLoading()
      try {
        try {
          this.atribuirValoresExclusivosEtapaCorrente(this.EtapaAtual)
          this.EtapaInput.idUsuario = this.Usuario.id
          this.EtapaInput.guidUsuario = this.Usuario.guid
          this.EtapaInput.idPassoAtual = this.EtapaAtual.id
          this.EtapaInput.idPassoDestino = this.EtapaProxima.id
          this.EtapaInput.guidSalvado = this.inputGuidSalvado
          salvado.realizarAndamento(this.EtapaInput.codigoEtapa, this.EtapaInput).then(result => {
            if (result === undefined) {
              throw Error('Erro desconhecido ao realizar andamento')
            }
            if (!this.modoPushAtivo) {
              Vue.showMessage('Andamento realizado. (Novo Status: ' + this.EtapaProxima.descricao + ')')
              this.$router.push({ name: 'home' })
            } else {
              this.$router.push({ name: 'info', params: {guid: 'b9dc0b47-c314-4359-b853-c3239102a4d6'} })
            }
          },
          rejected => {
            Vue.showMessage('Erro: ' + rejected.toString(), 'error')
          }).catch(err => {
            Vue.showMessage(err.toString(), 'error')
          })
        } catch (err) {
          Vue.showMessage(err.toString(), 'error')
        }
      } finally {
        Vue.hideLoading()
      }
    }
  }
}
</script>

<style>

</style>
