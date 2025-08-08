type TodoItemProps = {
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem = ({ onToggle, onDelete, onEdit }: TodoItemProps): JSX.Element => {
  return <div>TodoItem</div>;
};

export default TodoItem;
