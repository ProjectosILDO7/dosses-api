<template>
    <!-- <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" v-if="imageCarrossel">
        <div class="carousel-indicators">
                <button v-for="img, index in imageCarrossel" :key="index" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index" class="active"
                    aria-current="true" :aria-label="`Slide ${index}`"></button>
 
        </div>
        <div class="carousel-inner">

            <div class="carousel-item" v-for="image, index in imageCarrossel" :key="index">
                <img :src="`${url}${image.imagens}`" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>{{ image.titulo }}</h5>
                    <p>{{ image.conteudo }}</p>
                </div>
            </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próxima</span>
        </button>
    </div> -->


    <!-- Desenvovedor -->
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">

            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 0"></button>

            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                aria-label="Slide 1"></button>

            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                aria-label="Slide 2"></button>

            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                aria-label="Slide 3"></button>

            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
                aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">

            <div class="carousel-item active">
                <img src="/image/doce1.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>A compenhe seu gosto</h5>
                    <p>Os doces gourmets são diferenciados pelos seus ingredientes selecionados, nobres e finos</p>
                </div>
            </div>

            <div class="carousel-item">
                <img src="/image/doce2.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Cremoso</h5>
                    <p>São doces cremosos com uma variedade de recheios. Sem contar que a apresentação é caprichada, com
                        embalagens especiais e coberturas bonitas.</p>
                </div>
            </div>

            <div class="carousel-item">
                <img src="/image/doce4.webp" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>O paladar do viver</h5>
                    <p>Uma dieta equilibrada é um brigadeiro gourmet em cada mão.</p>
                </div>
            </div>

            <div class="carousel-item">
                <img src="/image/doce5.png" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Delícia</h5>
                    <p>O melhor o que pretendes.</p>
                </div>
            </div>

            <div class="carousel-item">
                <img src="/image/Doce6.jpeg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>O sabor da melhor cominda</h5>
                    <p>Acompnhe-mos e vê o mundo com bons olhos.</p>
                </div>
            </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próxima</span>
        </button>
    </div>
</template>

<script>
import { URL_BASE, } from "../configs"

export default {
    data() {
        return {
            url: URL_BASE + '/storage/image/produtos/'

        }
    },

    created() {
        this.loadingImagensCliente()
    },

    methods: {
        loadingImagensCliente() {
            this.$store.dispatch('loadingImagensCliente')
        }
    },

    computed: {
        imageCarrossel() {
            return this.$store.getters.loadingImagensCliente
        }
    }
}
</script>

<style scoped></style>