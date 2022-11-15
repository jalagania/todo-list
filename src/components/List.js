import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./List.css";
import ListItem from "./ListItem";

function List() {
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [itemText, setItemText] = useState("item");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setFilteredList(listItems);
  }, [listItems]);

  // Add New List Item
  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue !== "") {
      setListItems((prevState) => {
        return [
          { text: inputValue, completed: false, id: Math.random() * 1000 },
          ...prevState,
        ];
      });
      setInputValue("");
    }
  }

  // Remove List Item
  function handleRemoveClick(id) {
    setListItems(listItems.filter((item) => item.id !== id));
  }

  // Check List Items Number
  useEffect(() => {
    listItems.filter((item) => item.completed === false).length > 1
      ? setItemText("items")
      : setItemText("item");
    setItemAmount(listItems.filter((item) => item.completed === false).length);
  }, [listItems]);

  // Check Completed
  function handleCheckClick(id) {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }

  // Show All Items
  function handleAllClick() {
    setFilteredList(listItems);
    setSelected("all");
  }

  // Show Active Items
  function handleActiveClick() {
    setFilteredList(listItems.filter((item) => item.completed === false));
    setSelected("active");
  }

  // Show Completed
  function handleCompletedClick() {
    setFilteredList(listItems.filter((item) => item.completed === true));
    setSelected("completed");
  }

  // Clear Completed
  function handleClearCompletedClick() {
    setListItems(listItems.filter((item) => item.completed === false));
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const updatedItems = Array.from(filteredList);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);
    setFilteredList(updatedItems);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <button className="check-box"></button>
        <input
          type="text"
          className="input"
          placeholder="Create a new todo..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="todo-list-box">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul
                className="todo-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredList.map((item, index) => {
                  return (
                    <ListItem
                      key={item.id}
                      index={index}
                      text={item.text}
                      id={item.id}
                      completed={item.completed}
                      handleCheckClick={handleCheckClick}
                      handleRemoveClick={handleRemoveClick}
                    />
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className="list-bottom">
          <p className="items-left">
            <span className="number">{itemAmount}</span>
            <span className="item"> {itemText}</span> left
          </p>
          <div className="item-status">
            <p
              className={`all ${selected === "all" ? "selected" : ""}`}
              onClick={handleAllClick}
            >
              All
            </p>
            <p
              className={`active ${selected === "active" ? "selected" : ""}`}
              onClick={handleActiveClick}
            >
              Active
            </p>
            <p
              className={`completed ${
                selected === "completed" ? "selected" : ""
              }`}
              onClick={handleCompletedClick}
            >
              Completed
            </p>
          </div>
          <p className="clear" onClick={handleClearCompletedClick}>
            Clear Completed
          </p>
        </div>
      </div>
      <p className="instruction">Drag and drop to reorder list</p>
    </form>
  );
}

export default List;
