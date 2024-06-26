import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AlertDialogCustomProps {
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: React.ReactNode
  content: React.ReactNode
  textConfirm?: string
  onConfirm?: () => void
}

export default function AlertDialogCustom(props: AlertDialogCustomProps) {
  const { children, open, setOpen, title, content, textConfirm, onConfirm } = props

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className='bg-inherit border-none max-md:max-w-[90%]'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        {textConfirm && (
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>{textConfirm}</AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
