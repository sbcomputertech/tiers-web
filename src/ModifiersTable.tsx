import { modifier } from "./tiers";
import * as names from "./names"
import "./CommonTable.css"
import ImageCard from "./ImageCard";
import { useState } from "react";

function ModifiersTable(props: {mods: modifier[], changeHandler: VoidFunction}) {
    const [upperLimit, setUpperLimit] = useState(15)

    return <>
        <table>
            <thead>
                <tr>
                    <td>
                        <h2>Modifiers:</h2>
                    </td>
                    <td>
                        <label>Upper limit: &nbsp;</label>
                        <input type="number" min={1} max={100} value={upperLimit} onChange={e => setUpperLimit(e.target.valueAsNumber)} />
                    </td>
                </tr>
            </thead>
            <tbody>
                {props.mods.map((m, i) => <tr key={i}>
                    <td><ImageCard type="modifier" id={m.name} text={m.name} width={100} height={undefined} /></td>
                    <td>
                        Level: {m.level} <br/>
                        <input type="range" min={0} max={upperLimit} value={m.level} onChange={e => { 
                            m.level = e.target.valueAsNumber
                            props.changeHandler()
                        }} />
                    </td>
                </tr>)}

                <tr>
                    <td colSpan={2}>
                        Add:&nbsp;
                        <select onChange={e => {
                            if(props.mods.filter(m => m.name == e.target.value).length > 0) return
                            props.mods.push({ name: e.target.value, level: 1 })
                            props.changeHandler()
                            e.target.selectedIndex = 0
                        }}>
                            <option selected disabled>Add a modifier</option>
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