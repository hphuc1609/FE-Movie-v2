import './loader.css'

export default function Loader() {
  return (
    <div
      className='w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-90 scrollbar-none'
      style={{ zIndex: 999 }}
    >
      <div className='loader' />
    </div>
  )
}
