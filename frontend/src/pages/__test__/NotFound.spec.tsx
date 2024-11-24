import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NotFound } from '../NotFound'

describe('NotFound Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    )

    expect(getByText('404')).toBeInTheDocument()
    expect(getByText('Page Not Found')).toBeInTheDocument()
    expect(
      getByText('Oops! The page you are looking for does not exist. It might have been moved or deleted.'),
    ).toBeInTheDocument()
    expect(getByText('Go Back to Home')).toBeInTheDocument()
  })
})
