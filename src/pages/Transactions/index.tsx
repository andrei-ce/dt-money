import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import loader from '../../assets/spinner.svg'
import { TransactionContext } from '../../contexts/TransactionContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const { transactions, isLoading } = useContextSelector(
    TransactionContext,
    (context) => {
      return {
        transactions: context.transactions,
        isLoading: context.isLoading,
      }
    },
  )

  return (
    <div>
      <Header />
      <Summary />
      {/* this could be a separate component in the future */}
      <TransactionsContainer>
        <SearchForm />
        {isLoading ? (
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <img src={loader} alt="loading..." />
          </div>
        ) : (
          <TransactionsTable>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td width="40%">{t.description}</td>
                  <td>
                    <PriceHighlight variant={t.type}>
                      {t.type === 'outcome' && '- '}
                      {priceFormatter.format(t.price)}
                    </PriceHighlight>
                  </td>
                  <td>{t.category}</td>
                  <td>{dateFormatter.format(new Date(t.createdAt))}</td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        )}
      </TransactionsContainer>
    </div>
  )
}
