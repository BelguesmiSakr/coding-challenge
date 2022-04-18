const fetchUsersData = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const users = await response.json();
	return users;
};

const fetchUsersPosts = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts = await response.json();
	return posts;
};

// let post = {
// 	userId: 1,
// 	id: 1,
// 	title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
// 	body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
// };

const hideUserPosts = () => {
	var elem = document.querySelector(".model");
	elem.parentNode.removeChild(elem);
	// $("body").removeC(".model");
};

const showUserPosts = (id) => {
	console.log(id);
	fetchUsersPosts().then((data) => {
		let userPosts = "";
		data.map((post) => {
			if (post.userId === id) {
				const userPost = `<tr>
						<td>${post.id}</td>
						<td>${post.title}</td>
						<td>${post.body}</td>
					    </tr>`;
				userPosts += userPost;
			}
		});
		$("body").append(`
            <div class="model">
            <svg
				xmlns="http://www.w3.org/2000/svg"
				class=""
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
                ${(onclick = { hideUserPosts })}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg> 
            <div class="tabContainer">       
            <table class="userPosts">
				<thead>
					<tr>
						<th>Id</th>
						<th>Title</th>
						<th>Body</th>
					</tr>
				</thead>
				<tbody class="usersPostsBody">${userPosts}</tbody>
			</table>
            <div> 
            </div>
            `);
	});
};

fetchUsersData().then((data) => {
	let uesrsTable = "";
	data.map((user) => {
		var userInfo = `<tr class="userRow" ${(onclick = () => {
			console.log(user);
			showUserPosts(user.id);
		})}>
						<td>${user.id}</td>
						<td>${user.name}</td>
						<td>${user.username}</td>
						<td>${user.phone}</td>
						<td>${user.email}</td>
						<td>${user.website}</td>
						<td>${user.address.suite} ${user.address.street} ${user.address.city}</td>
						<td>${user.company.name}</td>
					    </tr>`;
		uesrsTable += userInfo;
	});
	$(".usersTableBody").append(uesrsTable);
});
