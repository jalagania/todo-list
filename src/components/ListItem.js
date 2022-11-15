import "./ListItem.css";
import { Draggable } from "react-beautiful-dnd";

function ListItem(props) {
  return (
    <Draggable
      key={props.id}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <li
          className="list-item"
          draggable="true"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="gradient-wrapper">
            <div
              className={`check-box check ${
                props.completed ? "transparent" : ""
              }`}
              onClick={() => {
                props.handleCheckClick(props.id);
              }}
            >
              <svg
                className={`icon-check ${props.completed ? "" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
              >
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  d="M1 4.304L3.696 7l6-6"
                />
              </svg>
            </div>
          </div>
          <p className={`list-text ${props.completed ? "finished" : ""}`}>
            {props.text}
          </p>
          <div
            className="remove"
            onClick={() => props.handleRemoveClick(props.id)}
          >
            <svg
              className="icon-cross"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
            >
              <path
                fillRule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default ListItem;
