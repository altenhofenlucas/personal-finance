import * as Dialog from '@radix-ui/react-dialog'
import {
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from './Header.styles'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../new-transaction-modal/NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [modalOpen, setModalOpen] = useState(false)

  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal onClose={handleCloseModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
