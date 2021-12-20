function ColorBar({ setColor }) {
    const colors = [
      "bar-pink",
      "bar-purple",
      "bar-green",
      "bar-yellow",
      "bar-white",
    ];
    return (
      <>
        <div className="colors">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={()=>setColor(color)}
              className={`color-bar-btn ${color}`}
            ></button>
          ))}
        </div>
      </>
    );
  }
  
  export default ColorBar;
  