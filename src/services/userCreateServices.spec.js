const UserCreateServices = require("./userCreateServices");
const UserRepositoryInMemory = require("../repositories/userRepositoryInMemory");
const AppError = require("../utils/appError");


describe("UserCreateServices", () => {
  it("user should be create", async () =>{
    const user = {
     name: "User Test",
     email: "user@test.com",
     password: "123"
    };
    
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateServices = new UserCreateServices(userRepositoryInMemory);
    const userCreated = await userCreateServices.execute(user)
 
    console.log(userCreated);
 
   expect(userCreated).toHaveProperty("id");
 
 });

 it("email should be unique", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    };

    const userRepository = new UserRepositoryInMemory();
    const userCreateServices = new UserCreateServices(userRepository);

    await userCreateServices.execute(user1);
    await expect( userCreateServices.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));

 });

})


