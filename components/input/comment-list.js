import classes from './comment-list.module.css';

function CommentList(props) {
  console.log("~ props", props)
  const {items } = props
  return (
    <ul className={classes.comments}>
      { items.map( itm => (
      <li key={itm.id}>
        <p>{itm.text}</p>
        <div>
          By <address> {itm.name}</address>
        </div>
      </li>
      ))}
    </ul>
  );
}

export default CommentList;
