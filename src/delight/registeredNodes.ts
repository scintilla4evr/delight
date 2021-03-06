import { DelightNodeConstructor } from "./nodes/node"
import { ColorValueNode } from "./nodes/library/color/color"
import { CombineRGBNode } from "./nodes/library/color/combineRGB"
import { NumberValueNode } from "./nodes/library/number/number"
import { RandomNumberNode } from "./nodes/library/number/random"
import { ArithmeticNode } from "./nodes/library/number/arithmetic"
import { RazerInputNode } from "./nodes/library/razer/input"
import { RazerOutputNode } from "./nodes/library/razer/output"
import { FrameNode } from "./nodes/library/time/frame"
import { TimeNode } from "./nodes/library/time/time"
import { CommentNode } from "./nodes/library/misc/comment"
import { ViewerNode } from "./nodes/library/misc/viewer"
import { ClampNode } from "./nodes/library/number/clamp"
import { MapRangeNode } from "./nodes/library/number/mapRange"
import { SeparateRGBNode } from "./nodes/library/color/separateRGB"
import { TrigNode } from "./nodes/library/number/trig"
import { LoopNode } from "./nodes/library/number/loop"
import { AudioSourceNode } from "./nodes/library/audio/source"
import { AudioPeakNode } from "./nodes/library/audio/peak"
import { AudioSampleNode } from "./nodes/library/audio/sample"
import { CompareNode } from "./nodes/library/number/compare"
import { InvertNode } from "./nodes/library/color/invert"
import { BlendNode } from "./nodes/library/color/blend"
import { RazerPreviewNode } from "./nodes/library/razer/preview"
import { CombineVectorNode } from "./nodes/library/vector/combine"
import { SeparateVectorNode } from "./nodes/library/vector/separate"
import { VectorLengthNode } from "./nodes/library/vector/length"
import { VectorScaleNode } from "./nodes/library/vector/scale"
import { VectorAngleNode } from "./nodes/library/vector/angle"
import { CombineHSLNode } from "./nodes/library/color/combineHSL"
import { VectorRotateNode } from "./nodes/library/vector/rotate"
import { VectorMathNode } from "./nodes/library/vector/math"
import { AudioPreviewNode } from "./nodes/library/audio/preview"
import { SeedRandomNumberNode } from "./nodes/library/number/seedrandom"
import { RoundingNode } from "./nodes/library/number/rounding"
import { VectorAspectCorrectNode } from "./nodes/library/vector/aspectCorrect"
import { StringValueNode } from "./nodes/library/string/string"
import { StringConcatNode } from "./nodes/library/string/concat"
import { FontConstructNode } from "./nodes/library/font/construct"
import { FontRenderNode } from "./nodes/library/font/render"

export const availableNodes: {
    [prop: string]: DelightNodeConstructor[]
} = {
    "Razer Chroma": [
        RazerInputNode,
        RazerOutputNode,
        null,
        RazerPreviewNode
    ],
    "_Sep0": [],
    "Number": [
        NumberValueNode,
        RandomNumberNode,
        SeedRandomNumberNode,
        null,
        ArithmeticNode,
        RoundingNode,
        CompareNode,
        TrigNode,
        null,
        ClampNode,
        MapRangeNode,
        LoopNode
    ],
    "Vector": [
        CombineVectorNode,
        SeparateVectorNode,
        null,
        VectorLengthNode,
        VectorAngleNode,
        null,
        VectorMathNode,
        VectorScaleNode,
        VectorRotateNode,
        null,
        VectorAspectCorrectNode
    ],
    "_Sep1": [],
    "Color": [
        ColorValueNode,
        null,
        CombineRGBNode,
        SeparateRGBNode,
        CombineHSLNode,
        null,
        BlendNode,
        InvertNode
    ],
    "_Sep2": [],
    "String": [
        StringValueNode,
        null,
        StringConcatNode
    ],
    "Font": [
        FontConstructNode,
        FontRenderNode
    ],
    "_Sep3": [],
    "Audio": [
        AudioSourceNode,
        null,
        AudioPreviewNode,
        null,
        AudioPeakNode,
        AudioSampleNode
    ],
    "_Sep4": [],
    "Time": [
        FrameNode,
        TimeNode
    ],
    "_Sep5": [],
    "Misc.": [
        CommentNode,
        ViewerNode
    ]
}

export const flatAvailableNodes = (
    Object.values(availableNodes).flat() as DelightNodeConstructor[]
).filter(nc => nc)