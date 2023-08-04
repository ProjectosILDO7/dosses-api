<template>
    <div class="card">
        <div class="card-body">
            <span class="h4 text-secondary text-center mb-2">
                Nossa Localização
            </span>
            <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="{ lat: lat, lng: lng }" :zoom="15">
                <Marker :options="{ position: { lat: lat, lng: lng } }" />
            </GoogleMap>
        </div>
    </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
    components: { GoogleMap, Marker },
    name: "GoogleMaps",

    data() {
        return {
            apiKey: 'AIzaSyB9uYKcrxXQ0u2dk53bwQBUKPOaqcnhl_s',
            lat: null,
            lng: null
        }
    },

    created() {
        this.$getLocation()
            .then((coordinates) => {
                this.lat = parseFloat(coordinates.lat.value)
                this.lng = parseFloat(coordinates.lng.value)
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>