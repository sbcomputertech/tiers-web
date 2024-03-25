import { useEffect, useRef, useState } from 'react'
import './App.css'
import { tier, decodeTier } from './tiers'
import Header from './Header';
import BadCode from './BadCode';
import EnemiesTable from './EnemiesTable';
import ModifiersTable from './ModifiersTable';
import WeaponsTable from './WeaponsTable';

function App() {
  const codeInput = useRef<HTMLInputElement>(null)
  const [currentTier, setCurrentTier] = useState<tier | null>(null);

  useEffect(() => {
    var lastCode = localStorage.getItem("toh_last_code") || ""
    if(codeInput.current) codeInput.current.value = lastCode
    updateTier()
  }, [codeInput])

  function updateTier() {
    var code = codeInput.current?.value || null
    localStorage.setItem("toh_last_code", code || "")

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
        {!currentTier ? <BadCode /> : <>
          <EnemiesTable enemies={currentTier.enemies} />
          <ModifiersTable mods={currentTier.mods} />
          <WeaponsTable weapons={currentTier.weapons} />
        </>}
      </div>
    </>
  )
}

export default App
