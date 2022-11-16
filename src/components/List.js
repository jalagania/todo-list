import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Filter from "./Filter";
import "./List.css";
import ListItem from "./ListItem";

function List() {
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [itemText, setItemText] = useState("item");
  const [selected, setSelected] = useState("all");

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
    setSelected("all");
  }

  // Show Active Items
  function handleActiveClick() {
    setSelected("active");
  }

  // Show Completed
  function handleCompletedClick() {
    setSelected("completed");
  }

  // Clear Completed
  function handleClearCompletedClick() {
    setListItems(listItems.filter((item) => item.completed === false));
  }

  //   Render List Items On Clicking Filter Buttons
  function renderList() {
    if (selected === "active") {
      return listItems.filter((item) => item.completed === false);
    }
    if (selected === "completed") {
      return listItems.filter((item) => item.completed === true);
    }
    return filteredList;
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const updatedItems = Array.from(listItems);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);
    setListItems(updatedItems);
  }

  return (
    <div>
      <form className="input-box" onSubmit={handleSubmit}>
        <button className="check-box"></button>
        <input
          type="text"
          className="input"
          placeholder="Create a new todo..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
      <div className="todo-list-box">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul
                className="todo-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderList().map((item, index) => {
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
        <Filter
          itemAmount={itemAmount}
          itemText={itemText}
          selected={selected}
          handleAllClick={handleAllClick}
          handleActiveClick={handleActiveClick}
          handleCompletedClick={handleCompletedClick}
          handleClearCompletedClick={handleClearCompletedClick}
        />
      </div>
      <p className="instruction">Drag and drop to reorder list</p>
    </div>
  );
}

export default List;
