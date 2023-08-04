<template>
        <div class="card col-xs-12 col-sm-12 col-md-6 col-lg-4 m-auto mt-4">
        <div class="card-header text-center">
            <span class="text-secondary">Redefinir senha</span>
        </div>
        <div class="card-body">
            <span class="text-center text-secondary mt-2 mb-4">
                Esqueceu sua senha? sem problemas, informe-nos seu email e receba em sua caixa de correio o link de redefinição da sua senha.
            </span>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">E-mail</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Entre com e-mail">
                    <small id="emailHelp" class="form-text text-muted">ildomar@gmail.com</small>
                </div>
                <div class="d-grid gab mt-4">
                    <button type="submit" class="btn btn-primary btn-sm">
                        <svg-icon type="mdi" :path="path"></svg-icon>
                        Enviar solicitação de redefinição da senha
                    </button>
                </div>

                <div class="text-center mt-4 mb-4">
                    <span class="text-secondary">
                        <router-link class="text-secondary" :to="{name:'home.login'}">
                            Já estou registado
                        </router-link>
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLockReset } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiLockReset,
    }
  }
}
</script>