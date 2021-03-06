import { DelightNode, NodeCategory } from "../../node"
import { Socket, SocketType } from "../../socket"
import { IDelightType, NullType } from "../../types/type"
import { CommentType } from "../../types/comment"
import { NumberType } from "../../types/number"
import { BoundedNumberType } from "../../types/boundedNumber"
import { ButtonType } from "../../types/button"
import { ColorType } from "../../types/color"
import { FFTType } from "../../types/fft"
import { VectorType } from "../../types/vector"
import { StringType } from "../../types/string"
import { GlyphsType } from "../../types/glyphs"

export class ViewerNode extends DelightNode {
    public static id = "misc.viewer"
    public static listName = "Viewer"

    public name = "Viewer"
    public category: NodeCategory = NodeCategory.comment
    
    public options: Socket<IDelightType>[] = [        
        new Socket(
            this, "eval", "Evaluate",
            SocketType.option,
            new ButtonType(
                "Evaluate",
                (btn) => this.handleButtonPress(btn)
            ),
            true, false
        ),
        new Socket(
            this, "display", "",
            SocketType.option,
            new CommentType(
                "null",
                false
            ),
            true, false
        )
    ]

    public inputs: Socket<IDelightType>[] = [
        new Socket(
            this, "value", "Value",
            SocketType.input,
            new NullType() as IDelightType,
            false, true,
            true
        )
    ]

    async handleButtonPress(btn: ButtonType) {
        this.context.resetProcessing()

        const value = await this.getInput("value")
        let outStr = ""

        if (
            value instanceof NullType
        ) {
            outStr = "null"
        } else if (
            value instanceof NumberType ||
            value instanceof BoundedNumberType ||
            value instanceof StringType
        ) {
            outStr = value.value.toString()
        } else if (
            value instanceof ColorType
        ) {
            outStr = `R: ${value.value.r}\nG: ${value.value.g}\nB: ${value.value.b}\nBGR: ${value.value.toBGRInt()}`
        } else if (
            value instanceof VectorType
        ) {
            outStr = `X: ${value.value.x}\nY: ${value.value.y}`
        } else if (
            value instanceof FFTType
        ) {
            outStr = `FFT[${value.length}]`
        } else if (
            value instanceof GlyphsType
        ) {
            outStr = value.value.toString()
        }

        const option = this.getOption("display") as CommentType
        option.value = outStr

        this.context.updateConnectionsCanvas()
    }
}