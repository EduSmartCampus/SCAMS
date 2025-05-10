import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ScheduleProvider } from './context/ScheduleContext.jsx'
import { FilterProvider } from './context/FilterContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScheduleProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ScheduleProvider>
  </StrictMode>
)
