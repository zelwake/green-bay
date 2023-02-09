import PageLayout from '@/components/Layout/Page'

const CreateItem = () => {
  return (
    <PageLayout>
      {/* //todo: create form that takes the name, description, photo url and price for the item */}
      <form>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <label>
          Photo Url
          <input type="text" name="photo-url" />
        </label>
        <label>
          Price
          <input type="text" name="price" />
        </label>
        <input type="submit" value="Add" />
      </form>
    </PageLayout>
  )
}

export default CreateItem
