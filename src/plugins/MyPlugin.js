import store from '../store/store'

const MyPlugin = {
  install (Vue, options) {
    Vue.showMessage = function showMessage (AText, AType = 'success', AhideLoading = true) {
      store.commit('setSnackBarText', { Text: AText })
      store.commit('setSnackBarVisibility', { Visibility: true })
      store.commit('setSnackBarType', { Type: AType })
      if (AhideLoading) {
        this.hideLoading()
      }
    }
    Vue.hideMessage = function hideMessage () {
      store.commit('setSnackBarText', { Text: '' })
      store.commit('setSnackBarVisibility', { Visibility: false })
    }
    Vue.showDialog = function showDialog (dados) {
      store.commit('setDialogText', { Text: dados.Text })
      store.commit('setDialogTitle', { Title: dados.Title })
      store.commit('setDialogVisibility', { Visibility: dados.Visibility })
    }
    Vue.showLoading = function showLoading (AhideMessage = true) {
      store.commit('setProgressVisibility', { Visibility: true })
      if (AhideMessage) {
        this.hideMessage()
      }
    }
    Vue.hideLoading = function hideLoading () {
      store.commit('setProgressVisibility', { Visibility: false })
    }
  }
}

export default MyPlugin
