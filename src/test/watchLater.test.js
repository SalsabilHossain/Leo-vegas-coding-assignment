import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('Watch Later movies page', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  
    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    await userEvent.click(watchLaterLink)
})