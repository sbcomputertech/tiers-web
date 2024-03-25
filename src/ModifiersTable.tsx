import { modifier } from "./tiers";
import "./CommonTable.css"
import ImageCard from "./ImageCard";

function ModifiersTable(props: {mods: modifier[]}) {
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
                    <td>Level</td>
                </tr>
            </thead>
            <tbody>
                {props.mods.map((m, i) => <tr key={i}>
                    <td><ImageCard type="modifier" id={m.name} text={m.name} width={100} height={undefined} /></td>
                    <td>{m.level}</td>
                </tr>)}
            </tbody>
        </table>
    </>
}

export default ModifiersTable