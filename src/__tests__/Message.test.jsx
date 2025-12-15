import React from 'react'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { screen } from '@testing-library/dom'
import Message from '../Message.jsx'

import { describe, it, expect } from 'vitest'

describe('Message', () => {
  it('renders a positive message', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    act(() => {
      ReactDOM.createRoot(container).render(<Message message="Hello" isPositive={true} />)
    })
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
