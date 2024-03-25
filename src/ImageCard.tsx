function ImageCard(props: {type: string, id: string, text: string, width: number | undefined, height: number | undefined}) {
    return <>
        <img src={`cards/${props.type}/${props.id}.png`} alt={props.text} width={props.width} height={props.height}/>
        <p>{props.text}</p>
    </>
}

export default ImageCard