import { RazerOutputNode } from "../nodes/library/razer/output"
import { Context } from "../context"
import { ChromaDeviceType, init, uninit, putEffect } from "./chroma"
import { ViewerNode } from "../nodes/library/misc/viewer"
import { ColorType } from "../nodes/types/color"
import { RazerInputNode } from "../nodes/library/razer/input"
import { NumberType } from "../nodes/types/number"
import { ChromaEnvironment } from "./environment"
import { RazerPreviewNode } from "../nodes/library/razer/preview"

export class ChromaExecutor {
    private _running = false
    private context: Context

    private timeout: NodeJS.Timeout

    constructor(
        public environment: ChromaEnvironment,
        public framerate: number
    ) {}

    get running() {
        return this._running
    }

    async execute() {
        await this.context.processUniform()

        await Promise.all(
            this.context.nodes.filter(
                n => n instanceof ViewerNode
            ).map(
                n => (n as ViewerNode).handleButtonPress(null)
            )
        )

        const inputNodes = this.context.nodes.filter(
            n => n instanceof RazerInputNode
        ) as RazerInputNode[]
        const outputNodes = this.context.nodes.filter(
            n => n instanceof RazerOutputNode
        ) as RazerOutputNode[]
        const previewNodes = this.context.nodes.filter(
            n => n instanceof RazerPreviewNode
        ) as RazerPreviewNode[]

        const outputArrays: {
            [p: string]: number[][]
        } = {
            "keyboard": Array(6).fill(0).map(
                x => Array(22).fill(0)
            )
        }

        previewNodes.forEach(n => n.resetPreview())

        for (let output of outputNodes) {
            const target: number[][] = outputArrays[
                output.device.type as ChromaDeviceType
            ]

            for (let entity of output.region.entities) {
                this.context.resetProcessing()

                inputNodes.forEach(
                    n => n.update(output.region, entity)
                )

                await output.process()

                const color = await output.getInput("color") as ColorType

                target[entity.arrayY][entity.arrayX] = color.value.toBGRInt()

                previewNodes.forEach(
                    n => {
                        if (n.device === output.device)
                            n.updateEntity(entity, color.value)
                    }
                )                
            }
        }

        Object.keys(outputArrays).forEach(devType => {
            putEffect(
                devType as ChromaDeviceType,
                "CHROMA_CUSTOM",
                outputArrays[devType]
            )
        })

        this.context.uniforms.frame++
        this.context.uniforms.time += 1 / this.framerate

        this.timeout = setTimeout(
            () => this.execute(),
            1000 / this.framerate
        )
    }

    startExecution(context: Context) {
        init([
            ChromaDeviceType.keyboard
        ]).then((enabled) => {
            if (!enabled) return

            this.context = context

            this._running = true

            setTimeout(() => {
                this.execute()
            }, 100)
        })
    }

    stopExecution() {
        if (!this._running) return

        uninit().then(() => {
            this.context = null
            this._running = false

            clearTimeout(this.timeout)
            this.timeout = null
        })
    }
}