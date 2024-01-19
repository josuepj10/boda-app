
import { Navigate, Route, Routes } from 'react-router-dom'
import { WeddingPage } from '../pages/WeddingPage'

export const WeddingRoutes = () => {
  return (
    <Routes>

    <Route path="/" element={ <WeddingPage />} />

    <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}


