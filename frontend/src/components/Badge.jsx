export default function Badge({ status }) {
  const colors =
    status === 'Present'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-600'
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${colors}`}>
      {status}
    </span>
  )
}
