<script>
  export default {
    async setup() {
        let pokedex = [];
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
                  pokedex.push(Object.assign( {}, pokemon, details));
              })
            })
          })
          .catch((err) => {
            console.error(err);
          })
        
          return {
            pokedex
          }
    },
    created() {
      console.log('Created', this.pokedex);
    }
  }
</script>

<template>
  Pokedex Loaded.
</template>