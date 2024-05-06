# Dev Diary
Project start: 2024.05.03

## TODO
- [ ] Design - game start & mechanics
- [ ] move drawer to a seperate component
- [ ] Engine template
- [ ] UI wireframe
- [x] Engine prototype
- [x] Project template

Low priority
- [ ] Font / Font cdn
- [ ] Icons
- [ ] Dark mode ? (switch material)
- [ ] Not found page

## Notes
Primary currency - Funds ($)
Generator - The items in the game that produce data (bytes/s)
Primary Exchange Currency - data (bytes)

Generators that produce other generators ?




- Stamina
the ability to sustain prolonged physical or mental effort.
"their secret is stamina rather than speed"
- Funds
- Data Warehouse Usage

?  It's important to automatize balancing from the start

## Requirements
- [ ] text based import/export save
- [ ] must still work when you're in another tab
- [ ] local storage - it must work when you close the tab and open it again

## Component design
- data collection
 Transition


## Stack
### MUI
https://mui.com/material-ui/

IconButton
<Button variant="outlined">Primary</Button>
<Button>Primary</Button>
Typography

! Tooltip with HTML for upgrade description
! <LinearProgressWithLabel value={progress} />
Basic AppBar
? Card for upgrade ? With paper for Z-index ?

Mini variant drawer

Tabs for upgrades
Link - but this is boring
Badge in the sidebar to indicate new upgrades



Layout
Box - like a div
Container - The container centers your content horizontally. It's the most basic layout element.
Grid - upgrades
Stack - activity
Modal for upgrades & endgame

Charts ?


? Divider ?
? <ButtonGroup variant="outlined" 
? Slider for progress ?


### React
https://react.dev/
### Next.js
https://nextjs.org/

### Storybook
https://storybook.js.org/

### Others
emotion
lucide-react - just icons
radix - ?
postcss - https://postcss.org/
jest

## Books

## Ideas

## Inspirations
- Frog Fractions
- Exponential Idle
- A dark room
- Universal Paperclips
- Spaceplan


Inspiration: https://dribbble.com/shots/17463496-Investment-Dashboard
https://dribbble.com/shots/18151675-Retro-Style-Pastel-Billing-UI-Cards

## Links
https://gameanalytics.com/blog/idle-game-mathematics/


## github
https://codesandbox.io/p/sandbox/react-incremental-clicker-game-dh05n?file=%2Fpackage.json%3A10%2C22
https://github.com/kitnato/farcebook/blob/main/src/components/Main/Likes.tsx
https://github.com/kamenjan/idle-game-engine/blob/master/src/reducers.js
https://codesandbox.io/p/sandbox/react-incremental-clicker-game-dh05n?file=%2Fsrc%2Fcontext%2FGameContext.js
https://drive.google.com/drive/u/0/folders/0B-XwqDnGiT2KWjdPbzNURkhKbmM?resourcekey=0-xQW1czLrIMGTzI7Qh-6Euw !
https://github.com/Alaricus/clicker-tutorial-react

Persistence and Restoration: Some applications need to save state even when the user closes the browser, and restore it when the user returns. State management systems can facilitate this by integrating with persistence mechanisms like local storage or databases.

React's context API (useContext) combined with useReducer or useState is often enough for many applications and is simpler to use than Redux. Here are some benefits:


requestAnimationFrame 

, the state is initiated and stored within a component. You can pass the state information to children components as props, but the logic for updating the state should be kept within the component where state was initially created.
