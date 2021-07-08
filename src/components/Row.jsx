import React from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";

const DND_ITEM_TYPE = "row";
const Row = ({ row, index, moveRow }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);
  console.log(row);
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { index },
    type: DND_ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  const renderTd = (cell) => {
    if (cell.column.id !== "name" && cell.column.id !== "setting") {
      console.log(cell.column.id !== "setting");
      return cell.render("Cell");
    }
    if (cell.column.id === "name") {
      console.log("isss");
      return (
        <tr>
          <td >
            <div className={`status ${cell.value[1]}`}></div>
          </td>
          <td>{cell.value[0]}</td>
        </tr>
      );
    }
    if (cell.column.id === "setting") {
      return (
        <tr className="settingWrap">
          <td>
            <button className="statics"></button>
          </td>
          <td className="setting">
            <button className="setting-btn">...</button>
          </td>
        </tr>
      );
    }
  };
  return (
    <tr ref={dropRef} style={{ opacity }}>
      <td ref={dragRef}>move</td>
      {row.cells.map((cell) => {
        return <td {...cell.getCellProps()}>{renderTd(cell)}</td>;
      })}
    </tr>
  );
};

export default Row;
