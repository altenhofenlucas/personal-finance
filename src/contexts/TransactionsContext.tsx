import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  amount: number
  createdAt: string
}

interface AddTransactionInput {
  description: string
  type: 'income' | 'outcome'
  category: string
  amount: number
}

interface TransactionsContextData {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  addTransaction: (transaction: AddTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextData)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })
    setTransactions(data)
  }, [])

  const addTransaction = useCallback(async (input: AddTransactionInput) => {
    const { description, type, category, amount } = input
    const { data } = await api.post('/transactions', {
      description,
      type,
      category,
      amount,
      createdAt: new Date().toISOString(),
    })
    setTransactions((prevState) => [data, ...prevState])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        addTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
