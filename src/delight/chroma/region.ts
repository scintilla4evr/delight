import { ChromaEntity } from "./entities"
import { ChromaDevice } from "./device"

export type ChromaRect = {
    left: number
    top: number
    right: number
    bottom: number,
    width: number,
    height: number
}

export function findBoundingRect<T>(
    items: T[],
    coordinates: (item: T) => number[]
): ChromaRect {
    let left = Infinity
    let top = Infinity
    let right = -Infinity
    let bottom = -Infinity

    items.forEach(item => {
        const co = coordinates(item)

        left = Math.min(co[0], left)
        top = Math.min(co[1], top)
        right = Math.max(co[0], right)
        bottom = Math.max(co[1], bottom)
    })

    return {
        left, top, right, bottom,
        width: right - left,
        height: bottom - top
    }
}

export class ChromaRegion {
    public apiBounds: ChromaRect
    public physicalBounds: ChromaRect

    constructor(
        public device: ChromaDevice,
        public name: string,
        public entities: ChromaEntity[]
    ) {
        this.apiBounds = findBoundingRect(
            entities, (ent: ChromaEntity) => [ent.arrayX, ent.arrayY]
        )
        this.physicalBounds = findBoundingRect(
            entities, (ent: ChromaEntity) => [ent.ledPositionX, ent.ledPositionY]
        )
    }
}