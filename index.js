// a function that fetch the users data from jsonplaceholder api (/users) and return a promise
// resolved with the  users data
const fetchUsersData = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const users = await response.json();
	return users;
};

// a function that fetch the users posts from jsonplaceholder api (/posts) and return a promise
// resolved with the  users posts
const fetchUsersPosts = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts = await response.json();
	return posts;
};

// a function to remove the user posts model from the screen
const hideUserPosts = () => {
	$(".modelContainer").remove();
};

// a function to show a model of posts written by the clicked user row and take as parameter
// the user id
const showUserPosts = (id) => {
	fetchUsersPosts()
		.then((data) => {
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
        <div class="modelContainer">
            <div class="model">            
                <svg
				xmlns="http://www.w3.org/2000/svg"
				class=""
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
                onclick="hideUserPosts()"
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
                </div> 
            </div>
        </div>
        `);
		})
		.catch((error) => console.log(error));
};

// using the promise returned by fetchUsersData fuction to append the content of the
// users table
fetchUsersData()
	.then((data) => {
		let uesrsTable = "";
		data.map((user) => {
			var userInfo = `<tr class="userRow" onclick = "showUserPosts(${user.id})">
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
	})
	.catch((error) => console.log(error));
