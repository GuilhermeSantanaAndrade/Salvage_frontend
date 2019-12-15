<template>
  <v-container>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Processos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn icon slot="activator" @click="dialogFiltro = true"><v-icon>filter_list</v-icon></v-btn>
            <span>Filtrar</span>
          </v-tooltip>
        </v-toolbar>

        <!--<v-list three-line>-->
          <template v-for="(item, index) in processosFiltered">
            <CardProcesso v-on:callbackAlterar="alterar" 
                          v-on:callbackAndamento="realizarAndamento" 
                          v-on:callbackQuitar="showDeleteDialog"
                          v-on:callbackDetalhes="detalhes" 
                          @click="dialogDetalhes = true" 
                          :key=index 
                          :title=item.title 
                          :iconClass=item.iconclass 
                          :icon=item.icon 
                          :subtitle=item.subtitle 
                          :placa=item.placa 
                          :etapaClass=item.etapaClass 
                          :etapa=item.etapa 
                          :avatar=item.avatar 
                          :guid=item.guid></CardProcesso>
          </template>
        <!--</v-list>-->
      </v-card>

      <v-btn class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark blue darken-1"
        style="width: 65px; height:65px; font-size: 30px" :to="{ name: 'cadastroProcessos' }">+</v-btn>
    </v-flex>

    <!-- Modal Filtro -->
    <v-dialog v-model="dialogFiltro" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Filtrar Processos</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Novo', 'Alocar Guincheiro', 'Aguardando Guincho', 'Alocar Despachante', 'Aguardando Despacho', 'Finalizado']"
                  label="Etapa" multiple>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Processo"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select :items="['Mané Guincheiros', 'Zezé Guincheiros']" label="Guincheiro"></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select :items="['Despachante João', 'Despachante Maria']" label="Despachante"></v-select>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field label="Placa"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-tooltip bottom>
              <v-btn icon slot="activator"><v-icon>delete_sweep</v-icon></v-btn>
              <span>Limpar filtro</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogFiltro = false">Voltar</v-btn>
          <v-btn color="primary" @click="dialogFiltro = false">Filtrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Fim Modal Filtro -->

    <!-- Modal Detalhes -->
    <v-dialog v-model="dialogDetalhes" scrollable max-width="600px">
      <v-card>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-flex xs6 sm4 md4>
                <v-text-field label="Apolice" readonly v-model="detalhesSalvado.apolice"></v-text-field>
              </v-flex>
              <v-flex xs6 sm4 md4>
                <v-text-field label="Nº Processo(Sinistro)" readonly v-model="detalhesSalvado.sinistro"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Nome Segurado" readonly v-model="detalhesSalvado.nomeSegurado"></v-text-field>
              </v-flex>

              <v-flex xs6 sm4 md4>
                <v-text-field label="Data Cadastro" readonly v-model="detalhesSalvado.dataCriacao"></v-text-field>
              </v-flex>
              <v-flex xs6 sm4 md4>
                <v-text-field label="Data Atualização" readonly v-model="detalhesSalvado.dataAtualizacao"></v-text-field>
              </v-flex>
              
                <v-flex xs6 sm4 md4>
                  <v-text-field label="Marca" readonly v-model="detalhesSalvado.marca"></v-text-field>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field label="Modelo" readonly v-model="detalhesSalvado.modelo"></v-text-field>
                </v-flex>
                <v-flex xs6 sm2 md2>
                  <v-text-field label="Ano" readonly v-model="detalhesSalvado.ano"></v-text-field>
                </v-flex>
                <v-flex xs6 sm4 md4>
                  <v-text-field label="Placa" readonly v-model="detalhesSalvado.placa"></v-text-field>
                </v-flex>
                <v-flex xs6 sm4 md4>
                  <v-text-field label="Cor" readonly v-model="detalhesSalvado.cor"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea auto-grow label="Observações" readonly v-model="detalhesSalvado.observacoes" rows="1"></v-textarea>
                </v-flex>
            </v-layout>
          </v-container>
        </v-form>

        <br/>
        <v-bottom-nav :value="true" absolute color="transparent">
          <v-btn  @click="realizarAndamento(detalhesSalvado.guid)">
            <span>Finalizar Etapa</span>
            <v-icon>check_circle_outline</v-icon>
          </v-btn>
          <v-btn color="blue" @click="alterar(detalhesSalvado.guid)">
            <span>Editar Salvado</span>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn color="red" @click="dialogDetalhes = false">
            <span>Voltar</span>
            <v-icon>cancel</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </v-dialog>
    <!-- Fim Modal Detalhes -->

    <!-- Modal Exclusão -->
      <v-dialog v-model="deleteDialog" persistent max-width="390">
        <v-card>
          <v-card-title class="headline">Exclusão de registro</v-card-title>
          <v-card-text>
            Deseja realmente excluir o processo "{{selectedItem.title}}"?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click="deleteDialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="quitar()">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Fim Modal Exclusão -->
  </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import {salvado} from '../../../lib/app'
import CardProcesso from '../Acompanhamento/CardProcesso'

export default {
  data () {
    return {
      dialogFiltro: false,
      dialogDetalhes: false,
      deleteDialog: false,
      detalhesSalvado: {},
      processos: [],
      processosFiltered: [],
      selectedItem: {}
    }
  },
  computed: {

  },
  components: {
    CardProcesso
  },
  created: function () {
    this.initialize()
  },
  methods: {
    async list (params) {
      Vue.showLoading(false)
      try {
        try {
          const result = await salvado.listar(params)
          if (Array.isArray(result)) {
            this.processos = result.map(it => ({
              title: it.apolice,
              subtitle: it.marca + ' ' + it.modelo + ' ' + it.cor + ' ' + it.ano,
              placa: it.placa,
              etapa: it.passoEtapa.descricao,
              etapaClass: 'grey--text',
              iconClass: 'grey lighten-1 white--text',
              icon: 'assignment',
              guid: it.guid,
              avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScIn36JBOdMKbd4waSmiaO0viAfW1eVBJ6rI04RBqaRZdGNOGL'
            }))
            this.filtrar({})
          }
        } finally {
          Vue.hideLoading()
        }
      } catch (error) {
        Vue.showMessage(error.toString(), 'error')
      }
    },
    alterar (guid) {
      let proc = this.processos.filter((id, idx, arr) => arr[idx].guid === guid)
      if (proc.length > 0) {
        this.selectedItem = proc[0]
      }
      this.$router.push({ name: 'cadastroProcessos', params: { guid: guid } })
    },
    realizarAndamento (guid) {
      let proc = this.processos.filter((id, idx, arr) => arr[idx].guid === guid)
      if (proc.length > 0) {
        this.selectedItem = proc[0]
      }
      this.$router.push({ name: 'andamentoProcesso', params: { guid: guid } })
    },
    showDeleteDialog (guid) {
      let proc = this.processos.filter((id, idx, arr) => arr[idx].guid === guid)
      if (proc.length > 0) {
        this.selectedItem = proc[0]
      }
      this.deleteDialog = true
    },
    async quitar () {
      this.deleteDialog = false
      try {
        const result = await salvado.deletar(this.selectedItem.guid)
        if (typeof result === 'boolean' && result) {
          Vue.showMessage('Excluído com sucesso', 'success')
          this.$router.push({ name: 'home' })
        } else {
          Vue.showMessage(result.toString(), 'error')
        }
      } catch (error) {
        Vue.showMessage(error.toString(), 'error')
      }
    },
    async detalhes (guid) {
      let salv = await salvado.listar({guid: guid})
      if ((!salv) || ((salv.length || 0) === 0)) {
        Vue.showMessage('Processo não encontrado', 'error')
      }
      this.detalhesSalvado = salv[0]
      this.dialogDetalhes = true
    },
    initialize () {
      this.list({})
    },
    filtrar (dados) {
      debugger
      this.processosFiltered = this.processos.filter(item => { return item.marca === 'FIAT' })
    }
  }
}
</script>

<style>

</style>
