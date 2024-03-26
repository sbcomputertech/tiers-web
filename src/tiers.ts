import { inflateRaw, deflateRaw } from "pako"
import { z85encode, z85decode } from "./z85"
import * as names from "./names"

interface rawTier {
    e: number[], // Enemy names
    g: number[], // Enemy costs
    f: number[], // Enemy waves

    m: number[], // Modifier names
    n: number[], // Modifier levels

    w: number[], // Weapon names
    v: number[], // Weapon rarities

    l: number, // Map name
    i: number, // Difficulty number

    z: boolean // Watermark
}

export interface enemy {
    name: string,
    cost: number,
    minWave: number
}

export interface modifier {
    name: string,
    level: number
}

export interface weapon {
    name: string,
    rarity: number
}

export interface tier {
    map: string,
    difficulty: number,
    legit: boolean,

    enemies: enemy[],
    mods: modifier[],
    weapons: weapon[]
}

const shortcuts: any = {
    '!': ',"w":[',
    '@': '],"v":[',
    '$': '],"e":[',
    '%': '],"f":[',
    '&': '],"g":[',
    '*': '],"m":[',
    '#': '],"n":[',
    '^': '],"i":',
    '+': '{"l":'
}

export const encodeTier = (t: tier): string => {
    var raw: rawTier = {
        e: [], g: [], f: [], 
        m: [], n: [], 
        w: [], v: [], 
        l: names.maps.indexOf(t.map), 
        i: t.difficulty,
        z: true
    }

    t.enemies.forEach(e => {
        raw.e.push(names.enemies.indexOf(e.name))
        raw.g.push(e.cost)
        raw.f.push(e.minWave)
    })

    t.mods.forEach(m => {
        raw.m.push(names.modifiers.indexOf(m.name))
        raw.n.push(m.level)
    })

    t.weapons.forEach(w => {
        raw.w.push(names.weapons.indexOf(w.name))
        raw.v.push(w.rarity)
    })

    var json = JSON.stringify(raw)

    // We could apply the shortcut table in reverse here,
    // but because of how it works we can just ignore it :3
    // It makes this generate longer codes, but it's worth it

    var jsonBytes = new TextEncoder().encode(json)
    var deflated = deflateRaw(jsonBytes)
    return z85encode(deflated)
}

export const decodeTier = (code: string): tier | null => {
    const bytes = z85decode(code)
    if(bytes == null) return null
    const deflated = inflateRaw(bytes)
    const text = new TextDecoder().decode(deflated)

    var out = ""
    for(var i = 0; i < text.length; i++) {
        out += shortcuts[text[i]] || text[i]
    }
    var obj: rawTier = JSON.parse(out)

    var enemies: enemy[] = []
    obj.e.forEach((e: number, i: number) => enemies.push({
        name: names.enemies[e],
        cost: obj.g[i],
        minWave: obj.f[i]
    }))

    var modifiers: modifier[] = []
    obj.m.forEach((m: number, i: number) => modifiers.push({
        name: names.modifiers[m],
        level: obj.n[i]
    }))

    var weapons: weapon[] = []
    obj.w.forEach((w: number, i: number) => weapons.push({
        name: names.weapons[w],
        rarity: obj.v[i]
    }))

    return {
        map: names.maps[obj.l],
        difficulty: obj.i,
        legit: !obj.z,
        enemies: enemies,
        mods: modifiers,
        weapons: weapons
    }
}