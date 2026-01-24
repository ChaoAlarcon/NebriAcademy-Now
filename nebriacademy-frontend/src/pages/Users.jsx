import { useLoaderData } from "react-router-dom";

function Users() {
	const users = useLoaderData();

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}

export default Users;
