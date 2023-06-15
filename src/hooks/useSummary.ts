import { TransactionContext } from '../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  // this is a not a complex calculation but we're using here for demonstration purposes
  // this tells react to keep what inside the useMemo alone (don't recreate it) unless something in the transactions array changes. Without this, the function would be recreated on every re-render
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
        } else {
          acc.outcome += transaction.price
        }

        return acc
      },
      { income: 0, outcome: 0 },
    )
  }, [transactions])

  return summary
}
