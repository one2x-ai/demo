import {Atom, atom, onLeftMouseDown, reactiveSize, RenderContext, RxList, RxMap, withStopPropagation} from "axii";
import {Shot, ShotNode} from "./Shot.js";
import {ShotEdge, ShotEdgeNode} from "./ShotEdge.js";
import {reactiveDragPosition} from "./reactiveDragPosition.js";
import {reactiveMousePosition} from "./reactiveMousePosition.js";
import {NewEdge} from "./NewEdge.js";
import {colors, gaps} from "../lib/style.js";
import {NewShot} from "./NewShot.js";
import {EdgeData, edges as edgesData, ShotData, shots as shotsData} from './data/shot.js'


type StageProps = {
    scale: Atom<number>
}


const GAP_WIDTH = 150

export function Stage({ scale }: StageProps, {createElement, createStateFromRef, createRef, createPortal, createSVGElement}: RenderContext) {

    const mapToShotNode = (shot: ShotData) => ({
        id: shot.id,
        label: atom(shot.label||''),
        name: atom(shot.name||''),
        description: atom(shot.description||''),
        type: atom(shot.type||''),
        cover:atom(shot.cover||''),
        position: atom(shot.position),
        size: createStateFromRef(reactiveSize)
    })

    const shotsById = new RxMap<string, ShotNode>(
        shotsData.map((shot: ShotData) => [shot.id, mapToShotNode(shot)])
    )


    const rawEdgesById = new RxMap<string, ShotEdgeNode>(
        edgesData.map((edge: EdgeData) => [edge.id, {
            ...edge,
            from: atom(shotsById.get(edge.from)!),
            to: atom(shotsById.get(edge.to)!)
        }]))


    const rootRef = createRef()


    const draggingShot = atom<ShotNode | null>(null)
    const dragStartOffset = atom<{x: number, y: number} | null>(null)

    const dragPosition = createStateFromRef(reactiveDragPosition)

    const newEdgeStartShot = atom<ShotNode>(null)
    const newEdgePropX1 = () => {
        return (newEdgeStartShot()?.position()?.x || 0)
            + (newEdgeStartShot()?.size()?.borderBoxWidth || 0)
    }

    const newEdgePropY1 = () => {
        return (newEdgeStartShot()?.position()?.y || 0)
            + (newEdgeStartShot()?.size()?.borderBoxHeight || 0) / 2
    }

    const newEdgePropX2 = () => {
        return connectingMousePosition()?.clientX ?
            (connectingMousePosition()?.clientX! - rootRef.current.getBoundingClientRect().left) :
            newEdgePropX1()
    }

    const newEdgePropY2 = () => {
        return connectingMousePosition()?.clientY ?
            (connectingMousePosition()?.clientY! - rootRef.current.getBoundingClientRect().top) :
            newEdgePropY1()
    }

    const connectingMousePosition = createStateFromRef(reactiveMousePosition, newEdgeStartShot)
    const startConnect = (shot: ShotNode) => {
        newEdgeStartShot(shot)
    }

    const endConnect = (shot: ShotNode) => {
        const newEdge: ShotEdgeNode = {
            id: rawEdgesById.size() + 1,
            from: atom(shotsById.get(newEdgeStartShot()!.id)!),
            to: atom(shotsById.get(shot.id)!)
        }

        rawEdgesById.set(newEdge.id, newEdge)
        newEdgeStartShot(null)
    }

    const addShotBetween = (edge: ShotEdgeNode) => {
        const nextSiblingShots = new Set<ShotNode>()
        getSiblingEdgesAndShots(edge.from(), new Set(), new Set(), nextSiblingShots, true)

        const cardWidth = edge.from()!.size()!.borderBoxWidth

        const newId = addNewShot({
            x: edge.from()!.position().x + GAP_WIDTH + cardWidth,
            y: edge.from()!.position().y
        })

        const newEdgeId = rawEdgesById.size() + 1
        rawEdgesById.set(newEdgeId, {
            id: newEdgeId,
            from: atom(shotsById.get(edge.from()!.id)!),
            to: atom(shotsById.get(newId)!)
        })

        // 修改该原来的 edge 的 from 指向 new
        edge.from(shotsById.get(newId)!)

        // 修改所有 nextSiblingShots 的 position
        nextSiblingShots.forEach(shot => {
            shot.position({
                x: shot.position().x + GAP_WIDTH + cardWidth,
                y: shot.position().y
            })
        })

    }

    const onRepositionShot = () => {
        const shot = draggingShot()!
        if (!shot) return

        shot.position({
            x: dragPosition()!.clientX - dragStartOffset()!.x,
            y: dragPosition()!.clientY - dragStartOffset()!.y
        })
    }

    const lastContextMenuEvent = atom<MouseEvent | null>(null)

    const contextMenuStyle = () => ({
        color: '#fff',
        position:'absolute',
        top: lastContextMenuEvent()?.clientY|| 0,
        left: lastContextMenuEvent()?.clientX || 0,
        background: colors.inputBg,
        borderRadius: 4,
        overflow: 'hidden',
    })
    const contextMenuItemStyle= {
        padding: `${gaps.medium}px ${gaps.medium}px`,
        cursor: 'pointer',
        '&:hover': {
            background: colors.primaryBlue,
        }
    }



    const addSingleShot = () => addNewShot()

    const addNewShot = (position?: ShotData['position']) => {
        const newId = shotsById.size() + 1

        shotsById.set(newId, mapToShotNode({
            id: newId,
            position: position || {
                x: lastContextMenuEvent()!.clientX - rootRef.current.getBoundingClientRect().left,
                y: lastContextMenuEvent()!.clientY - rootRef.current.getBoundingClientRect().top
            },
        }))
        return newId
    }

    const addContinuationShot = () => {
        const newNodeId = addNewShot()
        const newEdgeId = rawEdgesById.size() + 1
        const fromShotId = selectedShot()!.id

        rawEdgesById.set(newEdgeId, {
            id: newEdgeId,
            from: atom(shotsById.get(fromShotId)!),
            to: atom(shotsById.get(newNodeId)!)
        })
    }
    // TODO container 应该改成和外部的约定？
    const contextMenu = createPortal(() => (
        <div
            style={{position:'absolute', top:0, left:0, height:'100%', width:'100%', background:'transparent', zIndex:'999'}}
            onClick={[() => lastContextMenuEvent(null)]}
        >
            <div style={contextMenuStyle}>
                <div style={{fontSize:12, padding: `${gaps.small}px ${gaps.medium}px`}}>new</div>
                <div >
                    <div style={contextMenuItemStyle} onClick={addSingleShot}>Single shot</div>
                    {() => selectedShot() ? <div style={contextMenuItemStyle} onClick={addContinuationShot}>Continuation shot</div> : null}
                </div>

            </div>
        </div>
    ), document.body)

    const onContextMenu = (e:MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        lastContextMenuEvent(e)
        return false
    }

    const onResize = (e:any) => {
        // if (!e.ctrlKey) return
        // if (e.deltaY < 0) {
        //     scale(scale() + 0.05)
        // } else {
        //     scale(scale() - 0.05)
        // }
        // e.preventDefault()
    }

    const canvasSizeStyle = () => {
        const maxX = Math.max(...shotsById.values().data.map(shot => shot.position().x + (shot.size()?.borderBoxWidth||0)))
        const maxY = Math.max(...shotsById.values().data.map(shot => shot.position().y + (shot.size()?.borderBoxHeight||0)))
        return ({
            width: maxX + GAP_WIDTH + 500,
            height: maxY + 500,
        })
    }

    const canvasStyle = () => {
        return ({
            position: 'relative',
            minWidth: '100%',
            minHeight: '100%',
            ...canvasSizeStyle(),
            overflow: 'auto',
            backgroundImage:`radial-gradient(circle at 2px 2px, #222 2px,transparent 0)`,
            backgroundSize:'30px 30px,30px 30px',
            userSelect: 'none',
        })
    }


    const elementContainerStyle = () => ({
        transform:`scale(${scale()})`,
        height: '100%',
        width: '100%',
    })

    const selectedShot = atom<ShotNode|null>(null)
    const shotsWithSelected = shotsById.values().createSelection(selectedShot)

    const edgesGroupByFromId = rawEdgesById.values().groupBy(edge => edge.from().id)
    const edgesGroupByToId = rawEdgesById.values().groupBy(edge => edge.to().id)

    const getSiblingEdgesAndShots = (shot: ShotNode, visited: Set<ShotNode>, edges:Set<ShotEdgeNode>, shots:Set<ShotNode> = new Set(), next = false) => {
        const connectedShot = [shot]

        while(connectedShot.length) {
            const currentShot = connectedShot.shift()!
            visited.add(currentShot)
            const toEdges = next ? edgesGroupByFromId.get(currentShot.id) : edgesGroupByToId.get(currentShot.id)
            if (toEdges) {
                toEdges.forEach(edge => {
                    edges.add(edge)
                    shots.add(next ? edge.to() : edge.from())

                    if (!visited.has(next ? edge.to() : edge.from())) {
                        connectedShot.push(next ? edge.to() : edge.from())
                    }
                })
            }
        }
    }

    const highlightedEdges = new RxList<ShotEdgeNode>(null, () => {
        if (!selectedShot()) return []
        const visited = new Set<ShotNode>()
        const edges = new Set<ShotEdgeNode>()
        // 往 to 的方向找
        getSiblingEdgesAndShots(selectedShot()!, visited, edges, new Set(),true)

        // 往 from 的方向找
        getSiblingEdgesAndShots(selectedShot()!, visited, edges)
        return Array.from(edges)
    })

    const edgesWithHighlighted = rawEdgesById.values().createSelection(highlightedEdges)

    return <div
        style={canvasStyle}
        oncontextmenu={onContextMenu}
        onwheel={onResize}
        ref={[rootRef, dragPosition.ref, connectingMousePosition.ref]} onCustomDragMouseMove={onRepositionShot}
        onClick={() => selectedShot(null)}
        onmouseup={()=>newEdgeStartShot(null)}
    >
        <div style={elementContainerStyle}>
            {() => newEdgeStartShot() ?
                <div style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}>
                    <NewEdge
                        x1={newEdgePropX1}
                        y1={newEdgePropY1}
                        x2={newEdgePropX2}
                        y2={newEdgePropY2}
                    />
                </div> : null
            }
            <div style={{position: 'absolute', top: 0, left: 0, zIndex: 1, width:'100%', minHeight:'100%'}}>
                {createSVGElement('svg', {style:canvasSizeStyle}, edgesWithHighlighted.map(([edge, highlighted]) => {
                    return <ShotEdge
                        from={edge.from}
                        to={edge.to}
                        $insert:onClick={() => addShotBetween(edge)}
                        $mainPath:stroke_={(originStroke:any) => () => (highlighted() ? colors.primaryBlue : originStroke() )}
                        $toDot:fill_={(origin:any) => () => (highlighted() ? colors.primaryBlue : origin())}
                        $fromDot:fill_={(origin:any) => () => (highlighted() ? colors.primaryBlue : origin())}
                    />
                }))}
            </div>

            {shotsWithSelected.map(([shot, selected]) => {
                return () => {
                    if(shot.type()) {
                        return (
                            <Shot
                                shot={shot}
                                lineZoneWidth={10}
                                $main:onmousedown={[
                                    onLeftMouseDown(() => draggingShot(shot)),
                                    onLeftMouseDown((e:MouseEvent) => dragStartOffset({x: e.clientX - shot.position().x, y: e.clientY - shot.position().y}))
                                ]}
                                $main:onmouseup={onLeftMouseDown(() => draggingShot(null))}
                                $main:onClick={[withStopPropagation(() => selectedShot(shot))]}
                                $leftConnectZone:onmouseup={withStopPropagation(() => endConnect(shot))}
                                $rightConnectZone:onmouseup={withStopPropagation(onLeftMouseDown(() => startConnect(shot)))}
                                $main:style={() => ({ border: `1px solid ${selected() ? colors.primaryBlue : colors.innerBorder}` })}
                            />
                        )
                    }

                    const shotType = atom<string>('video')
                    const shotTypeOptions = ['video', 'mv']
                    const template = atom<string>('template1')
                    const templateOptions = ['template1', 'template2']
                    const prompt = atom<string>('')

                    const generating = atom(false)
                    const onConfirm = () => {
                        generating(true)
                        setTimeout(() => {
                            generating(false)
                            shot.type(shotType)
                            shot.label('new shot')
                            shot.description('new shot description')
                            shot.name('D-1')
                            shot.cover('/image.png')
                        }, 1000)
                    }

                    return <NewShot
                        shot={shot}
                        lineZoneWidth={10}
                        shotType={shotType}
                        shotTypeOptions={shotTypeOptions}
                        template={template}
                        prompt={prompt}
                        generating={generating}
                        templateOptions={templateOptions}
                        $leftConnectZone:onmouseup={() => endConnect(shot)}
                        $rightConnectZone:onmouseup={onLeftMouseDown(() => startConnect(shot))}
                        $main:onmousedown={[
                            onLeftMouseDown(() => draggingShot(shot)),
                            onLeftMouseDown((e:MouseEvent) => dragStartOffset({x: e.clientX - shot.position().x, y: e.clientY - shot.position().y}))
                        ]}
                        $main:onmouseup={onLeftMouseDown(() => draggingShot(null))}
                        $confirm:onClick={onConfirm}
                    />
                }

            })}
            {() => lastContextMenuEvent() ? contextMenu:null}
        </div>
    </div>
}