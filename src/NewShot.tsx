import {atom, PropTypes, RenderContext, RxList, ToAllowFixedPropsType, ToPropsType} from "axii";
import {colors, gaps} from "../lib/style.js";
import {Textarea} from "../lib/Textarea.js";
import {Select} from '../lib/Select.js'
import {SendIcon} from "./icon/Send.js";
import {MagicIcon} from "./icon/Magic.js";
import {AnimateDots} from "./AnimateDots.js";


const NewShotPropTypes = {
    shot: PropTypes.any.isRequired,
    lineZoneWidth: PropTypes.number.isRequired,
    shotType: PropTypes.atom<string|null>().default(() => atom('video')),
    shotTypeOptions: PropTypes.rxList<string>().isRequired.default(() => new RxList(['video', 'shot video', 'mv'])),
    template: PropTypes.atom<string|null>().default(() => atom('template A')),
    templateOptions: PropTypes.rxList<string>().isRequired.default(() => new RxList(['template A', 'template B', 'template C'])),
    prompt: PropTypes.atom<string>().default(() => atom('')),
    generating: PropTypes.atom<boolean>().default(() => atom(false)),
}

export function NewShot(props: ToAllowFixedPropsType<typeof NewShotPropTypes>, { createElement }: RenderContext) {
    const { shot, generating, lineZoneWidth,prompt, template, shotType, shotTypeOptions, templateOptions } = props as ToPropsType<typeof NewShotPropTypes>
    const containerStyle = () => ({
        position: 'absolute',
        left: shot.position().x,
        top: shot.position().y,
        zIndex: 2,
    })

    const cardContainerStyle= () => ({
        display: 'flex',
        alignItems: 'stretch',
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
        width:270,
        // FIXME 这个高度目前是根据实际渲染结果写死的，需要找到更好的方法
        height: 223,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        border: `1px solid ${colors.innerBorder}`,
        padding: `${gaps.medium}px ${gaps.large}px`,
        '&:hover': {
            outline: '1px solid #253FFD',
        }
    })

    const settingContainerStyle = {
        background:'#000',
        border: `1px solid ${colors.innerBorder}`,
        borderRadius: 4,
        color: colors.description,
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        marginTop:gaps.small
    }

    const footer = <div
        style={{
            display:'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}
    >
        <div
            as={'optimize'}
            style={{
                display:'flex',
                alignItems: 'center',
                gap:gaps.small,
            }}
        >
            <MagicIcon />
            <span>optimize</span>
        </div>
        <div
            as="confirm"
            style={{cursor:'pointer'}}
        >
            <SendIcon />
        </div>
    </div>



    return (
        <div style={containerStyle}>
            <div style={cardContainerStyle}>
                <div
                    as="leftConnectZone"
                    style={{
                        ...lineZoneStyle,
                        position: 'absolute',
                        top: 0,
                        left: -lineZoneWidth,
                        overflow: 'visible',
                        cursor: 'crosshair'
                    }}
                >
                </div>
                <div
                    as="main"
                    style={cardStyle}
                    ref={[shot.size.ref]}
                >
                    <img src="/empty.svg" style={{width: 86}} draggable={false}/>
                    <div style={{fontSize: 14, marginTop: gaps.small, color: 'rgba(255,255,255,.4)'}}>
                        {() => generating!()? <AnimateDots count={7}/> : 'To be generated'}
                    </div>
                </div>
                <div
                    as="rightConnectZone"
                    style={{
                        ...lineZoneStyle,
                        position: 'absolute',
                        top: 0,
                        right: -lineZoneWidth,
                        cursor: 'crosshair'
                    }}
                >
                </div>
            </div>
            <div style={{width:360}}>
                <div style={settingContainerStyle}>
                    <div style={{padding: gaps.small, borderRight: `1px solid ${colors.innerBorder}`}}>Settings</div>
                    <div style={{marginLeft: gaps.small}}>
                        <Select value={shotType} options={shotTypeOptions}/>
                    </div>
                    <div style={{marginLeft: gaps.small}}>
                        <Select value={template} options={templateOptions}/>
                    </div>
                </div>
                <div style={{marginTop: gaps.small}}>
                    <Textarea as='prompt' value={prompt!} $footer:_use={footer}/>
                </div>
            </div>
        </div>
    )
}

NewShot.propTypes = NewShotPropTypes

