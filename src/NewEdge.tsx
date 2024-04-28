import {Atom, RenderContext} from "axii";

export type NewEdgeProps = {
    x1: Atom<number>|(() => number)
    y1: Atom<number>|(() => number)
    x2: Atom<number>|(() => number)
    y2: Atom<number>|(() => number)
}

export function NewEdge({x1,x2,y1,y2}: NewEdgeProps, { createSVGElement: createElement }: RenderContext) {

    const style = () => ({
        width: Math.max(x2(), x1()) +10,
        height: Math.max(y2(), y1())+ 10,
        maxWidth: '100%',
        maxHeight: '100%',
    })

    return <svg style={style}>
        <circle cx={() => x1() + 2} cy={y1} r={2} fill="#F2880E"/>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F2880E"/>
        <circle cx={() => x2() + 2} cy={y2} r={2} fill="#F2880E"/>

    </svg>
}
