export function debounce(func,delay){
  let timer = null;
  return function (...args) {
    if(timer)clearTimeout(timer)
    timer = setTimeout(() => {
      // console.log("11111")
      func.apply(this,args)
    },delay)
  }
}
