<script>
  import Pokedex from './components/Pokedex-Dataset.vue';
  export default {
    data: () => ({
      teamSize: 6,
      currentTeamList: [],
      regionFilters: [],
      typeFitlers: [],
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
      },
      choosePokemonByType: function(type) {
        console.log(`looking for ${type} types`);
        const typedPokemon = this.pokedex.filter(function(mon) {
          return mon.types[0]?.type?.name === type || mon.types[1]?.type?.name === type;
        });
        console.log(`found these for ${type} types`, typedPokemon);
        return typedPokemon.length ? typedPokemon[Math.floor(Math.random() * typedPokemon.length)] : {};
      },
      // TODO: Probably supposed to be a component with a slot? Need to research...
      createTypeBadges: function(types) {
        types = Array.isArray(types) ? types : [];
        let template = '';
        types.forEach(function(type) {
          template += `<span class="type_${type.type.name}">${type.type.name}</span>`;
        })
        return template;
      },
      generateTeam: function() {
        let n;
        this.currentTeamList = [];
        // TODO: make the type filters pre-filter the list so we don't pick missing types
        // TODO: change this to do/while and increment when we're sure we found a matching type (they can turn off types)
        for(var a=0; a < this.teamSize; a++) {
          n = Math.floor(Math.random() * this.typeList.length);
          let newChoice = this.choosePokemonByType(this.typeList[n]);
          let currentTeammate = this.currentTeamList.find(function(mon) { return mon.name === newChoice.name });
          if (newChoice) {
            if (currentTeammate) {
              console.log(`Skipping ${ newChoice.name} - they are already on the team!`);
            } else {
              this.currentTeamList.push(newChoice);
            }
          }
        }
        console.log('chosen team', this.currentTeamList);
      }
    },
    created() {
      console.log('Created', this.pokedex);
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
  <Suspense>
    <Pokedex />
    <!-- add spinning pokeball icon here? -->
    <template v-slot:fallback>
      Loading Pokedex...
    </template>
  </Suspense>
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

    <button @click="generateTeam">Generate Pokemon Team</button>

    <p v-if="!currentTeamList.length">No team generated yet.</p>
    <ul v-else>
      <!-- make this a "slot" for a card? -->
      <li v-for="(member, index) in currentTeamList" :key="`member-${index}`">{{ this.capitalize(member?.name) }} {{ this.createTypeBadges(member?.types) }}  <img class="sprite-image" :src="member?.sprites?.front_default" /></li>
    </ul>
  </main>
</template>

<style scoped>
</style>
