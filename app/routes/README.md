# Includes

Components For Certain Route / URL

## Folders / Files

### Tree

+route1
  +__tests__
  +components (optional)
  index.js
+route2
  ...

### Files Description

Every component has a root folder with the proper screen name.  
`components` is a folder to keep the components to be used to render this route(all common components to be used under this route). Each component can be a single file or have a structure same to this (and nested again if necessary) - components, __tests__, index.js, messages.js. When the component is defined as a single file (ie. Header), you need to define a test file under __tests__ of this route.  
`index.js` is where we define a container/page.  
