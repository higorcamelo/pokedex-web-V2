<template>
  <header-pokedex :showSelect = "false"></header-pokedex>
  <v-container v-if="!loading" class="pokemon-container">
    <v-row>
      <v-col cols="12" sm="6">
        <img v-if="pokemon" :src="pokemon.imagem" :alt="pokemon.nome" class="pokemon-image" />
      </v-col>
      <v-col cols="12" sm="6">
        <h2 class="pokemon-name">{{ capitalizarNome(pokemon?.nome) }}</h2>
        <p class="pokemon-info">Tipos: {{ formatarTipos(pokemon?.tipos) }}</p>
        <p class="pokemon-info">Habilidades: {{ formatarHabilidades(pokemon?.habilidades) }}</p>
        <!-- Adicionar as barrinhas de estatísticas -->
        <div v-for="stat in pokemon?.stats" :key="stat.stat.name" class="pokemon-stat">
          <h4 class="pokemon-stat-name">{{ capitalizarNome(stat.stat.name) }}</h4>
          <v-progress-linear v-if="pokemon" :model-value="(stat.base_stat / 255) * 100" :max="100" height="15" class="pokemon-stat-bar">
            {{ stat.base_stat }}
          </v-progress-linear>
        </div>

        <!-- Adicionar v-divider para separar a tabela de ataques -->
        <v-divider v-if="pokemon" class="pokemon-divider"></v-divider>

        <!-- Tabela de ataques -->
        <v-table v-if="pokemon" class="pokemon-attacks-table">
          <template v-slot:thead>
            <tr>
              <th class="pokemon-attack-header">Nome</th>
            </tr>
          </template>
          <template v-slot:default>
            <tr v-for="ataque in paginatedAtaques" :key="ataque.move.name" class="pokemon-attack-row">
              <td class="pokemon-attack-name">{{ capitalizarNome(ataque.move.name) }}</td>
            </tr>
          </template>
        </v-table>

        <!-- Adicionar a paginação após a tabela --> 
        <v-pagination v-if="pokemon" v-model="currentPage" :length="totalPages" @input="changePage" class="pokemon-pagination" /> 
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="d-flex align-center justify-center fill-height">
    <v-progress-circular :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<script>
//TODO: CORRIGIR PAGINAÇÃO
import { getPkmnDetails } from '@/services/pokeapiService.js';
import HeaderPokedex from '@/components/HeaderPokedex.vue';

export default {
  components: {
    'header-pokedex': HeaderPokedex
  },
  data() {
    return {
      pokemon: null,
      loading: true,
      currentPage: 1,
      itemsPerPage: 10, 
    };
  },
  created() {
    this.fetchPokemonDetails();
  },
  computed: {
    totalPages() {
      if (!this.pokemon || !this.pokemon.ataques) return 0;
      return Math.ceil(this.pokemon.ataques.length / this.itemsPerPage) || 0;
    },
    paginatedAtaques() {
      if (!this.pokemon || !this.pokemon.ataques) return [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.pokemon.ataques.slice(startIndex, endIndex) || [];
    },
  },
  methods: {
    async fetchPokemonDetails() {
      try {
        const pokemonId = this.$route.params.id;
        const pokemonDetails = await getPkmnDetails(pokemonId);
        this.pokemon = pokemonDetails;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    capitalizarNome(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    },
    formatarTipos(tipos) {
      return tipos.map((tipo) => this.capitalizarNome(tipo.type.name)).join(', ');
    },
    formatarHabilidades(habilidades) {
      return habilidades.map((habilidade) => this.capitalizarNome(habilidade.ability.name)).join(', ');
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.pokemon-container {
  padding: 20px;
}

.pokemon-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 10px;
}

.pokemon-name {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.pokemon-info {
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
}

.pokemon-stat {
  margin-bottom: 15px;
}

.pokemon-stat-name {
  font-size: 16px;
  font-weight: bold;
  color: #777;
}

.pokemon-stat-bar {
  background-color: #f0f0f0;
  border-radius: 5px;
}

.pokemon-divider {
  margin: 20px 0;
}

.pokemon-attacks-table {
  width: 100%;
}

.pokemon-attack-header {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.pokemon-attack-row {
  cursor: pointer;
}

.pokemon-attack-row:hover {
  background-color: #f0f0f0;
}

.pokemon-attack-name {
  font-size: 16px;
  font-weight: bold;
  color: #444;
}

.pokemon-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
