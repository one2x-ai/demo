import {createRoot, createElement} from 'axii'

import {Prompt} from "./src/Prompt.js";

const root = createRoot(document.getElementById('root')!)


root.render(<Prompt />)
