import "./Filter.css";

function Filter(props) {
  return (
    <div className="list-bottom">
      <p className="items-left">
        <span className="number">{props.itemAmount}</span>
        <span className="item"> {props.itemText}</span> left
      </p>
      <div className="item-status">
        <p
          className={`all ${props.selected === "all" ? "selected" : ""}`}
          onClick={props.handleAllClick}
        >
          All
        </p>
        <p
          className={`active ${props.selected === "active" ? "selected" : ""}`}
          onClick={props.handleActiveClick}
        >
          Active
        </p>
        <p
          className={`completed ${
            props.selected === "completed" ? "selected" : ""
          }`}
          onClick={props.handleCompletedClick}
        >
          Completed
        </p>
      </div>
      <p className="clear" onClick={props.handleClearCompletedClick}>
        Clear Completed
      </p>
    </div>
  );
}

export default Filter;
