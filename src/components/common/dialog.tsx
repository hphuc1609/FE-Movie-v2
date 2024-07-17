import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'

interface DialogCustomProps {
  children?: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: React.ReactNode
  content: React.ReactNode
  textConfirm?: string
  onConfirm?: () => void
}

export default function DialogCustom(props: DialogCustomProps) {
  const { children, open, setOpen, title, content, textConfirm, onConfirm } = props
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='bg-inherit border-none max-w-[60%] max-md:max-w-[90%] outline-none'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-left font-bold'>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        {textConfirm && (
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={onConfirm}>{textConfirm}</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
