
export default function Die(props: any) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
    cursor: props.isHeld ? "" : "pointer",
  }


  return (
    <div className="number" style={styles} onClick={() => {
      if (!props.isHeld) {
        props.holdDice()
      }
    }}>
      {props.value}
    </div>
  )
}
