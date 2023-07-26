<template>
  <main>
    
  </main>
</template>

<script>
import { getPkmnDetails } from '@/services/pokeapiService.js';

export default {
  data() {
    return {
      pokemonDetalhes: [],
    };
  },
  async created() {
    await getPkmnDetails()
  },

  methods: {
  },
};
</script>