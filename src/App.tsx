import Navigation from './navigation';
import { LoadingContextProvider } from './contexts/LoadingContext';
function App():React.JSX.Element {
  return (
    <LoadingContextProvider>
      <Navigation />
    </LoadingContextProvider>
  )
}

export default App
