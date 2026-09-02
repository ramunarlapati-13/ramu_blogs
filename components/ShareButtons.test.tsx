import { render, screen, act, fireEvent } from '@testing-library/react';
import ShareButtons from './ShareButtons';

describe('ShareButtons Component', () => {
    const defaultProps = {
        title: 'Test Article Title',
        url: 'https://example.com/blog/test-article',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders social share links with correctly encoded URLs', () => {
        render(<ShareButtons {...defaultProps} />);

        const twitterLink = screen.getByRole('link', { name: /share on twitter/i });
        const linkedinLink = screen.getByRole('link', { name: /share on linkedin/i });
        const facebookLink = screen.getByRole('link', { name: /share on facebook/i });

        expect(twitterLink).toHaveAttribute(
            'href',
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(defaultProps.title)}&url=${encodeURIComponent(defaultProps.url)}`
        );
        expect(linkedinLink).toHaveAttribute(
            'href',
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(defaultProps.url)}&title=${encodeURIComponent(defaultProps.title)}`
        );
        expect(facebookLink).toHaveAttribute(
            'href',
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(defaultProps.url)}`
        );
    });

    describe('Copy Link functionality', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('successfully copies the link and resets state after 2 seconds', async () => {
            const writeTextMock = jest.fn().mockResolvedValue(undefined);
            Object.defineProperty(navigator, 'clipboard', {
                value: { writeText: writeTextMock },
                writable: true,
                configurable: true,
            });

            render(<ShareButtons {...defaultProps} />);

            const copyButton = screen.getByRole('button', { name: /copy link/i });
            expect(copyButton).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(copyButton);
            });

            expect(writeTextMock).toHaveBeenCalledWith(defaultProps.url);
            expect(screen.getByText('Copied!')).toBeInTheDocument();

            // Fast forward 2000ms timer
            act(() => {
                jest.advanceTimersByTime(2000);
            });

            expect(screen.getByText('Copy Link')).toBeInTheDocument();
            expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
        });

        it('handles clipboard write error gracefully without setting copied state', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const copyError = new Error('Clipboard access denied');
            const writeTextMock = jest.fn().mockRejectedValue(copyError);

            Object.defineProperty(navigator, 'clipboard', {
                value: { writeText: writeTextMock },
                writable: true,
                configurable: true,
            });

            render(<ShareButtons {...defaultProps} />);

            const copyButton = screen.getByRole('button', { name: /copy link/i });

            await act(async () => {
                fireEvent.click(copyButton);
            });

            expect(writeTextMock).toHaveBeenCalledWith(defaultProps.url);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy link:', copyError);
            expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
            expect(screen.getByText('Copy Link')).toBeInTheDocument();

            consoleErrorSpy.mockRestore();
        });
    });
});
