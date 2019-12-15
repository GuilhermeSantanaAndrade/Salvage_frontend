<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md12>
        <v-toolbar flat color="white">
          <v-toolbar-title v-if="!this.$vuetify.breakpoint.xsOnly">Etapas do processo (Workflow)</v-toolbar-title>
          <v-divider class="mx-2" inset vertical v-if="!this.$vuetify.breakpoint.xsOnly"></v-divider>
          <v-text-field clearable v-model="search" append-icon="search" label="Busca" hide-details></v-text-field>
        </v-toolbar>        
        <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="justify-center layout px-0">
              <v-icon small color="blue darken-2" @click="editItem(props.item)" style="margin-right: 20px;">edit</v-icon>
              <v-icon small color="red darken-2" @click="deleteConfirmationMessage(props.item)" style="margin-left: 20px;">delete</v-icon>
            </td>      
            <td>{{ props.item.ordem }}</td>
            <td>{{ props.item.descricao }}</td>
          </template>
          <template slot="no-data">
          </template>
        </v-data-table>

        <v-btn class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark blue darken-1"
              style="width: 65px; height:65px; font-size: 30px" @click="addNew()">+</v-btn>
      </v-flex>

      <!-- Modal Exclusão -->
      <v-dialog v-model="deleteDialog" persistent max-width="390">
        <v-card>
          <v-card-title class="headline">Exclusão de registro</v-card-title>
          <v-card-text>
            Deseja realmente excluir o Processo {{selectedItem.descricao}}?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click="deleteDialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="deleteItem">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Fim Modal Exclusão -->

    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import {workflow, etapaWorkflow} from '../../../lib/app'

  export default {
    data: () => ({
      deleteDialog: false,
      search: '',
      wkfGuid: '',
      headers: [{
        text: 'Ações', value: 'name', sortable: false, align: 'center'
      },
      { text: 'Ordem', value: 'ordem' },
      { text: 'Descrição', align: 'left', value: 'descricao' }
      ],
      items: [],
      editedIndex: -1,
      selectedItem: {
        id: '',
        ordem: '',
        descricao: '',
        Ativo: true
      }
    }),
    computed: {
    },
    created () {
      this.initialize()
    },
    methods: {
      async list (params) {
        Vue.showLoading(false)
        try {
          try {
            const result = await workflow.listarPassos(params)
            if (Array.isArray(result[0].passos)) {
              this.items = result[0].passos.map(it => ({
                id: it.id,
                ordem: it.ordem,
                descricao: it.descricao,
                ativo: it.ativo
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
        this.list(this.$route.params.guid)
        this.wkfGuid = this.$route.params.guid
      },
      editItem (item) {
        this.selectedItem = item
        this.$router.push({ name: 'cadastroWorkflow', params: { id: item.id, wkfGuid: this.wkfGuid } })
      },
      addNew () {
        this.$router.push({ name: 'cadastroWorkflow', params: { wkfGuid: this.wkfGuid } })
      },
      deleteConfirmationMessage (item) {
        this.selectedItem = item
        this.deleteDialog = true
      },
      async deleteItem () {
        this.deleteDialog = false
        const index = this.items.indexOf(this.selectedItem)
        try {
          const result = await etapaWorkflow.deletar(this.selectedItem.id)
          if (typeof result === 'boolean' && result) {
            this.items.splice(index, 1)
            Vue.showMessage('Excluído com sucesso', 'success')
          } else {
            Vue.showMessage(result.toString(), 'error')
          }
        } catch (error) {
          Vue.showMessage(error.toString(), 'error')
        }
      }
    }
  }
</script>

<style>

</style>
