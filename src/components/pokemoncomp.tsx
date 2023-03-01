import React from "react";
import { trpc } from '../utils/trpc';

type PokemonCompProps = {
  json: string;
  number: number;
};

const PokemonComp: React.FC<PokemonCompProps> = ({ json, number }) => {
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
    <div id="compgra" className="flex flex-col items-center justify-center w-1/3 h-[100%] text-white border-neutral-500 border-solid border-[1px]">
        <div className="flex items-center justify-center w-[100%] h-[50%]">
            <div className="w-[50%] h-[100%] border-neutral-500 border-solid border-[1px]">
                {sprite && sprite.data && (
                <img className="w-[100%] bg-no-repeat bg-cover" id="pokemon-sprite" src={sprite.data}/>)}
            </div>
            <div className="flex flex-col justify-center w-[50%] h-[100%]">
                <div className="flex flex-col justify-center w-[100%] h-[100%]" id="pokemon-infos">
                    <div className="flex items-center justify-center w-[100%] h-[20%] border-neutral-500 border-solid border-[1px]" id="pokemon-name">{pokemonName}</div>
                    <div  className="flex flex-col items-center justify-center w-[100%] h-[80%] border-neutral-500 border-solid border-[1px]" id="pokemon-informations">
                        <div className="flex items-center justify-center w-[100%] h-[20%]" id="pokemon-item">Item : {pokemonItem}</div>
                        <div className="flex items-center justify-center w-[100%] h-[20%]" id="pokemon-ability">Ability : {pokemonAbility}</div>
                        <div className="flex items-center justify-center w-[100%] h-[20%]" id="pokemon-nature">Nature : {pokemonNature}</div>
                        <div className="flex items-center justify-center w-[100%] h-[20%]" id="pokemon-level">Level : {pokemonLevel}</div>
                        {/* <div className="flex items-center justify-center w-[100%] h-[20%]" id="pokemon-teratype">Tera-Type : {pokemonTeratype}</div> */}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center w-[100%] h-[50%]">
            <div className="flex flex-col items-center justify-center w-[50%] h-[100%] border-neutral-500 border-solid border-[1px]">
                <div className="flex flex-col items-center justify-center w-[100%] h-[100%] gap-[4%]" id="pokemon-evs">
                    <div className="flex items-center justify-center w-[100%] h-[10%]">
                        <p className="flex items-center justify-center w-[15%] h-[100%] m-[5%]">HP</p>
                        <progress className="w-[70%] h-[100%] mr-[5%]" id="evs-hp" value={evs['hp']} max="252"></progress>
                    </div>
                    <div className="flex items-center justify-center w-[100%] h-[10%]">
                        <p className="flex items-center justify-center w-[15%] h-[100%] m-[5%]">ATK</p>
                        <progress className="w-[70%] h-[100%] mr-[5%]" id="evs-atk" value={evs['atk']} max="252"></progress>
                    </div>
                    <div className="flex items-center justify-center w-[100%] h-[10%]">
                        <p className="flex items-center justify-center w-[15%] h-[100%] m-[5%]">DEF</p>
                        <progress className="w-[70%] h-[100%] mr-[5%]" id="evs-def" value={evs['def']} max="252"></progress>
                    </div>
                    <div className="flex items-center justify-center w-[100%] h-[10%]">
                        <p className="flex items-center justify-center w-[15%] h-[100%] m-[5%]">SPA</p>
                        <progress className="w-[70%] h-[100%] mr-[5%]" id="evs-spa" value={evs['spa']} max="252"></progress>
                    </div>
                    <div className="flex items-center justify-center w-[100%] h-[10%]">
                        <p className="flex items-center justify-center w-[15%] h-[100%] m-[5%]">SPD</p>
                        <progress className="w-[70%] h-[100%] mr-[5%]" id="evs-spd" value={evs['spd']} max="252"></progress>
                    </div>
                    <div className="flex items-center justify-center w-[100%] h-[10%]">
                        <p className="flex items-center justify-center w-[15%] h-[100%] m-[5%]">SPE</p>
                        <progress className="w-[70%] h-[100%] mr-[5%]" id="evs-spe" value={evs['spe']} max="252"></progress>
                    </div>
                </div>
                {/* <div id="pokemon-ivs" className="flex flex-col items-center justify-center w-[50%] h-[100%]">
                    <div id="ivs-hp">{ivs["hp"]}</div>
                    <div id="ivs-atk">{ivs["atk"]}</div>
                    <div id="ivs-def">{ivs["def"]}</div>
                    <div id="ivs-spa">{ivs["spa"]}</div>
                    <div id="ivs-spd">{ivs["spd"]}</div>
                    <div id="ivs-spe">{ivs["spe"]}</div>
                </div> */}
            </div>
            <div className="flex flex-col justify-center w-[50%] h-[100%]">
                <div className="flex flex-col justify-center w-[100%] h-[100%]" id="pokemon-moves">
                    <div id="moves" className="flex items-center justify-center w-[100%] h-[25%] border-neutral-500 border-solid border-[1px]">{pokemonMoveOne}</div>
                    <div id="moves" className="flex items-center justify-center w-[100%] h-[25%] border-neutral-500 border-solid border-[1px]">{pokemonMoveTwo}</div>
                    <div id="moves" className="flex items-center justify-center w-[100%] h-[25%] border-neutral-500 border-solid border-[1px]">{pokemonMoveThree}</div>
                    <div id="moves" className="flex items-center justify-center w-[100%] h-[25%] border-neutral-500 border-solid border-[1px]">{pokemonMoveFour}</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PokemonComp;
