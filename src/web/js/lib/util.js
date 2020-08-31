export function debounce(ms, fn, ctx) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => {
      fn.apply(ctx, args);
    }, ms);
  };
}

export function throttle(ms, fn, ctx) {
  ms = ms || 250;

  let last;
  let t;

  return (...args) => {
    const now = +new Date();

    if (last && now < last + ms) {
      clearTimeout(t);
      t = setTimeout(() => {
        last = now;
        fn.apply(ctx, args);
      }, ms);
    } else {
      last = now;
      fn.apply(ctx, args);
    }
  };
}
