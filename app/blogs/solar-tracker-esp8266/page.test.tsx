import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SolarTrackerPage from './page';

// Mock firebase database push and ref
jest.mock('../../../lib/firebase', () => ({
    db: {},
}));

jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    push: jest.fn().mockResolvedValue({}),
}));

describe('SolarTrackerPage Component', () => {
    it('renders the Solar Tracker page title and download button', () => {
        render(<SolarTrackerPage />);

        expect(screen.getByText(/Solar Tracking, Monitoring/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Download Code \(\.zip\)/i })).toBeInTheDocument();
    });

    it('does not contain any hardcoded password text on the page', () => {
        render(<SolarTrackerPage />);

        expect(screen.queryByText(/Rexplorer/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/zip archive is password protected/i)).not.toBeInTheDocument();
    });

    it('opens download modal and completes download without asking or displaying password', async () => {
        render(<SolarTrackerPage />);

        const downloadBtn = screen.getByRole('button', { name: /Download Code \(\.zip\)/i });
        fireEvent.click(downloadBtn);

        expect(screen.getByText('Get the Source Code')).toBeInTheDocument();

        // Fill in required fields
        fireEvent.change(screen.getByPlaceholderText('e.g. Narlapati Ramu'), {
            target: { value: 'Test User' },
        });
        fireEvent.change(screen.getByPlaceholderText('e.g. you@example.com'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('e.g. JNTUK, Kakinada, Andhra Pradesh'), {
            target: { value: 'Test Address' },
        });

        // Select workshop interest radio
        const yesRadio = screen.getByLabelText('Yes');
        fireEvent.click(yesRadio);

        // Submit form
        const submitBtn = screen.getByRole('button', { name: /Submit & Download Source Code/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Download Started! 🎉')).toBeInTheDocument();
        });

        expect(screen.queryByText(/Rexplorer/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/ZIP Extraction Password/i)).not.toBeInTheDocument();
    });
});
