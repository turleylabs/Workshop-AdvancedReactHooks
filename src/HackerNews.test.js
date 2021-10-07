import * as React from 'react';
import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HackerNews } from './HackerNews';
import axios from 'axios';

jest.mock('axios');

test('searching for news items', async () => {
    axios.get.mockResolvedValue({data:{ hits: [] } });
    render(<HackerNews />);
    await waitFor(() => screen.findByRole('textbox'));
    const textbox = screen.getByRole('textbox');
    axios.get.mockResolvedValue({
        data: { 
            hits: [
                {
                    objectID: '1',
                    url: 'http://google.com',
                    title: 'JavaScript'
                }
            ] 
        } 
    });
    userEvent.type(textbox, 'javascript');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toEqual(1);
    });
});
