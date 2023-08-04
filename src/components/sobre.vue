<template>
    <div class="row mt-4">
        <div class="col-12 text-secondary text-center">
            <strong><svg-icon type="mdi" :path="path"></svg-icon> SOBRE NOSSOS PRODUTOS</strong>
        </div>
        <div class="col-12 text-secondary">
            <p class="text-justify mt-2">
                o meu canal de YouTube “Momentos Doces e Salgados”, apresentamos uma receita especial para momentos festivos: o Bolo Chiffon de Chocolate. Esta massa leve e aerada é perfeita para bolos de aniversário, garantindo uma experiência incrível tanto no sabor quanto na textura.
O Bolo Chiffon de Chocolate é uma verdadeira obra-prima, que combina a intensidade do chocolate com a delicadeza da massa. Aprenda com o nosso canal todos os passos para obter um bolo perfeito, digno de celebrações especiais.
            </p>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCake } from '@mdi/js';

export default {
    name: "navBar-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiCake,
        }
    },
}
</script>