import {Atom} from "axii";


type PositionObject = {
    clientX: number
    clientY: number
}

export const customDragMouseMoveEvent = 'customdragmousemove'

export function reactiveDragPosition(ref: HTMLElement, position: Atom<PositionObject|null>) {

    const mouseDownListener = () => {
        const mouseMoveListener = (e: MouseEvent) => {
            position({clientX: e.clientX, clientY: e.clientY})
            ref.dispatchEvent(new CustomEvent(customDragMouseMoveEvent, {detail: {clientX: e.clientX, clientY: e.clientY}}))
        }

        ref.addEventListener('mousemove', mouseMoveListener)

        ref.addEventListener('mouseup', () => {
            console.log("mouseup")
            position(null)
            ref.removeEventListener('mousemove', mouseMoveListener)
        }, {once: true})
    }

    ref.addEventListener('mousedown', mouseDownListener)

    return () => {
        ref.removeEventListener('mousedown', mouseDownListener)
    }

}

