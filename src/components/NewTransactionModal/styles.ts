import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0; /* top: 0; left: 0; right: 0; bottom: 0; */
  display: grid;
  place-items: center;
  overflow-y: auto;

  background: rgba(0 0 0 / 0.6);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;

  background: ${(props) => props.theme['gray-800']};

  form {
    /* 
    Just playing with grid instead of flex 
    
    display: grid;
    grid-template-rows: 1fr;
    */
    gap: 1rem;
    display: flex;
    flex-direction: column;

    input {
      border-radius: 6px;
      border: 2px solid transparent;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }

      &:focus {
        border: 2px solid ${(props) => props.theme['green-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      border-radius: 6px;
      padding: 0.5rem;
      margin-top: 1.5rem;
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};

      font-weight: bold;
      cursor: pointer;

      &:not(:disabled):hover {
        background: ${(props) => props.theme['green-700']};
        transition: background-color 0.5s;
      }
      &:not(:disabled):focus {
        border: 2px solid ${(props) => props.theme['green-500']};
      }

      &:disabled {
        background-color: ${(props) => props.theme['gray-600']};
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: relative;
  background: transparent;
  border: 0;
  top: -1.5rem;
  right: -24.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }
  &:focus {
    border: 2px solid ${(props) => props.theme['green-500']};
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }

  &[data-state='unchecked'] {
    &:hover {
      background: ${(props) => props.theme['gray-600']};
      transition: background-color 0.2s;
    }
  }
`
