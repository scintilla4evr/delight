import { Socket } from "./socket"
import { Context } from "../context"
import { IDelightType } from "./types/type"

import "../styles/node.scss"

export enum NodeCategory {
    general
}

export class DelightNode {
    public id = "gen.blankNode"

    public name = "Node"
    public category: NodeCategory = NodeCategory.general

    // Do not touch this! This will be handled by the Context
    public processed = false

    public locked = false
    
    public inputs: Socket<IDelightType>[] = []
    public outputs: Socket<IDelightType>[] = []
    public options: Socket<IDelightType>[] = []

    public domElement: HTMLDivElement

    public xPosition = 0
    public yPosition = 0

    constructor(
        public context: Context
    ) {}

    setPosition(x: number, y: number) {
        this.xPosition = x
        this.yPosition = y

        this.domElement.style.left = `${x}px`
        this.domElement.style.top = `${y}px`
    }

    move(dX: number, dY: number) {
        this.setPosition(
            this.xPosition + dX,
            this.yPosition + dY
        )
    }

    getInputSocket(id: string): Socket<IDelightType> {
        return this.inputs.find(s => s.id === id)
    }

    getOutputSocket(id: string): Socket<IDelightType> {
        return this.outputs.find(s => s.id === id)
    }
    
    async getInput(id: string, ctx: Context): Promise<IDelightType> {
        const socket = this.getInputSocket(id)
        if (!socket) throw "what the fuck"

        const connValue = await ctx.getConnectionValue(this, socket)
        if (connValue !== null) return connValue
        
        return socket.value
    }

    async process(): Promise<void> {}

    createDOM() {
        const node = document.createElement("div")
        node.classList.add("node")

        const header = document.createElement("header")
        header.classList.add("nodeHeader")

        const icon = document.createElement("img")
        icon.src = "../../design/icons/blank.svg"
        header.appendChild(icon)
        
        const name = document.createElement("p")
        name.textContent = this.name
        header.appendChild(name)

        node.appendChild(header)

        const inputs = document.createElement("div")
        inputs.classList.add("inputs")

        this.inputs.forEach(input => {
            inputs.appendChild(input.domElement)
        })

        node.appendChild(inputs)

        const outputs = document.createElement("div")
        outputs.classList.add("outputs")

        this.outputs.forEach(output => {
            outputs.appendChild(output.domElement)
        })

        node.appendChild(outputs)

        node.addEventListener("click", () => this.context.currentNode = this)

        this.domElement = node
    }
}