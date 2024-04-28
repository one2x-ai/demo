import {atom, RenderContext} from "axii";
import {Input} from "../lib/Input.js";
import {colors, gaps} from "../lib/style.js";
import {Checkbox} from "../lib/Checkbox.js";
import {RefreshIcon} from "./icon/Refresh.js";

type VideoItemProps = {
    deletable?: boolean
}

function VideoItem({deletable}: VideoItemProps, {createElement}:RenderContext) {
    const style= {
        overflow: 'hidden',
        position: 'relative',
    }

    return (
        <div style={style}>
            <div style={{position: 'absolute', right: gaps.medium, top: gaps.medium}}>
                {deletable ?
                    (<div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'rgba(42,44,51,.7)',
                    }}>x</div>) :
                    <Checkbox checked={false}/>
                }
            </div>
            <img src={"/image.png"} style={{width: 270, height: 150,borderRadius: 8,overflow:'hidden'}} />
            <div style={{color: colors.description, marginTop: gaps.small}}>Yamdrok Lake</div>
        </div>
    )
}

export function MediaSelector({}, {createElement}:RenderContext) {
    const videoListStyle = {
        display: 'flex',
        overflow: 'auto',
        height: 200,
        gap: gaps.large,
        flexWrap: 'wrap'
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection:'row-reverse'}}>
                <div>x</div>
            </div>
            <div>
                <div style={{marginBottom: gaps.large}}>Selected Video</div>
                <div style={videoListStyle}>
                    <VideoItem deletable/>
                    <VideoItem deletable/>
                    <VideoItem deletable/>
                    <VideoItem deletable/>
                    <VideoItem deletable/>
                    <VideoItem deletable/>
                </div>
            </div>
            <div style={{marginTop: gaps.ultra*2}}>
                <div style={{display: 'flex', justifyContent:'space-between', marginBottom: gaps.large}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div>My Library</div>
                        <div style={{marginLeft: gaps.large, paddingLeft:gaps.large, borderLeft: `1px solid ${colors.description}`}}>Public Library</div>
                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Input value={atom('search')} />
                        <div style={{marginLeft:gaps.large, display: 'flex', alignItems:'center'}}>
                            <RefreshIcon/>
                            <span style={{marginLeft:gaps.small}}>see others</span>
                        </div>
                    </div>
                </div>
                <div style={{...videoListStyle}}>
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                </div>
            </div>
        </div>
    )
}
