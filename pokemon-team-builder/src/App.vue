<script>
  import Pokedex from './components/Pokedex-Dataset.vue';
  export default {
    data: () => ({
      teamSize: 6,
      regionFilters: [],
      typeFilters: [],
      typeList: ['normal', 'grass', 'water', 'fire', 'electric', 'ground', 'flying', 'rock', 'bug', 'ghost', 'poison', 'fighting', 'psychic', 'ice', 'dragon', 'steel', 'dark', 'fairy'],
      regionList: ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
    }),
    components: {
      Pokedex
    },
    methods: {
      capitalize: function(string) {
        if (!string) { return '' }
        const firstChar = string[0].toUpperCase();
        const remainder = string.slice(1);
        return firstChar + remainder;
      }
    }
  }

/* NOTES
  1 - ensure caching and or do local storage (endpoint spamming right now for testing)
  2 - add Tailwind CSS for styling?
  3 - add 'ban' option for pokemon user doesn't like (exclusion list)
  4 - sort/filter by element type
  5 - sort/fiter by region
  6 - add exclusions for duplicates/evolutions of same type (add a "allow evolutions" toggle)
  7 - add "limit to mega evolutions" option?
  8 - build display of team
  9 - allow "save" teams; up to 10 teams generated?
*/
</script>

<template>
  <header>
    <h1>Pokemon Team Builder</h1>
  </header>
  <main>
    <h2>Team Size</h2>
    <select v-model="teamSize">
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
    </select>
    <h2>Element Types</h2>
    <ol>
      <li v-for="(type, index) in typeList" :key="`type-${index}`"><label><input type="checkbox" checked="checked" />{{ this.capitalize(type) }}</label></li>
    </ol>
    <h2>Native Regions</h2>
    <ol>
      <li v-for="(region, index) in regionList" :key="`region-${index}`"><label><input type="checkbox" checked="checked" />{{ this.capitalize(region) }}</label></li>
    </ol>
  </main>
  <Suspense>
    <Pokedex :team-size="teamSize" :region-filters="regionFilters" :type-filters="typeFilters" />
    <!-- add spinning pokeball icon here? -->
    <template v-slot:fallback>
      Loading Pokedex...
    </template>
  </Suspense>
</template>

<style scoped>
</style>
