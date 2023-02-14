import Home from '@/pages/index'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ReactElement } from 'react'
import { ItemList } from 'types/interfaces'

jest.mock('@/components/Layout/Page', () => ({
  PageLayout: ({ children }: { children: ReactElement }) => (
    <div>{children}</div>
  ),
}))

jest.mock('@/scripts/hooks/useFetchItems', () => ({
  useFetchItems: (): ItemList[] => [
    {
      id: 1,
      name: 'Sock',
      photo_url: 'https://image.png',
      price: 123,
    },
  ],
}))

jest.mock('next/link', () => {
  return ({ children }: { children: any }) => {
    return children
  }
})

describe('Home component', () => {
  it('displays single item', () => {
    render(<Home />)

    expect(screen.getByText('Sock')).toBeInTheDocument()
  })
})
