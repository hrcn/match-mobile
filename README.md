## useLayoutEffect

https://reactjs.org/docs/hooks-reference.html#uselayouteffect

The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.