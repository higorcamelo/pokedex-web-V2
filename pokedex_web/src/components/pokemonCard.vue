<template>
    <div class="pokemon-card">
        <img :src="pokemon.imageUrl" :alt="pokemon.name">
        <div class="pokemon-info">
            <h3>{{ pokemon.name }}</h3>
            <p>Tipo: {{ pokemon.type }}</p>
        </div>
    </div>
</template>

<script>

export default{
    props:{
        pokemon:{
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.pokemon-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

img {
  max-width: 100px;
  max-height: 100px;
  margin-bottom: 10px;
}

h3 {
  margin: 0;
  font-size: 18px;
}

p {
  margin: 0;
  font-size: 14px;
  color: #888;
}
</style>