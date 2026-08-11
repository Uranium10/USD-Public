export function selectBriefingRumors(purchasedRumors, rumorIds) {
  if (!Array.isArray(rumorIds)) return purchasedRumors
  const selectedIds = new Set(rumorIds)
  return purchasedRumors.filter((rumor) => selectedIds.has(rumor.id))
}
