import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

describe('Card Component', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders card with header and title', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class">
        <CardContent>Test</CardContent>
      </Card>
    );
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('custom-class');
  });
});
