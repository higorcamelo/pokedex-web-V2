<template>
  <main>
    <pokemonCard v-for="pokemon in pokemonList" :key="pokemon.id" :pokemon="pokemon"/>
  </main>
</template>

<script>
import pokemonCard from '@/components/pokemonCard.vue'
import getAllPKMN from '@/services/pokeapiService.vue'

export default{
  components:{
    pokemonCard
  },
  data(){
    return{
      pokemonList: [],

    }
  },
  async created(){
    try {
      this.pokemonList = await getAllPKMN() 
    } catch(error){
      console.error(error)
    }

  }
}
</script>

