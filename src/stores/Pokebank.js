import { defineStore } from 'pinia'

export const usePokeBank = defineStore('PokeBank', {
  state: () => ({
    pokedex: [],
    knownPokemonCount: 9
  }),
  actions: {
    addPokemon(pokemon) {
      let existingPokemon = this.pokedex.filter((mon) => {
        return mon.id === pokemon.id
      })
      if (!existingPokemon.length) {
        console.log('Add Pokemon:', pokemon?.name)
        this.pokedex.push(pokemon)
      }
    },
    async fetchAllPokemon() {
      //state.knownPokemonCount = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1').then((response) => response.json())
      // get the full list by the current total count
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.knownPokemonCount}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((pokemon, index) => {
            // if we don't already have this pokemon stored, fetch it now
            let alreadyStored =
              this.pokedex.filter((p) => {
                return p.id === index + 1
              }).length > 0
            if (!alreadyStored) {
              // get the details for each pokemon so we can sort/filter by type, region, etc.
              fetch(`${pokemon.url}`)
                .then((details) => details.json())
                .then((details) => {
                  this.addPokemon(Object.assign({}, pokemon, details))
                  //state.pokedex.push(Object.assign({}, pokemon, details));
                })
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getPokemonByRegion(region) {
      return Array.map(this.pokedex, { region: region })
    },
    getPokedex() {
      return this.pokedex
    },
    getKnownPokemonCount() {
      return this.knownPokemonCount
    },
    clearPokedex() {
      this.pokedex = []
    }
  }
})
