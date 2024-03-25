import { weapon } from "./tiers";
import "./CommonTable.css"
import * as names from "./names"
import ImageCard from "./ImageCard";

function WeaponsTable(props: {weapons: weapon[], changeHandler: VoidFunction}) {
    return <>
        <table>
            <thead>
                <tr>
                    <td colSpan={2}>
                        <h2>Weapons:</h2>
                    </td>
                </tr>
            </thead>
            <tbody>
                {props.weapons.map((w, i) => <tr key={i}>
                    <td><ImageCard type="weapon" id={w.name} text={w.name} width={undefined} height={75} /></td>
                    <td>
                        Rarity: &nbsp;
                        <input type="number" value={w.rarity} onChange={e => {
                            w.rarity = e.target.valueAsNumber
                            props.changeHandler()
                        }} />
                    </td>
                </tr>)}

                <tr>
                    <td colSpan={2}>
                        Add:&nbsp;
                        <select onChange={e => {
                            if(props.weapons.filter(m => m.name == e.target.value).length > 0) return
                            props.weapons.push({ name: e.target.value, rarity: 1 })
                            props.changeHandler()
                            e.target.selectedIndex = 0
                        }}>
                            <option selected disabled>Add a weapon</option>
                            {names.weapons.map(n => <option>
                                {n}
                            </option>)}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
}

export default WeaponsTable