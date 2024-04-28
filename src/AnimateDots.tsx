import {atom, RenderContext} from "axii";

export function AnimateDots({count = 3, interval = 300, style = {}}, {createElement, onCleanup}: RenderContext) {
    let current = 0
    const dotNode = atom('.')
    const id = setInterval(() => {
        current = (current + 1) % count
        dotNode('.'.repeat(current + 1))
    }, interval)

    onCleanup(() => {
        clearInterval(id)
    })

    return (
        <span>
            {dotNode}
        </span>
    )
}