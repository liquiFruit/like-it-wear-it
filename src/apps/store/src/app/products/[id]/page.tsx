export default function ProductDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    <div>
      <h1>Testing</h1>
      you are viewing product: {id}
    </div>
  )
}
