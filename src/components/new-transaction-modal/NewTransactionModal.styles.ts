import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const NewTransactionModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: #00000075;
`

export const NewTransactionModalClose = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: 0;
  line-height: 0;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme['gray-500']};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`

export const NewTransactionModalContent = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${({ theme }) => theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background-color: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      background-color: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 1.5rem;

      &:not(:disabled):hover {
        background-color: ${({ theme }) => theme['green-700']};
        transition: background-color 0.2s;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`

export const NewTransactionModalTypes = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`

interface NewTransactionModalTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const NewTransactionModalTypeButton = styled(
  RadioGroup.Item,
)<NewTransactionModalTypeButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 4rem;
  border: 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme['gray-700']};
  color: ${({ theme }) => theme['gray-300']};
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme['gray-600']};
    transition: background-color 0.2s;
  }

  svg {
    color: ${({ theme, variant }) =>
      variant === 'income' ? theme['green-300'] : theme['red-300']};
  }

  &[data-state='checked'] {
    background-color: ${({ theme, variant }) =>
      variant === 'income' ? theme['green-500'] : theme['red-500']};
    color: ${({ theme }) => theme.white};

    svg {
      color: ${({ theme }) => theme.white};
    }
  }

  &[data-state='unchecked']:hover {
    background-color: ${({ theme }) => theme['gray-600']};
    transition: background-color 0.2s;
  }
`
