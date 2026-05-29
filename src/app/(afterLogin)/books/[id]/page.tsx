import { BookInfo } from './_components/BookInfo'
import { SellerInfo } from './_components/SellerInfo'

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookInfo id={id} />
        </div>
        <aside>
          <SellerInfo id={id} />
        </aside>
      </div>
    </div>
  )
}
