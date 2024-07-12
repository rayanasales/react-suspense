// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

let pokemon
let pokemonError

const pokemonPromise = fetchPokemon('pikachu').then(
  pokemonData => (pokemon = pokemonData),
  error => (pokemonError = error),
)

function PokemonInfo() {
  if (pokemonError) {
    throw pokemonError
  }
  if (!pokemon) {
    throw pokemonPromise
    // a diferenca entre retornar a promise e jogar ela no throw é que o throw vai ser tratado pelo suspense do react. O suspense vai esperar a promise ser resolvida e só depois vai renderizar o componente.
    // o bom disso, é que quando a promessa se resolver, esse componente será renderizado novamente, mas dessa vez com o pokemon já carregado.
    // pokemonPromise faz a chamada para a api e retorna a promessa.
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          {/* O fallback contem o que será mostrado na tela, enquanto a promisse nao retornou nada... ainda */}
          <React.Suspense fallback={<div>Loading....</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
