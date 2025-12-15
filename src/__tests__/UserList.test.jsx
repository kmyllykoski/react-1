import React from 'react'
import ReactDOM from 'react-dom/client'
import { screen } from '@testing-library/dom'
import UserList from '../UserList.jsx'
import AxUsers from '../services/AxUsers'
import { describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { MemoryRouter } from 'react-router-dom'

describe('UserList', () => {
  it('renders users fetched from AxUsers', async () => {
    const mockUsers = [
      { userId: 1, firstname: 'First', lastname: 'Last', email: 'a@b.com', accesslevelId: 1 }
    ]
    vi.spyOn(AxUsers, 'getUsers').mockResolvedValue(mockUsers)

    const container = document.createElement('div')
    document.body.appendChild(container)

    const mockSetIsPositiveMessage = vi.fn()
    const mockSetShowMessage = vi.fn()
    const mockSetMessageText = vi.fn()
    const mockShowTemporaryMessage = vi.fn()

    await act(async () => {
      ReactDOM.createRoot(container).render(
        <MemoryRouter>
          <UserList
            setIsPositiveMessage={mockSetIsPositiveMessage}
            setShowMessage={mockSetShowMessage}
            setMessageText={mockSetMessageText}
            accesslevelId={1}
            showTemporaryMessage={mockShowTemporaryMessage}
          />
        </MemoryRouter>
      )
    })

    // Wait for the lastname to appear in the table
    const lastnameNode = await screen.findByText('Last')
    expect(lastnameNode).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
  })
})
