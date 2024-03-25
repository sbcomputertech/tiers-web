import { useEffect, useRef, useState } from 'react'
import './App.css'
import { tier, decodeTier, encodeTier } from './tiers'
import Header from './Header';
import BadCode from './BadCode';
import EnemiesTable from './EnemiesTable';
import ModifiersTable from './ModifiersTable';
import WeaponsTable from './WeaponsTable';

function App() {
  const codeInput = useRef<HTMLInputElement>(null)
  const [currentCode, setCurrentCode] = useState("")
  const [currentTier, setCurrentTier] = useState<tier | null>(null);

  useEffect(() => {
    setCurrentCode(localStorage.getItem("toh_last_code") || "")
    updateTier()
  }, [codeInput])

  function generateTier() {
    if(codeInput.current && currentTier) {
      var newCode = encodeTier(currentTier)
      if(!newCode) return
      setCurrentCode(newCode)
      localStorage.setItem("toh_last_code", newCode)
    }
  }

  function updateTier() {
    setCurrentCode(codeInput.current?.value || "")
    localStorage.setItem("toh_last_code", currentCode)

    var tier: tier | null
    try {
      tier = decodeTier(currentCode)
    } catch {
      tier = null
    }

    if(!tier) {
      setCurrentTier(null)
      return
    }

    setCurrentTier(tier)
  }

  return (
    <>
      <Header inputRef={codeInput} currentCode={currentCode} updateFun={updateTier} />

      <div className='centered-display'>
        {!currentTier ? <BadCode /> : <>
          <EnemiesTable enemies={currentTier.enemies} changeHandler={generateTier} />
          <ModifiersTable mods={currentTier.mods} changeHandler={generateTier} />
          <WeaponsTable weapons={currentTier.weapons} changeHandler={generateTier} />
        </>}
      </div>
    </>
  )
}

export default App
