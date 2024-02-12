import "../../css/UserProfile/user.css";


export default function SearchedUser(props) {
  function handleClick() {
    console.log(props.username);
    window.location.href= `/dashboard/users/${props.id}`
  }

  return (
    <div onClick={handleClick} className="searched-user">
      <h4>{props.username}</h4>
    </div>
  );
}
