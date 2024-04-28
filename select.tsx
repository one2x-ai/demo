import {createRoot, createElement, atom, RxList, RenderContext, Atom, N_ATTR} from 'axii'
import {Select} from 'axii-ui'

const root = createRoot(document.getElementById('root')!)
const value = atom(null)
const options = new RxList([{label: 'a11', value: 'a'}, {label: 'b', value: 'b'}])

type SelectItemProps = {
    value: any,
    onSelect: (value: any) => void,
    selected: Atom<boolean>
    children?: any,
    [N_ATTR]: any
}

function SelectItem(props: SelectItemProps, {createElement}: RenderContext) {
    const {value} = props
    const nativeAttrs = props[N_ATTR]
    return <div {...nativeAttrs}>
        <span>
            {value.label}
        </span>
    </div>
}

type DisplayValueProps = {
    value: () => Atom<any>,
    optionVisible: Atom<boolean>
    placeholder: () => string
}

function DisplayValue({ value, optionVisible }: DisplayValueProps) {
    return <div onClick={() => optionVisible(true)}>{() => value()?.label ?? '请选择'}</div>
}

root.render(<div style={{padding:50}}>
    <Select
        options={options}
        value={value}
        $option:_use={SelectItem}
        $displayValue:_use={DisplayValue}
    />
</div>)
