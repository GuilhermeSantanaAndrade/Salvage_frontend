import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '../views/Inicio'
import Home from '../views/Inicio/Home'
import Acesso from '../views/Acesso'
import Login from '../views/Acesso/Login'
import EsqueceuSenha from '../views/Acesso/EsqueceuSenha'
import CadastroGuincheiro from '../views/CadastroGuincheiro'
import FormularioCadastroGuincheiro from '../views/CadastroGuincheiro/FormularioGuincheiro'
import ConsultaGuincheiro from '../views/CadastroGuincheiro/ConsultaGuincheiro'
import CadastroPatio from '../views/CadastroPatio'
import FormularioCadastroPatio from '../views/CadastroPatio/FormularioPatio'
import ConsultaPatio from '../views/CadastroPatio/ConsultaPatio'
import CadastroUsuario from '../views/CadastroUsuario'
import FormularioCadastroUsuario from '../views/CadastroUsuario/FormularioUsuario'
import ConsultaUsuario from '../views/CadastroUsuario/ConsultaUsuario'
import ContaUsuario from '../views/CadastroUsuario/Conta'
import CadastroOficina from '../views/CadastroOficina'
import FormularioCadastroOficina from '../views/CadastroOficina/FormularioOficina'
import ConsultaOficina from '../views/CadastroOficina/ConsultaOficina'
import store from '../store/store'
import CadastroDespachante from '../views/CadastroDespachante'
import FormularioCadastroDespachante from '../views/CadastroDespachante/FormularioDespachante'
import ConsultaDespachante from '../views/CadastroDespachante/ConsultaDespachante'
import CadastroWorkflow from '../views/CadastroWorkflow'
import FormularioCadastroWorkflow from '../views/CadastroWorkflow/FormularioWorkflow'
import ConsultaWorkflow from '../views/CadastroWorkflow/ConsultaWorkflow'
import EditaWorkflow from '../views/CadastroWorkflow/Edita'
import Processos from '../views/Processos'
import FormularioCadastroProcessos from '../views/Processos/FormularioProcessos.vue'
import ConsultaProcessos from '../views/Processos/ConsultaProcessos'
import Acompanhamento from '../views/Acompanhamento'
import Dashboard from '../views/Acompanhamento/Dashboard'
import Detail from '../views/Acompanhamento/Detail'
import Timeline from '../views/Acompanhamento/timeline'
import AndamentoProcesso from '../views/Processos/Andamento'
import formularioAndamento from '../views/Processos/FormularioAndamento'
import Info from '../views/Informacao'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/acesso',
      name: 'Acesso',
      component: Acesso,
      meta: { title: 'Login' },
      children: [{
        path: 'login',
        name: 'login',
        component: Login,
        meta: { title: 'Salvage' }
      },
      {
        path: 'esqueceu-senha',
        name: 'esqueceusenha',
        component: EsqueceuSenha,
        meta: { title: 'Login' }
      }]
    },
    {
      path: '/despachante',
      name: 'despachante',
      component: CadastroDespachante,
      meta: { title: '' },
      redirect: { name: 'consultaDespachante' },
      children: [
        {
          path: 'consulta',
          name: 'consultaDespachante',
          component: ConsultaDespachante,
          meta: { title: 'Despachante > Consulta' }
        },
        {
          path: 'cadastro',
          name: 'cadastroDespachante',
          component: FormularioCadastroDespachante,
          meta: { title: 'Despachante > Consulta > Cadastro' }
        }
      ]
    },
    {
      path: '/guincheiro',
      name: 'guincheiro',
      component: CadastroGuincheiro,
      meta: { title: '' },
      redirect: { name: 'consultaGuincheiro' },
      children: [
        {
          path: 'consulta',
          name: 'consultaGuincheiro',
          component: ConsultaGuincheiro,
          meta: { title: 'Guincheiro > Consulta' }
        },
        {
          path: 'cadastro/:guid?',
          name: 'cadastroGuincheiro',
          component: FormularioCadastroGuincheiro,
          meta: { title: 'Guincheiro > Consulta > Cadastro' }
        }
      ]
    },
    {
      path: '/patio',
      name: 'patio',
      component: CadastroPatio,
      meta: { title: '' },
      redirect: { name: 'consultaPatio' },
      children: [
        {
          path: 'consulta',
          name: 'consultaPatio',
          component: ConsultaPatio,
          meta: { title: 'Pátio > Consulta' }
        },
        {
          path: 'cadastro',
          name: 'cadastroPatio',
          component: FormularioCadastroPatio,
          meta: { title: 'Pátio > Consulta > Cadastro' }
        }
      ]
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: CadastroUsuario,
      meta: { title: '' },
      redirect: { name: 'consultaUsuario' },
      children: [
        {
          path: 'consulta',
          name: 'consultaUsuario',
          component: ConsultaUsuario,
          meta: { title: 'Usuário > Consulta' }
        },
        {
          path: 'cadastro',
          name: 'cadastroUsuario',
          component: FormularioCadastroUsuario,
          meta: { title: 'Usuário > Consulta > Cadastro' }
        },
        {
          path: 'conta',
          name: 'contaUsuario',
          component: ContaUsuario,
          meta: { title: 'Usuário > Conta' }
        }
      ]
    },
    {
      path: '/oficina',
      name: 'oficina',
      component: CadastroOficina,
      meta: { title: '' },
      redirect: { name: 'consultaOficina' },
      children: [
        {
          path: 'consulta',
          name: 'consultaOficina',
          component: ConsultaOficina,
          meta: { title: 'Oficina > Consulta' }
        },
        {
          path: 'cadastro',
          name: 'cadastroOficina',
          component: FormularioCadastroOficina,
          meta: { title: 'Oficina > Consulta > Cadastro' }
        }
      ]
    },
    {
      path: '/processos',
      name: 'processos',
      component: Processos,
      meta: { title: '' },
      redirect: { name: 'consultaProcessos' },
      children: [
        {
          path: 'consulta',
          name: 'consultaProcessos',
          component: ConsultaProcessos,
          meta: { title: 'Processos > Consulta' }
        },
        {
          path: 'cadastro/:guid?',
          name: 'cadastroProcessos',
          component: FormularioCadastroProcessos,
          meta: { title: 'Processos > Consulta > Cadastro' }
        },
        {
          path: 'andamento/:guid?',
          name: 'andamentoProcesso',
          component: AndamentoProcesso,
          meta: { title: 'Processos > Consulta > Andamento' },
          children: [
            {
              path: '123456789',
              name: 'formularioAndamento',
              component: formularioAndamento,
              meta: { title: 'Processos > Consulta > Andamento' }
            }
          ]
        }
      ]
    },
    {
      path: '/acompanhamento',
      name: 'acompanhamento',
      component: Acompanhamento,
      meta: { title: '' },
      redirect: { name: 'dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: { title: 'Acompanhamento > Dashboard' }
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail,
          meta: { title: 'Acompanhamento > Detail' }
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: Timeline,
          meta: { title: 'Acompanhamento > Linha do Tempo' }
        }
      ]
    },
    {
      path: '/workflow',
      name: 'workflow',
      component: CadastroWorkflow,
      meta: { title: '' },
      redirect: { name: 'consultaWorkflow' },
      children: [
        {
          path: 'consulta',
          name: 'consultaWorkflow',
          component: ConsultaWorkflow,
          meta: { title: 'Workflow > Consulta' }
        },
        {
          path: 'edita',
          name: 'editaWorkflow',
          component: EditaWorkflow,
          meta: { title: 'Workflow > Consulta > Edita' }
        },
        {
          path: 'cadastro',
          name: 'cadastroWorkflow',
          component: FormularioCadastroWorkflow,
          meta: { title: 'Workflow > Consulta > Cadastro' }
        }
      ]
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: Inicio,
      redirect: { name: 'home' },
      children: [{
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: 'Home' }
      }]
    },
    {
      path: '/push',
      name: 'Push',
      component: formularioAndamento,
      children: [
        {
          path: 'andamentoProcessoPush',
          name: 'andamentoProcessoPush',
          component: formularioAndamento,
          meta: { title: 'Salvage' }
        }
      ]
    },
    {
      path: '/info/:guid?',
      name: 'info',
      component: Info
    },
    {
      path: '/',
      name: 'default',
      redirect: { name: 'login' }
    }
  ]
})

router.checkLogged = function () {
  let usr = store.state.Usuario
  if (usr.guid && (usr.guid.toString() !== '')) {
    return true
  } else {
    return false
  }
}

router.beforeEach((to, from, next) => {
  if ((to.fullPath !== '/acesso/login') && (!router.checkLogged()) && (!to.fullPath.includes('/andamentoProcessoPush') && (!to.fullPath.includes('/info')))) {
    router.push({ name: 'default' })
  }
  store.commit('setAppTitle', {AppTitle: to.meta.title})
  next()
})

export default router
