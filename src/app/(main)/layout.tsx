export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-md:px-[15px] flex flex-col gap-6'>
      {children}
    </div>
  )
}
