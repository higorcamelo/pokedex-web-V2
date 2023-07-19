<template>
  <main>
    <v-container>
      <v-row>
        <v-col v-for="pokemon in pokemonList" :key="pokemon.id" cols="12" sm="6" md="4" lg="3">
          <pokemon-card :pokemon="pokemon" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
<script>
import pokemonCard from './components/pokemonCard.vue'
import { getAllPKMN, getPKMNDetails } from '@/services/pokeapiService.js';

export default {
  name: 'App',
  components: {
    'pokemon-card': pokemonCard,
    },
  data(){
    return{
      pokemonList: []
    }
  },
  async created() {
    try {
      const pokemonsData = await getAllPKMN();
      const pokemonDetailsPromises = pokemonsData.map((pokemonData) =>
      getPKMNDetails(pokemonData.url)
      );
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      this.pokemonList = pokemonDetails.map((details, index) => ({
        id: index + 1,
        name: this.capitalizarNome(details.name),
        types: details.types.map((typeObj) => this.capitalizarNome(typeObj.type.name)).join(' / '),
        imageUrl: details.sprites.front_default,
      }));
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    capitalizarNome(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    },
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
