async function loadUsers(){
    const userList = document.getElementById('userList');
    const status = document.getElementById('status');

    try{

        const response = await fetch("/api/users");

        if(!response.ok){
            throw new Error('Error in fetching users from /api/users');
        }

        const users = await response.json();

        if(!Array.isArray(users) || users.length === 0){
            status.innerHTML = 'No users found.';
            return;
        }

        userList.innerHTML = '';

        users.forEach(user => {
            let li = document.createElement('li');

            // li.innerHTML = `
            // <div>
            //     <p>id: ${user.id}</p>
            //     <p class="text-primary">name: ${user.name}</p>
            //     <p>email: ${user.email}</p>
            // </div>
            // `;

            li.innerHTML = `
                <div>
                <div class="card bg-white shadow-sm my-5 p-4">
                    <h5 class="card-title">name: ${user.name}</h5>

                    <div class="card-body">
                        <p class="text-muted">id: ${user.id}</p>
                        <p class="text-muted">email: ${user.email}</p>
                    </div>
                </div>
            </div>
            `;

            userList.appendChild(li);
        })

        status.innerHTML = `Loaded ${users.length} users successfully!`;

    }
    catch(error){
        status.innerHTML = 'Error in fetching users';
    }
}

loadUsers();