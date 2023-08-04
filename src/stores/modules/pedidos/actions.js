import PedidosServices from '../../../service/pedidos/pedidos.service'

const actions = {
  loadingPedidos({ commit }) {
    commit('PRELOADING', true)
    return PedidosServices.getPedidos()
      .then((response) => {
        commit('ADD_ALL_PEDIDOS', response.data)
      })
      .catch((error) => console.log(error))
      .finally(() => commit('PRELOADING', false))
  },

  detalhes_pedido({ commit }, id) {
    commit('PRELOADING', true)
    return PedidosServices.detalhes_pedido(id).finally(() => commit('PRELOADING', false))
  },

  marcarLidaNotify({ commit }, id) {
    commit('PRELOADING', true)
    return PedidosServices.marcarLidaNotify(id)
      .then((response) => {
        commit('ADD_ALL_PEDIDOS', response.data)
      })
      .finally(() => commit('PRELOADING', false))
  }
}

export default actions
