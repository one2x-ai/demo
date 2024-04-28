import {Atom, autorun} from "axii";


type PositionObject = {
    clientX: number
    clientY: number,
    offsetX: number,
    offsetY: number
}

export function reactiveMousePosition(ref: HTMLElement, position: Atom<PositionObject|null>, shouldRecord: Atom<any>) {
    const mouseMoveListener = (e: MouseEvent) => {
        position({
            clientX: e.clientX,
            clientY: e.clientY,
            offsetX: e.offsetX,
            offsetY: e.offsetY
        })
    }

    const stopAutorun = autorun(() => {
        if(shouldRecord()) {
            ref.addEventListener('mousemove', mouseMoveListener)
        } else {
            ref.removeEventListener('mousemove', mouseMoveListener)
            position(null)
        }
    })

    return () => {
        ref.removeEventListener('mousemove', mouseMoveListener)
        stopAutorun()
        position(null)
    }

}

