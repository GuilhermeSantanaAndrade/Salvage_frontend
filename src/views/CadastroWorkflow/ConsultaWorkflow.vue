<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md12>
        <v-toolbar flat color="white">
          <v-toolbar-title v-if="!this.$vuetify.breakpoint.xsOnly">Workflow</v-toolbar-title>
          <v-divider class="mx-2" inset vertical v-if="!this.$vuetify.breakpoint.xsOnly"></v-divider>
          <v-text-field clearable v-model="search" append-icon="search" label="Busca" hide-details></v-text-field>
        </v-toolbar>        
        <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="justify-center layout px-0">
              <v-icon small color="blue darken-2" @click="editItem(props.item)" style="margin-right: 20px;">visibility</v-icon>
            </td>      
            <td>{{ props.item.descricao }}</td>
            <td>{{ props.item.dataCriacao }}</td>
            <td class="text-xs-center">
              <v-checkbox v-model="props.item.ativo" value disabled></v-checkbox>
            </td>
          </template>          
          <template slot="no-data">
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import {workflow} from '../../../lib/app'
  import moment from 'moment'

  export default {
    data: () => ({
      deleteDialog: false,
      search: '',
      headers: [{
        text: 'Visualizar', value: 'name', sortable: false, align: 'center'
      },
      { text: 'Descição', value: 'descricao' },
      { text: 'Data Criação', align: 'left', value: 'dataCriacao' },
      { text: 'Ativo', value: 'Ativo' }
      ],
      items: [],
      selectedItem: {
        descricao: '',
        dataCriacao: '',
        ativo: true
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },
    methods: {
      async list (params) {
        Vue.showLoading()
        try {
          try {
            const result = await workflow.listar(params)
            if (Array.isArray(result)) {
              this.items = result.map(it => ({
                guid: it.guid,
                descricao: it.descricao,
                dataCriacao: moment(it.dataCriacao).locale('pt-br').format('DD[/]MM[/]YYYY'),
                ativo: true
              }))
            }
          } finally {
            Vue.hideLoading()
          }
        } catch (error) {
          Vue.showMessage(error.toString(), 'error')
        }
      },
      initialize () {
        this.list({})
      },
      editItem (item) {
        this.selectedItem = item
        this.$router.push({ name: 'editaWorkflow', params: { guid: item.guid } })
      }
    }
  }
</script>

<style>

</style>
