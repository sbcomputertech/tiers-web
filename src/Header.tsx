import { RefObject } from "react"
import "./Header.css"

function Header(props: {inputRef: RefObject<HTMLInputElement>, updateFun: (code: string) => void, createFun: VoidFunction, currentCode: string}) {
    return <>
        <div className="header">
            <p></p>
            <span>Code:</span>
            <span>
                <input  placeholder="Enter codes here..." 
                        className="code-input" 
                        type="text" 
                        autoComplete="off" 
                        autoCorrect="off" 
                        autoFocus={true} 
                        ref={props.inputRef} 
                        value={props.currentCode}
                        onChange={e => {
                            e.preventDefault()
                            props.updateFun(e.target.value || "")
                        }} />
            </span>
            <span>
                <button onClick={props.createFun}>New...</button>
            </span>
        </div>
    </>
}

export default Header