import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../utils/axios'

interface TransactionInterface {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: TransactionInterface[]
  isLoading: Boolean
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

// Context Provider React Component
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const fetchTransactions = useCallback(async (query?: string) => {
    setIsLoading(true)
    try {
      const res = await api.get('http://localhost:3000/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      })

      setTransactions(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  // this useCallback() hook tells react that we only need o recreate this function if something in the dependency array changes. Here, this was used specifically because the NewTransactionModal would be re-render after a search, because even though it is just listening to createTransaction(), this function is recreated by default when the context changes element is re rendered (TransactionsProvider)
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      setIsLoading(true)
      try {
        const { description, price, category, type } = data
        const res = await api.post('/transactions', {
          description,
          price,
          category,
          type,
          createdAt: new Date(),
        })

        console.log(res.data)
        setTransactions((prevState) => [res.data, ...prevState])
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{ transactions, isLoading, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

// Context data for useContext() hook
export const TransactionContext = createContext({} as TransactionContextType)
