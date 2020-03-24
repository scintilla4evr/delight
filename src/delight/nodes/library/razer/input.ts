import { DelightNode, NodeCategory } from "../../node"
import { Socket, SocketType } from "../../socket"
import { IDelightType } from "../../types/type"
import { NumberType } from "../../types/number"
import { SelectType } from "../../types/select"
import { ColorType } from "../../types/color"

export class RazerInputNode extends DelightNode {
    public static id = "razer.input"
    public static listName = "Chroma Input"

    public name = "Chroma Input"
    public category: NodeCategory = NodeCategory.razer

    public outputs: Socket<IDelightType>[] = [
        new Socket(
            this,
            "x", "X position",
            SocketType.output,
            new NumberType(),
            false
        ),
        new Socket(
            this,
            "y", "Y position",
            SocketType.output,
            new NumberType(),
            false
        )
    ]
}