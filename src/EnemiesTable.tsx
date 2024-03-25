import { enemy } from "./tiers";
import "./CommonTable.css"
import ImageCard from "./ImageCard";

function EnemiesTable(props: {enemies: enemy[]}) {
    return <>
        <table>
            <thead>
                <tr>
                    <td colSpan={3}>
                        <h2>Enemies:</h2>
                    </td>
                </tr>
                <tr>
                    <td>Enemy type</td>
                    <td>Count</td>
                    <td>Wave number</td>
                </tr>
            </thead>
            <tbody>
                {props.enemies.map((e, i) => <tr key={i}>
                    <td><ImageCard type="enemy" id={e.name} text={e.name} width={100} height={undefined} /></td>
                    <td>{e.cost}</td>
                    <td>{e.minWave}</td>
                </tr>)}
            </tbody>
        </table>
    </>
}

export default EnemiesTable