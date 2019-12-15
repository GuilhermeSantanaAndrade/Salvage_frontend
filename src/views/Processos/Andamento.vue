<template>
  <div>
    <v-stepper light value="1">
      <v-stepper-header>
        <template v-for="(item, index) in listEtapas">
          <v-divider :key="(index * -1)" :id="(index * -1)"></v-divider>
          <v-stepper-step ref="dividers" :key="index + 1" class="step" :color="item.color" :step="item.ordem" :complete="item.complete">{{item.descricao}}</v-stepper-step>
        </template>
      </v-stepper-header>
    </v-stepper>
    <router-view></router-view>
  </div> 
</template>

<script>
import {etapaWorkflow, salvado, funcoes} from '../../../lib/app'
import Vue from 'vue'

export default {
  data () {
    return {
      listEtapas: [],
      processo: {},
      modoPushAtivo: false,
      url: '',
      inputGuidSalvado: '',
      inputPasso: ''
    }
  },
  created: function () {
    this.url = window.location.href
    if (this.url.includes('andamentoProcessoPush')) {
      this.modoPushAtivo = true
      this.inputGuidSalvado = funcoes.getParameterByName(this.url, 'guid')
      this.inputIdPasso = funcoes.getParameterByName(this.url, 'passo')
    } else {
      this.inputGuidSalvado = this.$route.params.guid
    }

    if (!this.inputGuidSalvado || this.inputGuidSalvado === null || this.inputGuidSalvado === '') {
      Vue.showMessage('Não foi informado GUID', 'error')
      throw Error('Não foi informado GUID')
    }
    this.$router.push({name: 'formularioAndamento', params: { guid: this.inputGuidSalvado }})
    this.initialize()
  },
  methods: {
    async initialize () {
      Vue.showLoading()
      try {
        this.listEtapas = await etapaWorkflow.getEtapaWorkflow({})
        let qtdeTotalEtapas = this.listEtapas.length
        this.listEtapas = this.listEtapas.map(etapa => {
          return {
            id: etapa.id,
            color: '#838383',
            ordem: etapa.ordem,
            descricao: etapa.descricao,
            complete: false
          }
        })
        let salv = await salvado.listar({guid: this.inputGuidSalvado})
        if ((!salv) || ((salv.length || 0) === 0)) {
          Vue.showMessage('Processo não encontrado', 'error')
        }
        let etapa = this.listEtapas.filter(et => et.id === salv[0].passoEtapa.id)
        if (etapa.length === 0) {
          Vue.showMessage('Etapa não encontrada', 'error')
          throw Error('')
        }
        let ordem = etapa[0].ordem
        for (let x = 0; x <= ordem; x++) {
          this.listEtapas[x].complete = true
          if ((x < ordem) || (x === (qtdeTotalEtapas - 1))) {
            this.listEtapas[x].color = 'green'
          } else {
            this.listEtapas[x].color = 'yellow'
          }
        }
      } finally {
        Vue.hideLoading()
      }
    }
  }
}
</script>

<style>
.step {
  cursor:pointer;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
