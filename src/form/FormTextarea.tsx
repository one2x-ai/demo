import {createFormItem} from "axii-ui";
import {Textarea} from "../../lib/Textarea.js";

export const FormTextarea = createFormItem(Textarea, { changeEvents: ['onInput']})