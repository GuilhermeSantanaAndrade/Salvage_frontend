<template>
  <v-container fluid grid-list-md>
      
    <v-layout align-center justify-center row wrap fill-height>
      <v-flex d-flex md6 sm6 xs12 class="px-3">
        <v-card class="mt-3 mx-auto my-3">
          <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
            <!-- <v-sparkline show-labels :labels="labelsNew" :value="valueNew" color="white" line-width="2" padding="16"></v-sparkline> -->
            <line-chart :chart-data="dataNew" :styles="chartStyles"></line-chart>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Total de Processos</div>
            <div class="subheading font-weight-light grey--text">{{((valueNew.length > 0) ? valueNew.reduce((a,b) => a + b).toString() : '0') + ' processos cadastrados até o momento'}}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>library_add</v-icon>
            <span class="caption grey--text font-weight-light">último processo aberto - minutos atrás</span>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex md6 sm6 xs12 class="px-3">
        <v-card class="mt-3 mx-auto my-3">
          <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
            <!-- <v-sparkline :labels="labelsClosed" :value="valueClosed" color="white" line-width="2" padding="16" ></v-sparkline> -->
            <line-chart :chart-data="dataClosed" :styles="chartStyles"></line-chart>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Processos Finalizados</div>
            <div class="subheading font-weight-light grey--text">{{((valueClosed.length > 0) ? valueClosed.reduce((a,b) => a + b).toString() : '0') + ' processos finalizados'}}</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>remove_circle_outline</v-icon>
            <span class="caption grey--text font-weight-light">último processo fechado - dia(s) atrás</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider class="my-3"></v-divider>

    <v-layout align-center row wrap fill-height>
      <v-flex v-for="(p, index) in listEtapas" :key="index" d-flex md4 sm4 xs6 class="px-3">
        <v-card class="mt-3 mx-auto my-3">
          <v-card-text>
            <div class="title font-weight-light mb-2">
              <v-chip color="cyan" text-color="white" dark>{{p.quantidade}}</v-chip>
                {{p.descricao}}  
            </div>
            <v-divider class="my-2"></v-divider>
            <v-layout>
              <v-flex class="text-md-right" align-center justify-end>
                <a href="#" align-center justify-end>Visualizar</a>
                <v-icon class="mr-2" color="primary" small>chevron_right</v-icon>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import {relatorio} from '../../../lib/app'
import LineChart from './Chart.vue'
import goTo from 'vuetify/lib/components/Vuetify/util/goTo'

export default {
  data: () => ({
    avatar: null,
    rowsPerPageItems: [4],
    pagination: {
      rowsPerPage: 3
    },
    labelsNew: [],
    labelsClosed: [],
    valueNew: [0],
    valueClosed: [0],
    listEtapas: [{descricao: '{Sem Etapas Cadastradas}', quantidade: 0}],
    dataNew: {
      labels: [],
      datasets: [
        {
          label: 'Total de Processos',
          backgroundColor: '#ffffff',
          data: []
        }
      ]
    },
    dataClosed: {
      labels: [],
      datasets: [
        {
          label: 'Processos Fechados',
          backgroundColor: '#ffffff',
          data: []
        }
      ]
    }
  }),
  components: {
    LineChart
  },
  computed: {
    chartStyles () {
      return {
        height: '210px',
        position: 'relative'
      }
    }
  },
  mounted () {
  },
  created: function () {
    this.initialize()
    goTo(0)
  },
  methods: {
    fillData (value) {
      if (value === 'ChartNew') {
        this.dataNew = {
          labels: this.labelsNew,
          datasets: [
            {
              label: 'Total de Processos',
              backgroundColor: '#ffffff',
              data: this.valueNew
            }
          ]
        }
      }

      if (value === 'ChartClosed') {
        this.dataClosed = {
          labels: this.labelsClosed,
          datasets: [
            {
              label: 'Processos Fechados',
              backgroundColor: '#ffffff',
              data: this.valueClosed
            }
          ]
        }
      }
    },
    initialize () {
      this.listEtapasQuantidades()
      this.listNovos()
      this.listFinalizados()
    },
    async listNovos () {
      Vue.showLoading(false)
      try {
        try {
          const result = await relatorio.anualAbertos({})
          this.labelsNew = result.meses.slice(0, 7)
          this.valueNew = result.valores.slice(0, 7)
          let defaultArrayLabel = []
          let defaultArrayValue = []
          while ((this.labelsNew.length + defaultArrayLabel.length) < 7) {
            defaultArrayLabel.push('-')
            defaultArrayValue.push(0)
          }
          this.labelsNew = defaultArrayLabel.concat(this.labelsNew)
          this.valueNew = defaultArrayValue.concat(this.valueNew)
          this.fillData('ChartNew')
        } finally {
          Vue.hideLoading()
        }
      } catch (error) {
        Vue.showMessage(error.toString(), 'error')
      }
    },
    async listFinalizados () {
      Vue.showLoading(false)
      try {
        try {
          const result = await relatorio.anualFinalizados({})
          this.labelsClosed = result.meses.slice(0, 7)
          this.valueClosed = result.valores.slice(0, 7)
          let defaultArrayLabel = []
          let defaultArrayValue = []
          while ((this.labelsClosed.length + defaultArrayLabel.length) < 7) {
            defaultArrayLabel.push('-')
            defaultArrayValue.push(0)
          }
          this.labelsClosed = defaultArrayLabel.concat(this.labelsClosed)
          this.valueClosed = defaultArrayValue.concat(this.valueClosed)
          this.fillData('ChartClosed')
        } finally {
          Vue.hideLoading()
        }
      } catch (error) {
        Vue.showMessage(error.toString(), 'error')
      }
    },
    async listEtapasQuantidades () {
      Vue.showLoading(false)
      try {
        try {
          const result = await relatorio.etapasQuantidades({})
          this.listEtapas = result
          while (this.listEtapas.length < 1) {
            this.listEtapas.push({descricao: '{Sem Etapas Cadastradas}', quantidade: 0})
          }
        } finally {
          Vue.hideLoading()
        }
      } catch (error) {
        Vue.showMessage(error.toString(), 'error')
      }
    }
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
