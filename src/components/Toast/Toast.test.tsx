import { act, fireEvent, render, screen } from '@testing-library/react';
import { Toast } from './Toast';
import { useStore } from '@/store';

describe('Toast', () => {
  test('displays error text', () => {
    useStore.setState({
      error: 'something went wrong.',
    });
    render(<Toast />);
    const getText = () => screen.queryByText(/something went wrong\./i);
    expect(getText()).toBeInTheDocument();
    const button = screen.getByRole('button', {
      name: /close/i,
    });
    fireEvent.click(button);
    expect(getText()).not.toBeInTheDocument();
  });
  test('responds to store changes', () => {
    useStore.setState({
      error: 'something went wrong.',
    });
    render(<Toast />);
    act(() => {
      useStore.setState({ error: null });
    });
    expect(screen.queryByText(/something went wrong\./i)).not.toBeInTheDocument();
  });
});
