import { enemy } from "./tiers";
import "./CommonTable.css"
import * as names from "./names"
import ImageCard from "./ImageCard";

function EnemiesTable(props: {enemies: enemy[], changeHandler: VoidFunction}) {
    return <>
        <table>
            <thead>
                <tr>
                    <td colSpan={3}>
                        <h2>Enemies:</h2>
                    </td>
                </tr>
            </thead>
            <tbody>
                {props.enemies.map((e, i) => <tr key={i}>
                    <td><ImageCard type="enemy" id={e.name} text={e.name} width={100} height={undefined} /></td>
                    <td>
                        Count: &nbsp;
                        <input type="number" value={e.cost} onChange={ev => {
                            e.cost = ev.target.valueAsNumber
                            props.changeHandler()
                        }} />
                    </td>
                    <td>
                        Wave: &nbsp;
                        <input type="number" value={e.minWave} onChange={ev => {
                            e.minWave = ev.target.valueAsNumber
                            props.changeHandler()
                        }} />
                    </td>
                </tr>)}

                <tr>
                    <td colSpan={3}>
                        Add:&nbsp;
                        <select onChange={e => {
                            props.enemies.push({ name: e.target.value, cost: 1, minWave: 1 })
                            props.changeHandler()
                            e.target.selectedIndex = 0
                        }}>
                            <option selected disabled>Add an enemy</option>
                            {names.enemies.map(n => <option>
                                {n}
                            </option>)}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
}

export default EnemiesTable