<template>
  <v-card >
    <v-list three-line>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <!--<v-icon :class="[iconClass]">{{ icon }}</v-icon>-->
          <img :src=avatar>
        </v-list-tile-avatar>
        <v-list-tile-content width="30%" v-on:click="$emit('callbackDetalhes', guid)" style="cursor:pointer;"> 
          <v-tooltip bottom>
            <v-list-tile-title class="titles" slot="activator">Apólice: {{ title }}</v-list-tile-title>
            <span>Apólice</span>
          </v-tooltip>

          <v-tooltip bottom>
            <v-list-tile-title class="subtitles" slot="activator">{{ subtitle }}</v-list-tile-title>
            <span>Marca / Modelo</span>
          </v-tooltip>

          <v-tooltip bottom>
            <v-list-tile-title class="subtitles" slot="activator">{{ placa }}</v-list-tile-title>
            <span>Marca / Modelo</span>
          </v-tooltip>
        </v-list-tile-content>
        
        <v-list-tile-action>  
            <p :class="[etapaClass]">{{etapa}}</p>
        </v-list-tile-action>

        <div style="width: 5%"></div>

        <v-menu
          left
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x>
          <v-btn icon slot="activator"><v-icon>more_vert</v-icon></v-btn>

          <v-card color="#f4f3f4" width="100%" height="100%">
            <!--<v-container>-->
              <!--<v-layout fill-height row wrap>-->                      
                <v-flex xs11 sm11 md11 lg11>
                  <v-btn color="primary" style="width: 100%" v-on:click="$emit('callbackAlterar', guid)" @click="menu = false">Alterar</v-btn>
                </v-flex>
                <v-flex xs11 sm11 md11 lg11>
                  <v-btn color="primary" style="width: 100%" v-on:click="$emit('callbackDetalhes', guid)" @click="menu = false">Detalhes</v-btn>
                </v-flex>                
                <v-flex xs11 sm11 md11 lg11>
                  <v-btn color="primary" style="width: 100%" v-on:click="$emit('callbackAndamento', guid)" @click="menu = false">Realizar andamento</v-btn>
                </v-flex>
                <v-flex xs11 sm11 md11 lg11>
                  <v-btn color="primary" style="width: 100%" v-on:click="$emit('callbackQuitar', guid)" @click="menu = false">Quitar Processo</v-btn>
                </v-flex>
              <!--</v-layout>-->
            <!--</v-container>-->
          </v-card>
        </v-menu>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      menu: false,
      name: 'CardProcesso'
    }
  },
  props: {
    title: '',
    iconClass: '',
    icon: '',
    subtitle: '',
    placa: '',
    etapaClass: '',
    etapa: '',
    avatar: '',
    guid: ''
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style>
.titles {
  font-weight: bold;  
  color: #838383
}

.subtitles {
  color: #C7C7C7
}
</style>
