import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Usuario: {},
    UserLogged: false,
    AppTitle: '',
    ShowingSnackBar: false,
    SnackBarText: '',
    SnackBarType: '',
    ShowingDialog: false,
    DialogText: '',
    DialogTitle: '',
    ShowingProgress: false
  },
  mutations: {
    setUserLogged (state, payload) {
      state.UserLogged = payload.UserLogged
    },
    setAppTitle (state, payload) {
      state.AppTitle = payload.AppTitle
    },
    setSnackBarText (state, payload) {
      state.SnackBarText = payload.Text
    },
    setSnackBarType (state, payload) {
      state.SnackBarType = payload.Type
    },
    setSnackBarVisibility (state, payload) {
      state.ShowingSnackBar = payload.Visibility
    },
    setDialogText (state, payload) {
      state.DialogText = payload.Text
    },
    setDialogTitle (state, payload) {
      state.DialogTitle = payload.Title
    },
    setDialogVisibility (state, payload) {
      state.ShowingDialog = payload.Visibility
    },
    setProgressVisibility (state, payload) {
      state.ShowingProgress = payload.Visibility
    },
    setUsuario (state, payload) {
      state.Usuario = payload.Usuario
    }
  }
})
