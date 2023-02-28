import React from "react";
import { trpc } from '../utils/trpc';

type PokemonCompProps = {
  json: string;
  number: number;
};

const Pokecompteam: React.FC<PokemonCompProps> = ({ json, number }) => {
    const parsedJson = json ? JSON.parse(json) : {};
    const pokemonData = parsedJson[number] || {};
    const evs = pokemonData.evs || {};
    // const ivs = pokemonData.ivs || {};
    const moves = pokemonData.moves || {};
  
    const pokemon = pokemonData.pokemon;
    const sprite = pokemon ? trpc.signup.getPokemonData.useQuery({ pokemon }) : null;
  
    const capitalize = (s: string) => {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    };
  
    const pokemonName = pokemonData.pokemon ? capitalize(pokemonData.pokemon) : '';
    const pokemonItem = pokemonData.item
      ? pokemonData.item.split("-").map(capitalize).join(" ")
      : '';
    const pokemonAbility = pokemonData.ability
      ? pokemonData.ability.split("-").map(capitalize).join(" ")
      : '';
    const pokemonLevel = pokemonData.level ? pokemonData.level : '';
    // const pokemonTeratype = pokemonData.teratype ? capitalize(pokemonData.teratype) : '';
    const pokemonNature = pokemonData.nature ? capitalize(pokemonData.nature) : '';
    const pokemonMoveOne = moves["1"]
      ? moves["1"].split(" ").map(capitalize).join(" ").replace("- ", "")
      : '';
    const pokemonMoveTwo = moves["2"]
      ? moves["2"].split(" ").map(capitalize).join(" ").replace("- ", "")
      : '';
    const pokemonMoveThree = moves["3"]
      ? moves["3"].split(" ").map(capitalize).join(" ").replace("- ", "")
      : '';
    const pokemonMoveFour = moves["4"]
      ? moves["4"].split(" ").map(capitalize).join(" ").replace("- ", "")
      : '';
  
    // if (sprite && sprite.data) {
    //   console.log(sprite.data);
    // }

  return (
    <div className="flex flex-col items-center justify-center w-1/3 h-[100%] text-neutral-500 ">
        <div className="flex items-center justify-center w-[100%] h-[100%]">
            <div className="w-[100%] h-[100%] border-neutral-500 border-solid border-[2px]">
                {sprite && sprite.data && (
                <img className="w-[100%] h-[100%] bg-no-repeat bg-cover" id="pokemon-sprite" src={sprite.data}/>)}
            </div>
        </div>
    </div>
  );
};

export default Pokecompteam;
