import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClickCounter } from './ClickCounter';

test('clicking the button increments the count', () => {
    render(<ClickCounter />);
    const button = screen.getByText(/increment count/i);
    const display = screen.getByText(/the current count/i);
    expect(display).toHaveTextContent(/0/);
    userEvent.click(button);
    expect(display).toHaveTextContent(/1/);
    userEvent.click(button);
    expect(display).toHaveTextContent(/2/);
});
