/// <reference lib="webworker" />

console.log('[SIMPLE WORKER]', 'Start simple worker');
addEventListener('message', ({ data }) => {
  console.log('[SIMPLE WORKER]', 'Got message: ', data);

  const response = `worker response to ${data}`;
  postMessage(response);
});
