export function animate(renderFn: (time: number, frequency: number) => void, { duration = 1000 }): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const frequency = 1 / duration;

    const frameFn = () => {
      const time = performance.now() - start;
      if (time >= duration) {
        resolve();
      } else {
        renderFn(time, frequency);
        window.requestAnimationFrame(frameFn);
      }
    }

    window.requestAnimationFrame(frameFn);
  });
}
