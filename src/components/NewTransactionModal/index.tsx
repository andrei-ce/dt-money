import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import {
  Overlay,
  Content,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { TransactionContext } from '../../contexts/TransactionContext'
import spinner from '../../assets/spinner.svg'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control, // the radio buttons are not HTML native so we need a controlled input
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    // if I wanted to init with this value
    // defaultValues: {
    //   type: 'income',
    // },
  })

  const { createTransaction, isLoading } = useContextSelector(
    TransactionContext,
    (context) => {
      // return what parts of the context we want to observe (no useless re-renders)
      return {
        createTransaction: context.createTransaction,
        isLoading: context.isLoading,
      }
    },
  )

  async function handleCreateNewTransaction(data: NewTransactionInputs) {
    // simulation:  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const { description, price, type, category } = data
    await createTransaction({ description, price, type, category })
    // console.log(response.data);
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Add new transaction</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              {...register('description')}
              type="text"
              placeholder="Description"
            />
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              placeholder="Price"
            />
            <input
              {...register('category')}
              type="text"
              placeholder="Category"
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                // render is a function that returns what is the HTML content related to field "type"
                // "field" comes as props
                return (
                  <TransactionType
                    // onValueChange is from radix, and it returns the value
                    onValueChange={field.onChange}
                    // line below would be nice if we wanted to start with a default value
                    value={field.value}
                  >
                    <TransactionTypeButton value="income" variant="income">
                      <ArrowCircleUp size={24} />
                      Deposit
                    </TransactionTypeButton>
                    <TransactionTypeButton value="outcome" variant="outcome">
                      <ArrowCircleDown size={24} />
                      Withdraw
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              {isLoading ? (
                <img
                  alt="loading..."
                  src={spinner}
                  style={{ height: '24px', width: '24px' }}
                ></img>
              ) : (
                'Register'
              )}
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}
