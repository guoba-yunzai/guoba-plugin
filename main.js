import { createApps } from 'alemonjs'
import { apps } from './index.js'
const app = createApps(import.meta.url)
app.setCharacter('#')
app.component(apps)
app.mount()
