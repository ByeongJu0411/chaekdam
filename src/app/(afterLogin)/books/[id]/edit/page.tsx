import { EditForm } from './_components/EditForm'

export default async function BookEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">도서 수정</h1>
      <EditForm id={id} />
    </div>
  )
}
