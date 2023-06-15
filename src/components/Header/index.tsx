import { HeaderContainer, HeaderContent, NewTransactions } from './styles'
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {/* Trigger is already a button, but we dont want to mix things, hence the asChild */}
          <Dialog.Trigger asChild>
            <NewTransactions>New transaction</NewTransactions>
            {/* Portal teleports code from one place to another in the DOM. In this case, the div with id=radix[...] is even placed outside the div id=root! */}
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
