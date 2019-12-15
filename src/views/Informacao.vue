<template>
  <v-container fluid>
    <v-layout fill-height row justify-center>
      <v-flex md10>
        <v-card>
          <template v-for="(item, index) in mensagens">
            <v-alert :key="index" :v-if="(item.mensagem != '')" :value="true" :type="item.tipo">{{item.mensagem}}</v-alert>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import goTo from 'vuetify/lib/components/Vuetify/util/goTo'
export default {
  data () {
    return {
      mensagens: [],
      guidInput: ''
    }
  },
  created () {
    this.guidInput = this.$route.params.guid || ''
    this.processMessage()
    goTo(0)
  },
  methods: {
    processMessage () {
      switch (this.guidInput) {
        case 'b9dc0b47-c314-4359-b853-c3239102a4d6': {
          this.mensagens.push({mensagem: 'Andamento realizado com sucesso! Já pode fechar esta tela.', tipo: 'success'})
          this.mensagens.push({mensagem: 'Agora seguradora já sabe que você realizou finalizou o serviço.', tipo: 'info'})
          break
        }
        default: {
          this.mensagens.push({mensagem: '404 - Url inválida', tipo: 'error'})
          break
        }
      }
    }
  }
}
</script>

<style>

</style>
