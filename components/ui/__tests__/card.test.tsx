import { render, screen } from '@testing-library/react'
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '../card'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render correctly', () => {
      render(<Card data-testid="card">Card Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-white', 'shadow-sm')
      expect(card).toHaveTextContent('Card Content')
    })

    it('should apply custom className', () => {
      render(<Card className="custom-class" data-testid="card" />)
      
      expect(screen.getByTestId('card')).toHaveClass('custom-class')
    })

    it('should forward ref correctly', () => {
      const ref = jest.fn()
      render(<Card ref={ref} />)
      
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
    })
  })

  describe('CardHeader', () => {
    it('should render correctly', () => {
      render(<CardHeader data-testid="card-header">Header Content</CardHeader>)
      
      const header = screen.getByTestId('card-header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
      expect(header).toHaveTextContent('Header Content')
    })

    it('should apply custom className', () => {
      render(<CardHeader className="custom-class" data-testid="card-header" />)
      
      expect(screen.getByTestId('card-header')).toHaveClass('custom-class')
    })
  })

  describe('CardTitle', () => {
    it('should render correctly', () => {
      render(<CardTitle data-testid="card-title">Card Title</CardTitle>)
      
      const title = screen.getByTestId('card-title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-2xl', 'font-semibold')
      expect(title).toHaveTextContent('Card Title')
    })

    it('should apply custom className', () => {
      render(<CardTitle className="custom-class" data-testid="card-title" />)
      
      expect(screen.getByTestId('card-title')).toHaveClass('custom-class')
    })
  })

  describe('CardDescription', () => {
    it('should render correctly', () => {
      render(<CardDescription data-testid="card-desc">Card Description</CardDescription>)
      
      const desc = screen.getByTestId('card-desc')
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveClass('text-sm', 'text-gray-500')
      expect(desc).toHaveTextContent('Card Description')
    })

    it('should apply custom className', () => {
      render(<CardDescription className="custom-class" data-testid="card-desc" />)
      
      expect(screen.getByTestId('card-desc')).toHaveClass('custom-class')
    })
  })

  describe('CardContent', () => {
    it('should render correctly', () => {
      render(<CardContent data-testid="card-content">Content</CardContent>)
      
      const content = screen.getByTestId('card-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
      expect(content).toHaveTextContent('Content')
    })

    it('should apply custom className', () => {
      render(<CardContent className="custom-class" data-testid="card-content" />)
      
      expect(screen.getByTestId('card-content')).toHaveClass('custom-class')
    })
  })

  describe('CardFooter', () => {
    it('should render correctly', () => {
      render(<CardFooter data-testid="card-footer">Footer</CardFooter>)
      
      const footer = screen.getByTestId('card-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
      expect(footer).toHaveTextContent('Footer')
    })

    it('should apply custom className', () => {
      render(<CardFooter className="custom-class" data-testid="card-footer" />)
      
      expect(screen.getByTestId('card-footer')).toHaveClass('custom-class')
    })
  })

  describe('Card composition', () => {
    it('should compose all card components correctly', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="card-header">
            <CardTitle data-testid="card-title">Card Title</CardTitle>
            <CardDescription data-testid="card-desc">Card Description</CardDescription>
          </CardHeader>
          <CardContent data-testid="card-content">
            Main content goes here
          </CardContent>
          <CardFooter data-testid="card-footer">
            Footer content
          </CardFooter>
        </Card>
      )
      
      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByTestId('card-header')).toBeInTheDocument()
      expect(screen.getByTestId('card-title')).toBeInTheDocument()
      expect(screen.getByTestId('card-desc')).toBeInTheDocument()
      expect(screen.getByTestId('card-content')).toBeInTheDocument()
      expect(screen.getByTestId('card-footer')).toBeInTheDocument()
      
      expect(screen.getByTestId('card-title')).toHaveTextContent('Card Title')
      expect(screen.getByTestId('card-desc')).toHaveTextContent('Card Description')
      expect(screen.getByTestId('card-content')).toHaveTextContent('Main content goes here')
      expect(screen.getByTestId('card-footer')).toHaveTextContent('Footer content')
    })
  })
})
