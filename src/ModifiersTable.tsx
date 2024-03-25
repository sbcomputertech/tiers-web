import { modifier } from "./tiers";
import * as names from "./names"
import "./CommonTable.css"
import ImageCard from "./ImageCard";
import { useState } from "react";

function ModifiersTable(props: {mods: modifier[], changeHandler: VoidFunction}) {
    const [update, setUpdate] = useState(0)

    return <>
        <table>
            <thead>
                <tr>
                    <td colSpan={2}>
                        <h2>Modifiers:</h2>
                    </td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>Level (off-15)</td>
                </tr>
            </thead>
            <tbody>
                {props.mods.map((m, i) => <tr key={i}>
                    <td><ImageCard type="modifier" id={m.name} text={m.name} width={100} height={undefined} /></td>
                    <td><input type="range" min={0} max={15} value={m.level} onChange={e => { 
                        m.level = e.target.valueAsNumber
                        props.changeHandler()
                        setUpdate(update + 1)
                        }} /></td>
                </tr>)}

                <tr>
                    <td colSpan={2}>
                        Add:&nbsp;
                        <select onChange={e => {
                            if(props.mods.filter(m => m.name == e.target.value).length > 0) return
                            props.mods.push({ name: e.target.value, level: 0 })
                            props.changeHandler()
                            setUpdate(update + 1)
                        }}>
                            <option>Add modifier</option>
                            {names.modifiers.map(n => 
                                <option key={n}>{n}</option>
                            )}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
}

export default ModifiersTable