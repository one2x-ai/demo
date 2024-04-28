import {Atom, RenderContext, SizeObject, StateFromRef} from "axii";
import {colors, gaps} from "../lib/style.js";

export type ShotNode = {
    id: string
    label: Atom<string>
    name: Atom<string>
    description: Atom<string>
    type: Atom<string>
    cover: Atom<string>
    position: Atom<{
        x: number
        y: number
    }>,
    size: StateFromRef<SizeObject>
}
type ShotProps = {
    shot: ShotNode,
    lineZoneWidth: number,
}

export function Shot({ shot, lineZoneWidth }: ShotProps, { createElement }: RenderContext) {

    const containerStyle= () => ({
        display: 'flex',
        position: 'absolute',
        left: shot.position().x,
        top: shot.position().y,
        alignItems: 'stretch',
        zIndex: 2,
    })

    const lineZoneStyle = {
        width:lineZoneWidth,
        background: 'transparent',
        height: '100%',
        // border: '1px dashed #ccc',
    }

    const cardStyle = () =>({
        boxSizing: 'border-box',
        background: colors.panelBg,
        borderRadius:4,
        minHeight:100,
        width:270,
        border: `1px solid ${colors.panelBorder}`,
        padding: `${gaps.medium}px ${gaps.large}px`,
        '&:hover': {
            outline: '1px solid #253FFD',
        }
    })

    const nameStyle = {
        position:'absolute',
        top: -gaps.large,
        left: gaps.small,
        colors: colors.description
    }

    const descriptionStyle = {
        height: 26,
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis ellipsis',
        fontSize:12,
        marginTop:gaps.medium
    }

    return <div style={containerStyle}>
        <div style={nameStyle}>{shot.name}</div>
        <div
            as="leftConnectZone"
            style={{
                ...lineZoneStyle,
                position: 'absolute',
                top: 0,
                left: -lineZoneWidth,
                overflow: 'visible',
                cursor:'crosshair'
            }}
        >
        </div>
        <div
            as="main"
            style={cardStyle}
            ref={[shot.size.ref]}
        >
            <div style={{fontSize:14, fontWeight:'bold'}}>{shot.label}</div>
            <div style={descriptionStyle}>{shot.description}</div>
            <div style={{marginTop:gaps.small}}></div>
            <img src={shot.cover} style={{width:'100%', borderRadius: 6,overflow:'hidden'}} draggable={false}/>
        </div>
        <div
            as="rightConnectZone"
            style={{
                ...lineZoneStyle,
                position: 'absolute',
                top: 0,
                right: -lineZoneWidth,
                cursor:'crosshair'

            }}
        >
        </div>
    </div>
}
