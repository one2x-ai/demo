import {atom, Atom, RenderContext} from "axii";
import {ShotNode} from "./Shot.js";

export type EdgeProps = {
    from: Atom<ShotNode>
    to: Atom<ShotNode>
}

export function ShotEdge({from, to}: EdgeProps, { createSVGElement: createElement, Fragment }: RenderContext) {
    const fromPosX = () => {
        return from().position().x + (from().size()?.borderBoxWidth || 0)
    }
    const fromPosY = () => {
        return from().position().y + (from().size()?.borderBoxHeight || 0) / 2
    }
    const toPosY = () => {
        return to().position().y + (to().size()?.borderBoxHeight || 0) / 2
    }

    const toPosX = () => {
        return to().position().x
    }



    const d = () => {
        const middleX = (fromPosX() + toPosX()) / 2
        const middleY = (fromPosY() + toPosY()) / 2
        const xOffset = 20
        return `M ${fromPosX()} ${fromPosY()} Q ${fromPosX()+xOffset} ${fromPosY()} ${middleX} ${middleY} T ${toPosX()} ${toPosY()}`
    }

    const hover = atom(false)

    const strokeColor = () => hover() ? '#2346f5' : 'rgba(166,166,166, 1)'

    return <>

        <path
            as='mainPath'
            stroke={strokeColor}
            strokeOpacity="1"
            fill="none"
            fillOpacity="1"
            pointerEvents="visibleStroke"
            d={d}
        />
        <path
            stroke="rgba(34,34,34, 0)"
            strokeOpacity="1"
            stroke-width={10}
            d={d}
            fill="none"
            pointerEvents="visibleStroke"
            onmouseenter={() => hover(true)}
            onmouseleave={() => hover(false)}
        />
        {() => hover() ?
            <g
                onmouseenter={() => hover(true)}
                onmouseleave={() => hover(false)}
                as="insert"
            >
                <circle
                    cx={() => (fromPosX() + toPosX()) / 2}
                    cy={() => (fromPosY() + toPosY()) / 2}
                    r={6}
                    fill={strokeColor}
                    onmouseenter={() => hover(true)}
                    onmouseleave={() => hover(false)}
                />
                <line
                    stroke={'#fff'}
                    x1={() => (fromPosX() + toPosX()) / 2 - 3}
                    y1={() => (fromPosY() + toPosY()) / 2}
                    x2={() => (fromPosX() + toPosX()) / 2 + 3}
                    y2={() => (fromPosY() + toPosY()) / 2}
                />
                <line
                    stroke={'#fff'}
                    x1={() => (fromPosX() + toPosX()) / 2}
                    y1={() => (fromPosY() + toPosY()) / 2-3}
                    x2={() => (fromPosX() + toPosX()) / 2}
                    y2={() => (fromPosY() + toPosY()) / 2+3}
                />
            </g>

            : null
        }
        <circle as='fromDot' cx={() => fromPosX() + 3} cy={fromPosY} r={3} fill={strokeColor}/>
        <circle as='toDot' cx={() => toPosX() - 3} cy={toPosY} r={3} fill={strokeColor}/>
    </>
}

export type ShotEdgeNode = {
    id: string,
    from: Atom<ShotNode>
    to: Atom<ShotNode>
}