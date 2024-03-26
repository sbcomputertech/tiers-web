import { tier } from "./tiers";
import * as names from "./names"
import "./CommonTable.css"

function InfoTable(props: {tier: tier, changeHandler: VoidFunction}) {
    return <>
        <table className="infotable">
            <thead>
                <tr>
                    <td>
                        <h2>Tier info:</h2>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Map: &nbsp;
                        <select defaultValue={props.tier.map} onChange={e => {
                            props.tier.map = e.target.value
                            props.changeHandler()
                        }}>
                            {names.maps.map(n => <option>
                                {n}
                            </option>)}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>
                        Difficulty modifier: &nbsp;
                        <input type="number" min={0} max={100} value={props.tier.difficulty} onChange={e => {
                            props.tier.difficulty = e.target.valueAsNumber
                            props.changeHandler()
                        }} />
                    </td>
                </tr>

                <tr>
                    <td>
                        Legitimate: {props.tier.legit ? "Yes" : "No"}
                    </td>
                </tr>
            </tbody>
        </table>
    </>
}

export default InfoTable
