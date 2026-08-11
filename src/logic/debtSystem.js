import { FLOOR_BY_CYCLE, MAX_CYCLES } from '../config.js'

// 주차별 최소 상환액은 처음부터 공개된 고정 계단을 따른다.
// 총부채에는 계약 수수료가 이미 포함되어 있으며, 진행 중 이자나 추가 수수료는 붙지 않는다.
// 추가 상환은 남은 부채를 그대로 줄이므로 초반 선상환이 후반 부담을 실질적으로 낮춘다.
export function getMinPayment(debt, cycle) {
  const scheduledPayment = FLOOR_BY_CYCLE[cycle - 1] ?? FLOOR_BY_CYCLE.at(-1)
  return Math.min(debt, scheduledPayment)
}

export function computeSettlement(debt, cycle, payAmount) {
  const minPayment = getMinPayment(debt, cycle)

  if (payAmount < minPayment) return { gameOver: true }

  const remaining = debt - payAmount
  if (remaining <= 0) return { cleared: true }

  if (cycle >= MAX_CYCLES) return { gameOver: true, remainingDebt: remaining }

  return { debt: remaining, nextCycle: cycle + 1, gameOver: false, cleared: false }
}
