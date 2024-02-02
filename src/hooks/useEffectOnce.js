import { useEffect, useRef } from "react"

/* 
 Takes a callback function as parameter, the ref is initialized and persisited throughout renders, on effect run
 ref will be set to true so the effect will not run again, Cheers ! :D 
*/

export default function useEffectOnce(effect) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effect()
    }
  }, [])
}