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
import { DialogContentProps } from '@radix-ui/react-dialog'
import { LoaderCircle } from 'lucide-react'

interface DialogCustomProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: React.ReactNode
  content: React.ReactNode
  textCancel?: string
  textConfirm?: string
  onConfirm?: () => void
  DialogContentProps?: DialogContentProps
  ButtonLeftProps?: React.ComponentProps<typeof Button>
  ButtonRightProps?: React.ComponentProps<typeof Button>
}

const DialogCustom = (props: DialogCustomProps) => {
  const {
    open,
    setOpen,
    title,
    content,
    textCancel,
    textConfirm,
    onConfirm,
    DialogContentProps,
    ButtonLeftProps,
    ButtonRightProps,
  } = props

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent
        className='bg-inherit border-none max-w-[60%] max-xl:max-w-[80%] outline-none'
        {...DialogContentProps}
      >
        <DialogHeader>
          <DialogTitle className='text-2xl text-left font-bold'>{title}</DialogTitle>
          <DialogDescription className='text-base'>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {textCancel && (
            <Button
              variant='secondary'
              onClick={() => setOpen(false)}
              {...ButtonLeftProps}
            >
              {textCancel}
            </Button>
          )}
          {textConfirm && (
            <Button
              onClick={onConfirm}
              {...ButtonRightProps}
            >
              {ButtonRightProps?.disabled && (
                <LoaderCircle
                  size={15}
                  className='animate-spin mr-1'
                />
              )}
              {textConfirm}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustom
