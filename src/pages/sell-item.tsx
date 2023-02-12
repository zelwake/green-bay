import PageLayout from '@/components/Layout/Page'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const CreateItem = () => {
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const addItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const name = (event.target as HTMLFormElement).nameOfProduct.value
    const description = (event.target as HTMLFormElement).description.value
    const photoUrl = (event.target as HTMLFormElement).photoUrl.value
    const price = (event.target as HTMLFormElement).price.value

    fetch('/api/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        photoUrl,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return setError(data.error)
        }
        router.push(`/item/${data.item}`)
      })
      .catch((e) => console.log(e))
  }
  return (
    <PageLayout>
      <form onSubmit={addItem}>
        <label className="p-1">
          Name:
          <input className="p-1 ml-2" type="text" name="nameOfProduct" />
        </label>
        <label className="p-1">
          Description:
          <input className="p-1 ml-2" type="text" name="description" />
        </label>
        <label className="p-1">
          Photo Url:
          <input className="p-1 ml-2" type="text" name="photoUrl" />
        </label>
        <label className="p-1">
          Price:
          <input className="p-1 ml-2" type="text" name="price" />
        </label>
        <input type="submit" value="Add" />
        {error && <p>{error}</p>}
      </form>
    </PageLayout>
  )
}

export default CreateItem
