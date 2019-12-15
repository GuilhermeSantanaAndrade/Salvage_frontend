<template>
  <v-app>    
    <v-toolbar :clipped-left="true" app dark color="primary" >    
      <v-toolbar-side-icon @click="drawer=!drawer" v-if="this.$router.checkLogged()"></v-toolbar-side-icon>
      <v-img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" max-width="38px" max-height="38px"></v-img>
      <v-toolbar-title>{{this.$store.state.AppTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-badge color="error" overlap right v-if="this.$router.checkLogged()">
        <span slot="badge">{{CountWarning}}</span>
        <v-icon>
          notifications_none
        </v-icon>
      </v-badge>

      <!-- <v-menu bottom origin="center center" transition="scale-transition">
          <v-btn color="primary" dark>Scale Transition</v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in menuGroups" :key="i">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->

      <!-- <v-btn icon v-if="this.$router.checkLogged()">
        <v-icon>search</v-icon>
      </v-btn> -->
      <v-btn @click="dialogConfig = true" icon v-if="this.$router.checkLogged()">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" v-if="showMenu" enable-resize-watcher fixed width="300" app>
      <v-flex text-xs-center>
        <v-card class="pt-4 mx-auto" flat max-width="400" color="#f4f3f4">
            <v-card-text>
              <v-avatar size="88">
                <v-img
                  src="https://docs.atlassian.com/aui/8.0.2/docs/images/avatar-person.svg"
                  class="mb-4">
                </v-img>
              </v-avatar>
              <h3 class="headline mb-2">{{menuUserInfos.nomeUsuario}}</h3>
              <div class="blue--text mb-2">{{menuUserInfos.email}}</div>
              <!-- <div class="blue--text subheading font-weight-bold">J_Silva</div> -->
            </v-card-text>
            <v-divider></v-divider>
            <v-layout tag="v-card-text" text-xs-left wrap>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Empresa:</v-flex>
              <v-flex>{{menuUserInfos.empresa}}</v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>E-mail:</v-flex>
              <v-flex><a :href="`www.google.com.br`" target="_blank">{{menuUserInfos.empresaEmail}}</a>
              </v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Tel:</v-flex>
              <v-flex>{{menuUserInfos.empresaTelefone}}</v-flex>              
            </v-layout>
            <v-divider></v-divider>
          </v-card>
        </v-flex>

        <v-list>
          <v-list-group no-action v-for="(item, i) in menuGroups" :prepend-icon="item.icon" :key="i" :append-icon="item.sub_menus == undefined ? '' : undefined">
            <v-list-tile slot="activator">
              <v-list-tile-title v-text="item.title" @click="redirecionar(item.to)"></v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(subitem, y) in item.sub_menus" :key="y" @click="redirecionar_subitem(subitem.to)">
              <v-list-tile-title style="font-size: 13px" v-text="subitem.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-content> 
    <v-footer class="pa-3" app>
        <div>Salvage - {{ new Date().getFullYear() }}</div>
    </v-footer>

    <v-snackbar v-model="this.$store.state.ShowingSnackBar" :color="this.$store.state.SnackBarType"
      :timeout="0" :right="true" :top="true" auto-height>
        {{ this.$store.state.SnackBarText }}
      <v-btn dark flat @click="local_setSnackBarVisibility(false)">Ok</v-btn>
    </v-snackbar>

    <!-- Configurações -->
    <v-dialog v-model="dialogConfig" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogConfig = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Configurações</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialogConfig = false">Salvar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Geral</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox v-model="config_notifications"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Habilita notificações</v-list-tile-title>
              <v-list-tile-sub-title>Permite recebimento de notificações de outros usuários</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>Configurações de E-mail</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-layout>
                <v-flex xs12> 
                  <v-form ref="form" lazy-validation>
                    <v-container>
                      <v-layout>
                        <v-flex xs12 md6>
                          <v-text-field label="Host SMTP" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2>
                          <v-text-field label="Porta" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-layout>
                <v-flex xs12> 
                  <v-form ref="form" lazy-validation>
                    <v-container>
                      <v-layout>
                        <v-flex xs12 md6>
                          <v-text-field label="Usuário" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field label="Senha" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-layout>
                <v-flex xs12> 
                  <v-form ref="form" lazy-validation>
                    <v-container>
                      <v-layout>
                        <v-switch label="Habilitar SSL" required color="blue"></v-switch>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-dialog>
    <!-- Fim Configurações -->
        
    <!-- Loading -->
    <v-dialog v-model="this.$store.state.ShowingProgress" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Por favor aguarde...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="this.$store.state.ShowingDialog" max-width="450px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{ this.$store.state.DialogTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            {{ this.$store.state.DialogText }}
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="local_setDialogVisibility(false)">Cancelar</v-btn>
          <v-btn color="primary" @click="local_setDialogVisibility(false)">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      AppTitle: '',
      clipped: true,
      drawer: false,
      fixed: false,
      isMobile: false,
      dialogConfig: false,
      menuUserInfos: {
        nomeUsuario: '',
        email: '',
        empresa: '',
        empresaEmail: '',
        empresaTelefone: ''
      },
      menuGroups: [{
        icon: 'home',
        title: 'Home',
        to: 'home'
      },
      {
        icon: 'reorder',
        title: 'Cadastros',
        sub_menus: [{
          icon: '',
          title: 'Guincheiro',
          to: 'guincheiro'
        },
        {
          icon: '',
          title: 'Despachante',
          to: 'despachante'
        },
        {
          icon: '',
          title: 'Pátio',
          to: 'patio'
        },
        {
          icon: '',
          title: 'Oficina',
          to: 'oficina'
        },
        {
          icon: '',
          title: 'Workflow',
          to: 'workflow'
        }]
      },
      {
        icon: 'settings_ethernet',
        title: 'Salvados',
        sub_menus: [{
          icon: '',
          title: 'Processos',
          to: 'consultaProcessos'
        },
        {
          icon: '',
          title: 'Novo',
          to: 'cadastroProcessos'
        }]
      },
      // {
      //   icon: 'bar_chart',
      //   title: 'Relatórios'
      // },
      {
        icon: 'account_circle',
        title: 'Conta',
        to: 'contaUsuario'
      },
      {
        icon: 'power_settings_new',
        title: 'Logout',
        to: 'login'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      CountWarning: 0,
      config_notifications: false
    }
  },
  watch: {
  },
  methods: {
    redirecionar (value) {
      this.$router.push({name: value})
    },
    redirecionar_subitem (value) {
      this.drawer = !this.drawer
      this.$router.push({name: value})
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
    },
    local_setSnackBarVisibility (value) {
      this.$store.commit('setSnackBarVisibility', { Visibility: value })
      if (!value) {
        this.$store.commit('setSnackBarText', { Text: '' })
      }
    },
    local_setDialogVisibility (value) {
      this.$store.commit('setDialogVisibility', { Visibility: value })
      if (!value) {
        this.$store.commit('setDialogText', { Text: '' })
        this.$store.commit('setDialogTitle', { Title: '' })
      }
    },
    InitializeDrawer () {
      this.drawer = !this.$vuetify.breakpoint.xsOnly
    }
  },
  computed: {
    showMenu () {
      if (this.$router.checkLogged()) {
      } else {
      }
      return this.$router.checkLogged() && this.drawer
    },
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '220px'
        case 'sm': return '400px'
        case 'md': return '500px'
        case 'lg': return '600px'
        case 'xl': return '800px'
      }
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  created: function () {
    this.InitializeDrawer()
    this.menuUserInfos = {
      nomeUsuario: 'Salvage',
      email: 'salvage@gmail.com',
      empresa: 'Salvage LTDA',
      empresaEmail: 'salvage@gmail.com',
      empresaTelefone: '(11) 3795-1032'
    }
  },
  name: 'App'
}
</script>

<style>

</style>