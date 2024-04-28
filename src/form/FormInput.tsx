import {Input} from "../../lib/Input.js";
import {createFormItem} from "axii-ui";
export const FormInput = createFormItem(Input, { changeEvents: ['onInput']})
