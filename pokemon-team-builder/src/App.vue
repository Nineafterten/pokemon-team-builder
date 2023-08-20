<script>
  export default {
    data: () => ({
      pokedex: [],
      tempTeamLimit: 6,
      tempTypeList: [],
      tempRegionList: [],
      typeList: ['normal', 'grass', 'water', 'fire', 'electric', 'ground', 'flying', 'rock', 'bug', 'ghost', 'poison', 'fighting', 'psychic', 'ice', 'dragon', 'steel', 'dark', 'fairy'],
      regionList: ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
    }),
    methods: {
      capitalize: function(string) {
        const firstChar = string[0].toUpperCase();
        const remainder = string.slice(1);
        return firstChar + remainder;
      },
      generateTeam: function() {
        this.getRandomTypes();
      },
      getRandomTypes: function() {
        let n;
        this.tempTypeList = [];
        for(var a=0; a < this.tempTeamLimit; a++) {
          n = Math.floor(Math.random() * this.typeList.length);
          this.tempTypeList.push(this.typeList[n])
        }
      },
      filterPokemonListByType: function(type) {
        return '';
      },
      async fetchPokemon() {
        const initialRecord = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1', { cache: "force-cache" }).then((response) => response.json())
        this.pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${initialRecord.count}`, { cache: "force-cache" }).then((response) => response.json())
      }
    },
    beforeCreate() {
      console.log('Before create', this.pokedex);
    },
    created() {
      this.fetchPokemon()
      console.log('Created', this.pokedex);
    }
  }

/* NOTES
  https://pokeapi.co/api/v2/pokemon -> .count
  https://pokeapi.co/api/v2/pokemon/1

  1 - fetch the count, get the full list of names
  2 - for each pokemon, fetch the detail record on the corresponding url (cache it)
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
    <button @click="fetchPokemon">Fetch Pokemon</button>
    <div class="scroll-container">
      <pre>{{ pokedex }}</pre>
    </div>
    <h2>Team Size</h2>
    <select v-model="tempTeamLimit">
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

    <button @click="generateTeam">Generate Pokemon Team</button>

    <p v-if="!tempTypeList.length">No team generated yet.</p>
    <ul v-else>
      <li v-for="(temp, index) in tempTypeList" :key="`temp-type-${index}`">{{ this.capitalize(temp) }}</li>
    </ul>
  </main>
</template>

<style scoped>
.scroll-container {
  height: 300px;
  overflow: scroll;
  outline: 1px solid gray;
  background: #ccc;  
}
</style>
