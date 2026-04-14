import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { tools } from './lib/toolRegistry'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {tools.map((tool) => {
              const Component = tool.component
              return <Route key={tool.id} path={tool.path} element={<Component />} />
            })}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
