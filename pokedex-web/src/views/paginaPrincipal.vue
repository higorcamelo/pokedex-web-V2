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
import PokemonCard from '@/components/PokemonCard.vue';
import { getAllPKMN, getPKMNDetails, getByNamePKMN } from '@/services/pokeapiService.js';

export default {
  components: {
    'pokemon-card': PokemonCard,
  },
  data() {
    return {
      pokemonList: [],
    };
  },
  async created() {
    try {
      const pokemonsData = await getAllPKMN();
      console.log(pokemonsData)
      this.pokemonList = pokemonsData;
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async loadPokemonDetails() {
      for (const pokemon of this.pokemonList) {
        const details = await getPKMNDetails(pokemon.url);

        if (details) {
          pokemon.types = details.types.map((typeObj) => typeObj.type.name);
          pokemon.imageUrl = details.sprites.front_default;
        }
      }
    },
  },
};
</script>