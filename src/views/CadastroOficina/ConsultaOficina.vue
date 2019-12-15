<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md12>
        <v-toolbar flat color="white">
          <v-toolbar-title v-if="!this.$vuetify.breakpoint.xsOnly">Oficinas</v-toolbar-title>
          <v-divider class="mx-2" inset vertical v-if="!this.$vuetify.breakpoint.xsOnly">
          </v-divider>
          <v-text-field clearable v-model="search" append-icon="search" label="Busca" hide-details>
          </v-text-field>
        </v-toolbar>
        <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="justify-center layout px-0">
              <v-icon small color="blue darken-2" @click="editItem(props.item)" style="margin-right: 20px;">edit</v-icon>
              <v-icon small color="red darken-2" @click="deleteConfirmationMessage(props.item)" style="margin-left: 20px;">delete</v-icon>
            </td>
            <td>{{ props.item.nome }}</td>
            <td>{{ props.item.logradouro }}</td>
            <td class="text-xs-center">
              <v-checkbox v-model="props.item.ativo" value disabled></v-checkbox>
            </td>
          </template>
          <template slot="no-data">
          </template>
        </v-data-table>

        <v-btn class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark blue darken-1"
               style="width: 65px; height:65px; font-size: 30px" :to="{ name: 'cadastroOficina' }">+</v-btn>
      </v-flex>

      <!-- Modal Exclusão -->
      <v-dialog v-model="deleteDialog" persistent max-width="390">
        <v-card>
          <v-card-title class="headline">Exclusão de registro</v-card-title>
          <v-card-text>
            Deseja realmente excluir a oficina {{selectedItem.nome}}?
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
  import {oficina, funcoes} from '../../../lib/app'

  export default {
    data: () => ({
      deleteDialog: false,
      nome: '',
      search: '',
      headers: [{
        text: 'Ações', align: 'center', value: 'name', sortable: false
      },
      { text: 'Nome', align: 'left', value: 'nome' },
      { text: 'Endereço', value: 'logradouro' },
      { text: 'Ativo', value: 'ativo' }
      ],
      items: [],
      editedIndex: -1,
      selectedItem: {
        nome: '',
        cpf: '',
        logradouro: '',
        ativo: true
      },
      defaultItem: {
        nome: '',
        cpf: '',
        logradouro: '',
        ativo: true
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
            const result = await oficina.listar(params)
            if (Array.isArray(result)) {
              this.items = result.map(it => ({
                guid: it.guid,
                nome: it.nome,
                cpf: funcoes.applyCNPJ_or_CPFMask(it.cpf_cnpj),
                logradouro: it.endereco.logradouro,
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
        this.list({})
      },
      editItem (item) {
        this.selectedItem = item
        this.$router.push({ name: 'cadastroOficina', params: { guid: item.guid } })
      },
      deleteConfirmationMessage (item) {
        this.selectedItem = item
        this.deleteDialog = true
      },
      async deleteItem () {
        this.deleteDialog = false
        const index = this.items.indexOf(this.selectedItem)
        try {
          const result = await oficina.deletar(this.selectedItem.guid)
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
