import {atom, Component, RenderContext, RxList} from "axii";
import {colors, gaps, styles} from "../lib/style.js";
import {MediaSelector} from "./MediaSelector.js";
import {Button} from "../lib/Button.js";
import {VoiceoverSelector} from "./VoiceoverSelector.js";
import {MusicSelector} from "./MusicSelector.js";
import {KnowledgeSelector} from "./KnowledgeSelector.js";
import {VideoIcon} from "./icon/Video.js";
import {VoiceIcon} from "./icon/Voice.js";
import {MusicIcon} from "./icon/Music.js";
import {KnowledgeIcon} from "./icon/Knowledge.js";

type MenuItemType = {label:any, value:any, Component: Component, Icon: Component}

export function Init({}, {createElement}: RenderContext) {
    const containerStyle= {
        // flex 上下布局
        display: 'flex',
        flexDirection: 'column',
        // 宽高100%
        width: '100%',
        height: '100%',
        fontSize:14
    }

    const headerStyle= {
        // 高度固定
        height: 50,
        // 100%宽度
        width: '100%',
        // 背景色
        background: '#1A1A1A',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 56,
        display: 'flex',
        // 垂直居中
        alignItems: 'center',
        color: '#fff',
        fontSize:14,
        padding: '0 16px',
    }

    const bodyStyle={
        background: 'rgba(0,0,0)',
        // 左右布局
        display: 'flex',
        // 宽度100%
        width: '100%',
        // 高度100%
        height: '100%',
        flexGrow:1,
        // 垂直、竖屏居中
        alignItems: 'center',
        justifyContent: 'center',
    }

    const initPanelStyle = {
        background: colors.panelBg,
        borderRadius: 4,
        color: '#fff',
        width: 1080,
        height: 700,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
    }

    const panelBodyStyle = {
        display: 'flex',
        alignItems: 'stretch',
        flexGrow:1
    }

    const panelLeftStyle={
        background: '#15181F',
        borderRight: `1px solid ${colors.innerBorder}`,
        width: 168,
        padding: `${gaps.large}px ${gaps.extra}px`,
        flexGrow:0,
        flexShrink:0,
        boxSizing: 'border-box',
    }

    const panelRightStyle={
        flexGrow: 1,
        padding: `${gaps.medium}px ${gaps.extra}px`,
    }

    const assetMenu = new RxList<MenuItemType>([
        {label: 'Media',Icon: VideoIcon, value: 'media', Component: MediaSelector},
        {label: 'Voiceover',Icon: VoiceIcon, value: 'voiceover', Component: VoiceoverSelector},
        {label: 'Music',Icon: MusicIcon, value: 'music', Component: MusicSelector},
        {label: 'Knowledge',Icon: KnowledgeIcon, value: 'knowledge', Component: KnowledgeSelector},
    ])

    const selectedMenu = atom<MenuItemType>(assetMenu.at(0)!)
    const assetMenuMatch = assetMenu.createSelection(selectedMenu)

    const menuStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: gaps.ultra,
        position: 'relative',

    }

    const assetItemStyle = {
        background: colors.itemBg,
        padding: `${gaps.small}px ${gaps.medium}px`,
        cursor: 'pointer',
        borderRadius: 8,
        zIndex: 2,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
    }

    const menuLineStyle = {
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 1,
        background: colors.itemBg,
        zIndex:1
    }

    const currentPanel = () => {
        const Panel = (selectedMenu()! as MenuItemType).Component
        return <Panel />
    }

    const nextStep = () => {
        const currentValue = selectedMenu()! as MenuItemType
        if (assetMenu.data.indexOf(currentValue) === assetMenu.data.length - 1) {
            // last step
            console.log('finished')
            window.location.href = '/prompt.html'
        } else {
            selectedMenu(assetMenu.data[assetMenu.data.indexOf(currentValue) + 1])
        }
    }


    const previousStep = () => {
        const currentValue = selectedMenu()! as MenuItemType
        if (assetMenu.data.indexOf(currentValue) === 0) {
            // last step
            console.log('finished')
        } else {
            selectedMenu(assetMenu.data[assetMenu.data.indexOf(currentValue) - 1])
        }
    }

    return <div style={containerStyle}>
        <div style={headerStyle}> One2X </div>
        <div style={bodyStyle}>
            <div style={initPanelStyle}>
                <div style={panelBodyStyle}>
                    <div style={panelLeftStyle}>
                        <div style={{marginBottom:gaps.ultra*2}}>Project Asset</div>
                        <div style={menuStyle}>
                            <div style={menuLineStyle}></div>
                            {assetMenuMatch.map(([assetItem, selected]) =>(
                                <div
                                    style={() => ({...assetItemStyle, ...(selected() ? styles.gradientBg:{})})}
                                    onClick={() => selectedMenu(assetItem)}
                                >
                                    {createElement(assetItem.Icon, {})}
                                    <span style={{marginLeft:gaps.small}}>
                                        {assetItem.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={panelRightStyle}>
                        <div></div>
                        {currentPanel}
                    </div>
                </div>
                <div style={{display: 'flex', gap: gaps.large, justifyContent: 'center', padding:'20px 0', borderTop:`1px solid ${colors.innerBorder}`}}>
                    { () => assetMenu.data.indexOf(selectedMenu() as MenuItemType) > 0 ?
                        <Button $main:onClick={previousStep}>Last Step</Button> :
                        null
                    }
                    <Button $main:onClick={nextStep} primary>Continue</Button>
                </div>
            </div>
        </div>
    </div>
}
