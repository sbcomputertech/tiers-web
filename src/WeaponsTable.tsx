import { weapon } from "./tiers";
import "./CommonTable.css"
import ImageCard from "./ImageCard";

function WeaponsTable(props: {weapons: weapon[]}) {
    return <>
        <table>
            <thead>
                <tr>
                    <td colSpan={2}>
                        <h2>Weapons:</h2>
                    </td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>Rarity</td>
                </tr>
            </thead>
            <tbody>
                {props.weapons.map((w, i) => <tr key={i}>
                    <td><ImageCard type="weapon" id={w.name} text={w.name} width={undefined} height={75} /></td>
                    <td>{w.rarity}</td>
                </tr>)}
            </tbody>
        </table>
    </>
}

export default WeaponsTable