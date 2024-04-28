import {Atom, RenderContext} from "axii";
import {VideoIcon} from "./icon/Video.js";
import {VoiceIcon} from "./icon/Voice.js";
import {MusicIcon} from "./icon/Music.js";
import {KnowledgeIcon} from "./icon/Knowledge.js";
import {gaps} from "../lib/style.js";
import {ZoomInIcon} from "./icon/ZoomIn.js";
import {ZoomOutIcon} from "./icon/ZoomOut.js";
import {BackwardIcon} from "./icon/Backward.js";
import {ForwardIcon} from "./icon/Forward.js";

type ResourceControlProps = {
    scale: Atom<number>
}

export function Toolbar({scale}: ResourceControlProps, {createElement}: RenderContext) {

    return <div
        style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            background:'#1E1F24'
        }}
    >
        <div style={{display: 'flex', gap: gaps.ultra, alignItems:'center', paddingLeft:gaps.extra}}>
            <div style={{display: 'flex', gap: gaps.small, alignItems:'center'}}>
                <VideoIcon/>
                <span>Media</span>
            </div>
            <div style={{display: 'flex', gap: gaps.small, alignItems:'center'}}>
                <VoiceIcon/>
                <span>Voiceover</span>
            </div>
            <div style={{display: 'flex', gap: gaps.small, alignItems:'center'}}>
                <MusicIcon/>
                <span>Music</span>
            </div>
            <div style={{display: 'flex', gap: gaps.small, alignItems:'center'}}>
                <KnowledgeIcon/>
                <span>Knowledge</span>
            </div>

        </div>
        <div style={{marginRight:gaps.ultra, display:'flex', gap: gaps.ultra}}>
            <div style={{display:'flex', gap: gaps.large, alignItems:'center'}}>
                <ZoomInIcon/>
                <div>{() => `${(scale() * 100).toFixed(0)}%`}</div>
                <ZoomOutIcon />
            </div>
            <BackwardIcon />
            <ForwardIcon />
        </div>
    </div>
}

