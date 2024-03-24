import { useRef, useState } from 'react'
import './App.css'
import { tier, decodeTier } from './tiers'
import Header from './Header';
import BadCode from './BadCode';

function App() {
  const codeInput = useRef<HTMLInputElement>(null)
  const [currentTier, setCurrentTier] = useState<tier | null>(null);

  function updateTier() {
    var code = codeInput.current?.value || null
    if(!code) {
      setCurrentTier(null)
      return
    }

    var tier = decodeTier(code)
    if(!tier) {
      setCurrentTier(null)
      return
    }

    setCurrentTier(tier)
  }

  return (
    <>
      <Header inputRef={codeInput} updateFun={updateTier} />

      <div className='centered-display'>
        {!currentTier ? <BadCode /> : <div>
          <span>{JSON.stringify(currentTier, null, 4)}</span>
        </div>}
      </div>
    </>
  )
}

export default App
