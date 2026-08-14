import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
    it('renders logo and title', () => {
        render(<Navbar />);
        const logo = screen.getByAltText('Logo');
        const title = screen.getByText('Ramu Blogs');

        expect(logo).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Navbar />);

        const homeLink = screen.getByText('Home');
        const blogsLink = screen.getByText('Blogs');
        const portfolioLink = screen.getByText('Portfolio');

        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');

        expect(blogsLink).toBeInTheDocument();
        expect(blogsLink.closest('a')).toHaveAttribute('href', 'https://blogs.imramu.me');

        expect(portfolioLink).toBeInTheDocument();
        expect(portfolioLink.closest('a')).toHaveAttribute('href', 'https://ramunarlapati.vercel.app/');
    });
});
