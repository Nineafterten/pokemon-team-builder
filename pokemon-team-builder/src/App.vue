<script>
  export default {
    data: () => ({
      tempTypeList: [],
      tempRegionList: [],
      typeList: ['normal', 'grass', 'water', 'fire', 'electric', 'ground', 'flying', 'rock', 'bug', 'ghost', 'poison', 'fighting', 'psychic', 'ice', 'dragon', 'steel', 'dark', 'fairy'],
      regionList: ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
    }),
    methods: {
      getRandomTypes: function() {
        let n;
        this.tempTypeList = [];
        for(var a=0; a < 6; a++) {
          n = Math.floor(Math.random() * this.typeList.length);
          this.tempTypeList.push(this.typeList[n])
        }
      }
    }
  }

// TODO: https://pokeapi.co/api/v2/pokemon -> .count
// TODO https://pokeapi.co/api/v2/pokemon/1
</script>

<template>
  <header>
    <h1>Pokemon Team Builder</h1>
  </header>

  <main>
    <h2>Types</h2>
    <ol>
      <li v-for="(type, index) in typeList" :key="`type-${index}`">{{ type }}</li>
    </ol>
    <h2>Regions</h2>
    <ol>
      <li v-for="(region, index) in regionList" :key="`region-${index}`">{{ region }}</li>
    </ol>

    <button @click="getRandomTypes">Generate types</button>

    <p v-if="!tempTypeList.length">No type list generated yet.</p>
    <ul v-else>
      <li v-for="(temp, index) in tempTypeList" :key="`temp-type-${index}`">{{ temp }}</li>
    </ul>
  </main>
</template>

<style scoped>
</style>
