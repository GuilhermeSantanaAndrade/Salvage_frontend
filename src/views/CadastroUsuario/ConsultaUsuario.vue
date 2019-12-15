<template>
  <v-container>
    <v-layout fill-height row justify-center>
      <v-flex md12>
        <v-toolbar flat color="white">
          <v-toolbar-title v-if="!this.$vuetify.breakpoint.xsOnly">Usuários</v-toolbar-title>
          <v-divider class="mx-2" inset vertical v-if="!this.$vuetify.breakpoint.xsOnly">
          </v-divider>
          <v-text-field clearable v-model="search" append-icon="search" label="Busca" hide-details>
          </v-text-field>
        </v-toolbar>
        <v-data-table :headers="headers" :items="Items" :search="search" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="justify-center layout px-0">
              <v-icon small color="blue darken-2" @click="editItem(props.item)" style="margin-right: 20px;">edit</v-icon>
              <v-icon small color="red darken-2" @click="deleteConfirmationMessage(props.item)" style="margin-left: 20px;">delete</v-icon>
            </td>
            <td>{{ props.item.Login }}</td>
            <td>{{ props.item.Empresa }}</td>
            <td class="text-xs-center">
              <v-checkbox v-model="props.item.Admin" value disabled></v-checkbox>
            </td>
          </template>
          <template slot="no-data">
          </template>
        </v-data-table>

        <v-btn class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark blue darken-1"
               style="width: 65px; height:65px; font-size: 30px" :to="{ name: 'cadastroUsuario' }">+</v-btn>
      </v-flex>

      <!-- Modal Exclusão -->
      <v-dialog v-model="deleteDialog" persistent max-width="390">
        <v-card>
          <v-card-title class="headline">Exclusão de registro</v-card-title>
          <v-card-text>
            Deseja realmente excluir o usuário {{selectedItem.Login}}?
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
  export default {
    data: () => ({
      deleteDialog: false,
      nome: '',
      search: '',
      headers: [{
        text: 'Ações', align: 'center', value: 'Login', sortable: false
      },
      { text: 'Login', align: 'left', value: 'Login' },
      { text: 'Empresa', value: 'Empresa' },
      { text: 'Admin', value: 'Admin' }
      ],
      Items: [],
      editedIndex: -1,
      selectedItem: {
        Codigo: '',
        Login: '',
        Empresa: '',
        Admin: true
      },
      defaultItem: {
        Codigo: '',
        Login: '',
        Empresa: '',
        Admin: true
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
      initialize () {
        this.Items = [{
          Codigo: '00001',
          Login: 'user1@salvage.com.br',
          Empresa: 'Seguradora',
          Admin: true
        },
        {
          Codigo: '00002',
          Login: 'user2@salvage.com.br',
          Empresa: 'Seguradora',
          Admin: false
        },
        {
          Codigo: '00003',
          Login: 'user3@salvage.com.br',
          Empresa: 'Guincheiro 001',
          Admin: false
        },
        {
          Codigo: '00004',
          Login: 'user4@salvage.com.br',
          Empresa: 'Guincheiro 001',
          Admin: false
        },
        {
          Codigo: '00005',
          Login: 'user5@salvage.com.br',
          Empresa: 'Guincheiro 002',
          Admin: false
        },
        {
          Codigo: '00006',
          Login: 'user6@salvage.com.br',
          Empresa: 'Despachante 001',
          Admin: false
        },
        {
          Codigo: '00007',
          Login: 'user7@salvage.com.br',
          Empresa: 'Despachante 001',
          Admin: false
        },
        {
          Codigo: '00008',
          Login: 'user8@salvage.com.br',
          Empresa: 'Despachante 001',
          Admin: false
        },
        {
          Codigo: '00009',
          Login: 'user9@salvage.com.br',
          Empresa: 'Despachante 002',
          Admin: false
        },
        {
          Codigo: '00010',
          Login: 'user10@salvage.com.br',
          Empresa: 'Despachante 003',
          Admin: false
        }]
      },
      editItem (item) {
        this.selectedItem = item
        this.$router.push({ name: 'cadastroUsuario' })
      },
      deleteConfirmationMessage (item) {
        this.selectedItem = item
        this.deleteDialog = true
      },
      deleteItem () {
        const index = this.Items.indexOf(this.selectedItem)
        this.Items.splice(index, 1)
        this.deleteDialog = false
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.Items[this.editedIndex], this.selectedItem)
        } else {
          this.Items.push(this.selectedItem)
        }
        this.close()
      }
    }
  }
</script>

<style>

</style>
