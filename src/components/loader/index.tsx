import './loader.css'

export default function Loader({ openLoading }: { openLoading: boolean }) {
  return (
    openLoading && (
      <div
        className='w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black scrollbar-none'
        style={{ zIndex: 999 }}
      >
        <div className='loader'></div>
      </div>
    )
  )
}
