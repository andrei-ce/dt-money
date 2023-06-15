import { SummaryCard, SummaryContainer } from './styles'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Deposits</span>
          <ArrowCircleDown size={28} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Withdraws</span>
          <ArrowCircleUp size={28} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Balance</span>
          <CurrencyDollar size={28} color="#fff" />
        </header>
        <strong>
          {priceFormatter.format(summary.income - summary.outcome)}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
