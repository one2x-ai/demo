import {RenderContext, RxMap} from "axii";
import {RadioOption} from "../lib/RadioGroup.js";
import {FormInput} from "./form/FormInput.js";
import {FormClear, FormReset, FormSubmit} from "./form/FormButton.js";
import {Form} from "axii-ui";
import {FormRadioGroup} from "./form/FormRadioGroup.js";
import {colors, gaps, styles} from "../lib/style.js";
import {FormTextarea} from "./form/FormTextarea.js";

export function Create({}, {createElement}: RenderContext) {
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

    const createPanelStyle = {
        background: colors.panelBg,
        borderRadius: 4,
        color: '#fff',
        width: 1080,
        fontSize: 16,
    }

    const createPanelFormStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: 560,
        gap: gaps.ultra,
    }


    const formValues = new RxMap<string, any>([])
    const onSubmit = () => {
        window.location.href = '/init.html'
    }

    const renderRatioOptions = (width:number, height:number) => {
        const ratio = 16/ Math.max(width, height)

        return {
            label: <div style={{display:'flex', alignItems:'center'}}>
                <div style={{display:'inline-block',border: '2px solid #fff', width:width*ratio, height:height*ratio}}/>
                <span style={{marginLeft:gaps.small}}>{`${width}:${height}`}</span>
            </div>,
            value: `${width}:${height}`
        }
    }

    const ratioOptions = [
        renderRatioOptions(16, 9),
        renderRatioOptions(4, 3),
        renderRatioOptions(9, 16),
        renderRatioOptions(3, 4),
        renderRatioOptions(1, 1),
    ]


    const topicOptions = [
        {label: 'Short video', value: 'short-video'},
        {label: 'Documentary', value: 'documentary'},
        {label: 'Movies', value: 'movies'},
        {label: 'MV', value: 'mv'},
    ]

    return <div style={containerStyle}>
        <div style={headerStyle}> One2X </div>
        <div style={bodyStyle}>
            <div style={createPanelStyle}>
                <Form name="project" values={formValues} onSubmit={onSubmit}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            margin: '16px 24px',
                        }}
                    >
                        <div>Project Settings</div>
                        <div>x</div>

                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={createPanelFormStyle}>
                            <FormInput
                                name='name'
                                defaultValue={() => 'defaultValue'}
                                placeholder='Please enter project name'
                                label='Project Name'
                                required
                                {...styles.formItem}
                            />
                            <div>
                                <FormRadioGroup
                                    name='topic'
                                    label='Topic'
                                    defaultValue={() => topicOptions[0]}
                                    $control={{'$option:_use': RadioOption}}
                                    required
                                    options={topicOptions}
                                    {...styles.formItem}
                                />
                            </div>
                            <div>
                                <FormTextarea
                                    name={'description'}
                                    label={'Video description'}
                                    placeholder={'Please enter video description'}
                                    defaultValue={() => ''}
                                    required
                                    {...styles.formItem}
                                />
                            </div>
                            <div>
                                <FormTextarea
                                    name={'voiceover'}
                                    label={'Voiceover description'}
                                    placeholder={'Please describe the voiceover you want'}
                                    defaultValue={() => ''}
                                    required
                                    {...styles.formItem}
                                />
                            </div>
                            <div>
                                <FormRadioGroup
                                    name={'ratio'}
                                    label={'Ratio'}
                                    defaultValue={() => ratioOptions[0]}
                                    options={ratioOptions}
                                    required
                                    {...styles.formItem}
                                />
                            </div>

                        </div>
                    </div>
                    <div style={{display: 'flex', gap: gaps.large, justifyContent: 'center', padding:'20px 0', marginTop: gaps.ultra*3, borderTop:`1px solid ${colors.innerBorder}`}}>
                        <FormReset>Reset</FormReset>
                        <FormClear>Clear</FormClear>
                        <FormSubmit primary>Confirm</FormSubmit>
                    </div>
                </Form>
            </div>
        </div>
    </div>
}
