import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { GuidesIndexPage } from '@/pages/GuidesIndexPage'
import { GuidePage } from '@/pages/GuidePage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { AboutPage } from '@/pages/AboutPage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { RiskProfilePage } from '@/pages/RiskProfilePage'
import { GetHelpPage } from '@/pages/GetHelpPage.tsx'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PrintGuidePage } from '@/pages/print/PrintGuidePage'
import { useScrollBarVisibility } from '@/lib/useScrollBarVisibility'

export const App = () => {
  useScrollBarVisibility()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/print/guides/:slug' element={<PrintGuidePage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/guides' element={<GuidesIndexPage />} />
        <Route path='/guides/:slug' element={<GuidePage />} />
        <Route path='/resources' element={<ResourcesPage />} />
        <Route path='/risk-profile' element={<RiskProfilePage />} />
        <Route path='/help' element={<GetHelpPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/privacy' element={<PrivacyPolicyPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}