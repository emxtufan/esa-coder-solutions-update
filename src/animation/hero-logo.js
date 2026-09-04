// Settle into a full turn as the service circle reaches the sticky logo.
// The docking pose depends on position, never time or scroll velocity.
export function advanceHeroLogo(state, distance, settleDistance, velocity, delta) {
  const progress = Math.min(1, Math.max(0, 1 - distance / settleDistance));
  const turn = Math.PI * 2;
  if (progress === 0) {
    state.entryAngle = null;
    state.angle += (0.3 + 3 * Math.abs(velocity)) * Math.min(delta, 0.05);
  } else {
    if (state.entryAngle === null) state.entryAngle = state.angle;
    const target = Math.ceil(state.entryAngle / turn) * turn;
    const eased = progress * progress * (3 - 2 * progress);
    state.angle = state.entryAngle + (target - state.entryAngle) * eased;
  }
  return state.angle;
}
