/**
 * Called on GET /health to signal steady-state liveness to process supervisors.
 * Intentionally lightweight — this route is polled frequently by load balancers.
 */
export const deepenHealthSignal = (): void => {
  // The 200 response itself is the signal; no extra work needed here.
};
