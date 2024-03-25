import { RefObject } from "react"
import "./Header.css"

function Header(props: {inputRef: RefObject<HTMLInputElement>, updateFun: VoidFunction, currentCode: string}) {
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
                        onChange={props.updateFun} />
            </span>
        </div>
    </>
}

export default Header