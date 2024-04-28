import {atom, RenderContext} from "axii";
import {gaps} from "../lib/style.js";
import {Textarea} from "../lib/Textarea.js";


export function KnowledgeSelector({}, {createElement}:RenderContext) {
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
                <div style={{marginBottom: gaps.large}}>Upload</div>
                <div style={videoListStyle}>

                </div>
            </div>
            <div style={{marginTop: gaps.ultra*2}}>
                <div style={{display: 'flex', justifyContent:'space-between', marginBottom: gaps.large}}>
                    URL
                </div>
                <div>
                    <Textarea value={atom('http://www.exmaple.com')} />
                </div>
            </div>
        </div>
    )
}
