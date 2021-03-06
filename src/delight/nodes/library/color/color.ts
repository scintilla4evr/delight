import { DelightNode, NodeCategory } from "../../node"
import { Socket, SocketType } from "../../socket"
import { IDelightType } from "../../types/type"
import { ColorType } from "../../types/color"

export class ColorValueNode extends DelightNode {
    public static id = "color.color"
    public static listName = "Color"

    public name = "Color"
    public category: NodeCategory = NodeCategory.color

    public outputs: Socket<IDelightType>[] = [
        new Socket(
            this,
            "color", "Color",
            SocketType.output,
            new ColorType(),
            true, false
        )
    ]
}