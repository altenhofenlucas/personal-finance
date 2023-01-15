import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  NewTransactionModalClose,
  NewTransactionModalContent,
  NewTransactionModalOverlay,
  NewTransactionModalTypeButton,
  NewTransactionModalTypes,
} from './NewTransactionModal.styles'

const NewTransactionModalSchema = z.object({
  description: z.string().min(3),
  amount: z.number().min(1),
  category: z.string().min(3),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionModalFormData = z.infer<typeof NewTransactionModalSchema>

interface NewTransactionModalProps {
  onClose: () => void
}

export function NewTransactionModal({ onClose }: NewTransactionModalProps) {
  const { addTransaction } = useContextSelector(
    TransactionsContext,
    (context) => ({
      addTransaction: context.addTransaction,
    }),
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionModalFormData>({
    resolver: zodResolver(NewTransactionModalSchema),
  })

  async function handleNewTransaction(formData: NewTransactionModalFormData) {
    const { description, amount, category, type } = formData
    await addTransaction({
      description,
      amount,
      category,
      type,
    })
    reset()
    onClose()
  }

  return (
    <Dialog.Portal>
      <NewTransactionModalOverlay />
      <NewTransactionModalContent>
        <Dialog.Title>Nova transação</Dialog.Title>
        <NewTransactionModalClose>
          <X size={24} />
        </NewTransactionModalClose>
        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Valor"
            required
            {...register('amount', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <NewTransactionModalTypes
                onValueChange={field.onChange}
                value={field.value}
              >
                <NewTransactionModalTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  <span>Entrada</span>
                </NewTransactionModalTypeButton>
                <NewTransactionModalTypeButton
                  value="outcome"
                  variant="outcome"
                >
                  <ArrowCircleDown size={24} />
                  <span>Saída</span>
                </NewTransactionModalTypeButton>
              </NewTransactionModalTypes>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </NewTransactionModalContent>
    </Dialog.Portal>
  )
}
