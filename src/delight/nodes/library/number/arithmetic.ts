import { DelightNode, NodeCategory } from "../../node"
import { Socket, SocketType } from "../../socket"
import { IDelightType } from "../../types/type"
import { SelectType } from "../../types/select"
import { NumberType } from "../../types/number"

export class ArithmeticNode extends DelightNode {
    public static id = "number.arithmetic"
    public static listName = "Arithmetic"

    public name = "Arithmetic"
    public category: NodeCategory = NodeCategory.number
    
    public options: Socket<IDelightType>[] = [
        new Socket(
            this,
            "operation",
            "Operation",
            SocketType.option,
            new SelectType(
                [
                    {
                        id: "add",
                        name: "Add"
                    },
                    {
                        id: "sub",
                        name: "Subtract"
                    },
                    {
                        id: "mul",
                        name: "Multiply"
                    },
                    {
                        id: "div",
                        name: "Divide"
                    },
                    {
                        id: "mod",
                        name: "Modulo"
                    },
                    {
                        id: "pow",
                        name: "Power"
                    }
                ],
                "add"
            ),
            true,
            false
        )
    ]
    public inputs: Socket<IDelightType>[] = [
        new Socket(
            this,
            "num1",
            "A",
            SocketType.input,
            new NumberType(0, 0.01)
        ),
        new Socket(
            this,
            "num2",
            "B",
            SocketType.input,
            new NumberType(0, 0.01)
        )
    ]
    public outputs: Socket<IDelightType>[] = [
        new Socket(
            this,
            "result",
            "Result",
            SocketType.output,
            new NumberType(0, 0.01),
            false // Not adjustable by the user
        )
    ]
    
    async process(): Promise<void> {
        const operation = this.getOption("operation") as SelectType

        const num1 = await this.getInput("num1") as NumberType
        const num2 = await this.getInput("num2") as NumberType

        const out = this.getOutput("result") as NumberType

        let newNum = 0

        if (operation.value === "add")
            newNum = num1.value + num2.value
        else if (operation.value === "sub")
            newNum = num1.value - num2.value
        else if (operation.value === "mul")
            newNum = num1.value * num2.value
        else if (operation.value === "div")
            newNum = num1.value / num2.value
        else if (operation.value === "mod")
            newNum = num1.value % num2.value
        else if (operation.value === "pow")
            newNum = num1.value ** num2.value
        else if (operation.value === "log")
            newNum = Math.log(num1.value) / Math.log(num2.value)
        
        out.value = newNum
    }
}