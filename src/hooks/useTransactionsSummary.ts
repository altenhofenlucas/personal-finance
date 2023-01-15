import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useTransactionsSummary() {
  const { transactions } = useContextSelector(
    TransactionsContext,
    (context) => ({
      transactions: context.transactions,
    }),
  )

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount
          acc.total += transaction.amount
        } else {
          acc.outcome += transaction.amount
          acc.total -= transaction.amount
        }
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
