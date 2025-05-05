interface LoadingSpinnerProps {
    message?: string
  }
  
  export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
    return (
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>{message}</p>
      </div>
    )
  }