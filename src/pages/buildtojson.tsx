function BuildToJson(build: string): string {
  const lines: string[] = build.split('\n')
  const json: { [key: string]: any } = {}
  let currentPokeIndex: number | null = null

  for (const line of lines) {
    if (!line) continue
    if (line.includes('@')) {
      const [pokemon, item]: (string | undefined)[] = line.split('@').map(e => e.trim())
      if (!pokemon) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      currentPokeIndex = Object.keys(json).length + 1
      json[currentPokeIndex] = {
        pokemon: pokemon.toLowerCase().replace("(f)", "").replace("(m)", ""),
        item: item ? item.toLowerCase().replace(" ", "-") : undefined,
        ability: null,
        level: null,
        teratype: null,
        evs: null,
        nature: null,
        ivs: null,
        moves: {},
      }
    } else if (line.includes('Ability:')) {
      const ability: string | undefined = line.split(':')[1]?.trim()?.toLowerCase()?.replace(" ", "-")
      if (!currentPokeIndex) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      json[currentPokeIndex].ability = ability
    } else if (line.includes('Level:')) {
      const level: string | undefined = line.split(':')[1]?.trim()?.toLowerCase()
      if (!currentPokeIndex) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      json[currentPokeIndex].level = level
    } else if (line.includes('Type:')) {
      const teratype: string | undefined = line.split(':')[1]?.trim()?.toLowerCase()
      if (!currentPokeIndex) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      json[currentPokeIndex].teratype = teratype
    } else if (line.includes('EVs:')) {
      const evString: string | undefined = line.split(':')[1]?.trim()
      const evs: { [key: string]: string | undefined } = {}
      if (!evString) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      const splitEvs = evString.split(' / ')
      for (const ev of splitEvs) {
        const [value, key] = ev.trim().split(' ')
        if (key) {
          evs[key.toLowerCase()] = value
        }
      }
      if (!currentPokeIndex) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      json[currentPokeIndex].evs = evs
    } else if (line.includes('Nature')) {
      if (currentPokeIndex != null) {
        const nature = line.split(' ').filter(Boolean)[0]?.trim()?.toLowerCase()
        if (nature) {
          json[currentPokeIndex].nature = nature.split(' ')[0]
        }
      }
    } else if (line.includes('IVs:')) {
      const ivString: string | undefined = line.split(':')[1]?.trim()
      const ivs: { [key: string]: string | undefined } = {}
      if (!ivString) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      const splitIvs = ivString.split(' / ')
      for (const iv of splitIvs) {
        const [value, key] = iv.trim().split(' ')
        if (key) {
          ivs[key.toLowerCase()] = value
        }
      }
      if (!currentPokeIndex) {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
      json[currentPokeIndex].ivs = ivs
    } else if (line.trim() !== "" && !line.includes(":")) {
      const move = line.trim()
      if (json[currentPokeIndex!] && json[currentPokeIndex!].moves) {
        const moveNumber = Object.keys(json[currentPokeIndex!].moves).length + 1
        json[currentPokeIndex!].moves[moveNumber] = move
      } else {
        return JSON.stringify({ message: "invalid pokepast" }, null, 2)
      }
    } 
  }
  return JSON.stringify(json, null, 2)

}

export default BuildToJson
