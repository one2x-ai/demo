import {Stage} from "./Stage.js";
import {atom, RenderContext} from "axii";
import {Toolbar} from "./Toolbar.js";
import {Button} from "../lib/Button.js";
import {gaps} from "../lib/style.js";
import {LeftIcon} from "./icon/Left.js";

export function App({}, { createElement }: RenderContext) {

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
    }

    const scale = atom(1)

    const back = () => {
        window.location.href = '/'
    }

    return <div style={containerStyle}>
        <div style={headerStyle}>
            <div style={{position: 'absolute', left:gaps.small, cursor:'pointer'}} onClick={back}>
                <LeftIcon/>
            </div>
            <div>Mystical Tibet: A Journey into the Roof of the World</div>
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
                <Stage scale={scale}></Stage>
            </div>
        </div>
    </div>

}
