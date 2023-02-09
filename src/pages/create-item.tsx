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
      </form>
    </PageLayout>
  )
}

export default CreateItem
