Step 1: npm install in terminal
Step 2: npm start
Step 3: start hitting endpoints in postman

E.g. http://localhost:4000/user/register
E.g. http://localhost:4000/admin/create-role

Guide:

User Endpoints
• post/register: This endpoint will register a new user and default role will be empty admin can assign role later
o Body: {username: String, password: String}

• post/login: Here user can login using this endpoint this endpoint will return JWT token in return
o Body: {username: String, password: String}

• post/user-info: This endpoint will return all information about user including username role and permissions
o Body: {username: String }
o Authorization: Token

• put/profile: This endpoint will help user to update his profile in our case which is username & password others can be only updated by admin
o Body: {username: String, Password }
o Authorization: Token

Admin Endpoints:
• post/create-role: This endpoint will create or update role if there is not role available it will add otherwise It will update previous role with new one
o Body: {username: String, role: String }
o Authorization: Token

• delete/delete-role: This endpoint as name specified will delete already existing role
o Body: {username: String }
o Authorization: Token

• post/add-permission: This endpoint will allow admin to add a permission
o Body: {username: String, permission: String }
o Authorization: Token

• delete/delete-permission: This endpoint will help admin to delete one permission at a time
o Body: {username: String, permission: String }
o Authorization: Token
