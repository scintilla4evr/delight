import keys from "./templates/keys"
import { ChromaRect, ChromaRegion } from "./region"
import { ChromaDevice } from "./device"

export enum ChromaEntityGroup {
    unknown = 0x0000,

    key = 0x1000,

    alnumKey = 0x1010,
    numberKey = 0x1011,
    letterKey = 0x1012,

    symbolKey = 0x1020,
    bracketKey = 0x1021,

    numpadKey = 0x1040,
    numpadDigitKey = 0x1041,
    numpadActionKey = 0x1042,

    modifierKey = 0x1080,
    modifierKeyLeft = 0x1081,
    modifierKeyRight = 0x1082,

    functionKey = 0x1100,
    lockKey = 0x1200,
    navigationKey = 0x1400,
    arrowKey = 0x1401,
    editingKey = 0x1800
}

export type ChromaEntityTemplate = {
    group: ChromaEntityGroup
    id: string
    name: string
    display?: string
}

export class ChromaEntity {
    public template: ChromaEntityTemplate
    public physicalDimensions: ChromaRect = null

    constructor(
        public id: string,
        public arrayX: number,
        public arrayY: number,
        public ledPositionX: number,
        public ledPositionY: number
    ) {
        this.template = entityTemplates.find(
            e => e.id === id
        )
    }

    belongs(group: ChromaEntityGroup) {
        return (this.template.group & group) === group
    }

    getPreviewDOM(device: ChromaDevice): HTMLDivElement {
        const div = document.createElement("div")
        div.classList.add("entityPreview")

        if (this.template.display)
            div.textContent = this.template.display

        if (this.physicalDimensions) {
            div.style.left = `${this.physicalDimensions.left - device.dimensions.left}px`
            div.style.top = `${this.physicalDimensions.top - device.dimensions.top}px`
            div.style.width = `${this.physicalDimensions.width}px`
            div.style.height = `${this.physicalDimensions.height}px`
        } else {
            div.classList.add("dimensionless")

            div.style.left = `${this.ledPositionX}px`
            div.style.top = `${this.ledPositionY}px`
        }

        return div
    }

    getVirtualPosition(region: ChromaRegion) {
        let x: number, y: number

        if (region.apiBounds.width === 0)
            x = 0
        else
            x = (this.arrayX - region.apiBounds.left) / region.apiBounds.width

        if (region.apiBounds.height === 0)
            y = 0
        else
            y = (this.arrayY - region.apiBounds.top) / region.apiBounds.height
        
        return {
            x, y
        }
    }
    
    getPhysicalPosition(region: ChromaRegion) {
        let x: number, y: number

        if (region.physicalBounds.width === 0)
            x = 0
        else
            x = (this.ledPositionX - region.physicalBounds.left) / region.physicalBounds.width

        if (region.physicalBounds.height === 0)
            y = 0
        else
            y = (this.ledPositionY - region.physicalBounds.top) / region.physicalBounds.height
        
        return {
            x, y
        }
    }
}

export const entityTemplates: ChromaEntityTemplate[] = [
    ...keys
]