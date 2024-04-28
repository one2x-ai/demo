import {atom, RenderContext} from "axii";
import {Toolbar} from "./Toolbar.js";
import {Button} from "../lib/Button.js";
import {colors, gaps} from "../lib/style.js";
import {LeftIcon} from "./icon/Left.js";
import {MagicLinearIcon} from "./icon/MagicLinear.js";
import {LoadingLinearIcon} from "./icon/LoadingLinear.js";
import {AnimateDots} from "./AnimateDots.js";

type AnimatePercentageTextProps = {
    interval?: number,
    onFinished?: () => void,
}

function AnimatePercentageText({ interval = 50, onFinished}: AnimatePercentageTextProps , { createElement, useEffect }: RenderContext ) {
    const text = atom(0)

    const id = setInterval(() => {
        const value = text()
        if (value >= 100) {
            clearInterval(id)
            onFinished?.()
        } else {
            text(value + 1)
        }
    }, interval)

    return <div>{() =>`${text()}%`}</div>
}


export function Prompt({}, { createElement, createPortal, Fragment }: RenderContext) {

    const containerStyle= {
        // flex 上下布局
        display: 'flex',
        flexDirection: 'column',
        // 宽高100%
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        color: '#fff',
        fontSize: 12
    }

    const headerStyle= {
        // 高度固定
        height: 56,
        // 100%宽度
        width: '100%',
        // 背景色
        background: '#1E1F24',
        borderBottom: '1px solid #333',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 56,
        display: 'flex',
        // 垂直居中
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize:14,
        position:'relative'
    }

    const bodyStyle={
        // 左右布局
        display: 'flex',
        flexDirection: 'column',
        // 宽度100%
        width: '100%',
        // 高度100%
        flexGrow:1,
        minHeight: 0,
        overflow: 'hidden',
    }

    const toolBarStyle = {
        // 宽度固定
        width: '100%',
        height: 40,
        // 背景色
        background: '#000000',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 50,
    }

    const stageContainerStyle = {
        // 宽度100%
        width: '100%',
        flexGrow: 1,
        // 灰色背景
        background: '#000',
        color: '#fff',
        overflow: 'auto',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const scale = atom(1)

    const promptPanelStyle = {
        background: colors.panelBg,
        borderRadius: 4,
        color: '#fff',
        width: 800,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        padding: gaps.large,
    }


    const modalVisible = atom(false)
    const generate = () => {
        modalVisible(true)
    }

    const finished = atom(false)

    const onFinished = () => {
        finished(true)
        setTimeout(() => {
            window.location.href='/app.html'
        }, 2000)
    }

    const generatingModal = createPortal(() => (
        <div style={{position:'absolute',top:0, left:0,height:'100%', width:'100%', display:'flex', justifyContent:'center', alignItems:'center',background:'rgba(0,0,0,.7)'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:gaps.ultra, color:'#fff', background:colors.panelBg, borderRadius: 8}}>
                <div style={{display:'flex', flexDirection:'column', gap: gaps.small, justifyContent:'center', alignItems:'center'}}>
                    <LoadingLinearIcon/>
                    <div style={{fontSize:20, marginTop: gaps.medium, display:'flex', alignItems:'center'}}>
                        <span style={{marginRight:gaps.medium}}>
                            {()=> finished() ? <><span>Project generated, redirecting</span><AnimateDots /></>: 'Generating...' }
                        </span>
                        {() => finished() ? null : <AnimatePercentageText interval={30} onFinished={onFinished}/>}
                    </div>
                    <div style={{color: colors.description}}>The Video is being generated based on your script.</div>
                    <div style={{marginTop:gaps.large}}>
                        <Button >Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    ), document.body)

    return <div style={containerStyle}>
        {() => modalVisible() ? generatingModal : null}
        <div style={headerStyle}>
            <div style={{position: 'absolute', left:gaps.small}}>
                <LeftIcon/>
            </div>
            <div>title</div>
            <div style={{position:'absolute', right:gaps.medium, display:'flex', gap:gaps.medium, alignItems: 'center'}}>
                <Button>Preview</Button>
                <Button primary>Export</Button>
                <div style={{width:32, height: 32, borderRadius:16, marginLeft: gaps.medium}}>
                    <img src={'/avatar.png'} width={32} height={32} />
                </div>
            </div>
        </div>
        <div style={bodyStyle}>
            <div style={toolBarStyle}>
                <Toolbar scale={scale}/>
            </div>
            <div style={stageContainerStyle}>
                <div style={promptPanelStyle}>
                    <div style={{display:'flex', flexDirection:'column', gap:gaps.ultra}}>
                        <div>
                            Here is the script we used for the video:
                        </div>
                        <div>
                            <div>shot1：Mystical Tibet</div>
                            <div>
                                description：Welcome to 'Mystical Tibet: A journey into the Roof of the World'. This
                                intriguing video will introduce you to the magical Tibetan region, steeped in rich
                                cultural and religious traditions.
                            </div>
                        </div>
                        <div>
                            <div>shot2: Lhasa</div>
                            <div>
                                description：We begin our journey in Lhasa, renowned for its impressive Potala Palace, a UNESCO
                                World Heritage Site, which was the winter palace of the Dalai Lama.
                            </div>
                        </div>
                        <div>
                            <div>shot3: Yamdrok Lake</div>
                            <div>
                                description：We will then move to the mesmerizing turquoise waters of the Yamdrok Lake, believed
                                by Tibetans to be the transformation of a goddess.
                            </div>
                        </div>
                        <div>
                            <div>shot4: Mount Kailash</div>
                            <div>
                                description：Continuing our journey, we'll gravitate towards Mount Kailash, held in reverence by
                                four religions and considered to be the center of the universe.
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop:gaps.ultra*2,
                            display:'flex',
                            justifyContent: 'space-between',
                        }}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:gaps.small, color: colors.primaryBlue}}>
                            <MagicLinearIcon/>
                            <span>optimize</span>
                        </div>
                        <Button primary $main:onClick={generate}>Generate</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

}
