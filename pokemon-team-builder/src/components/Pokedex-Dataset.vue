<script>
  export default {
    data: () => ({
      currentTeamList: [],
      pokedex: [],
      teamSize: 6,
      regionFilters: [],
      typeFilters: []
    }),
    methods: {
      choosePokemonByType: function(type) {
        console.log(`looking for ${type} types`);
        const typedPokemon = pokedex.filter(function(mon) {
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
      async fetchPokedex() {
          const initialRecord = {count: 5}; // for debugging until we get the caching stored
          //const initialRecord = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1', { cache: "force-cache" }).then((response) => response.json())
          // get the full list by the current total count
          await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${initialRecord.count}`, { cache: "force-cache" })
            .then(response => response.json())
            .then(response => {
              response.results.forEach((pokemon) => {
                // get the details for each pokemon so we can sort/filter by type, region, etc.
                fetch(`${pokemon.url}`, { cache: "force-cache" })
                  .then(details => details.json())              
                  .then((details) => {
                    this.pokedex.push(Object.assign( {}, pokemon, details));
                })
              })
            })
            .catch((err) => {
              console.error(err);
            })
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
      this.fetchPokedex();
    }
  }
</script>

<template>
  <button @click="generateTeam">Generate Pokemon Team</button>

  <p v-if="!currentTeamList.length">No team generated yet.</p>
  <ul v-else>
    <!-- make this a "slot" for a card? -->
    <li v-for="(member, index) in currentTeamList" :key="`member-${index}`">{{ this.capitalize(member?.name) }} {{ this.createTypeBadges(member?.types) }}  <img class="sprite-image" :src="member?.sprites?.front_default" /></li>
  </ul>
</template>