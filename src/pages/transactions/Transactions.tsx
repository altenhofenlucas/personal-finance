import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/header/Header'
import { Summary } from '../../components/summary/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { currencyFormatter, dateFormatter } from '../../utils/formatter'
import { SearchFormComponent } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './Transactions.styles'

export function Transactions() {
  const { transactions } = useContextSelector(
    TransactionsContext,
    (context) => ({
      transactions: context.transactions,
    }),
  )

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchFormComponent />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {currencyFormatter.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
