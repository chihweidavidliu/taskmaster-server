const passportService = require("./services/passport");
const passport = require("passport");
const UserController = require("./controllers/userController");
const TodoController = require("./controllers/todoController");

// middlewares
const requireGoogleLogin = passport.authenticate("google", { scope: ["profile", "email"] });
const requireMockLogin = passport.authenticate("mock");


const requireLogin = require("./middlewares/requireLogin");

module.exports = function(app) {
  // auth routes
  app.get("/auth/google", requireGoogleLogin);

  app.get("/auth/google/callback", requireGoogleLogin, (req, res, next) => {
    res.redirect("/dashboard");
  });

  app.get("/auth/mock", requireMockLogin, (req, res, next) => {
    res.send(req.user);
  });

  app.get("/api/current_user", requireLogin, (req, res) => {
    res.send(req.user);
  });

  // edit users projects
  app.patch("/api/current_user/addProject", requireLogin, UserController.addProject);

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


  // todo routes
  app.post("/api/todos", requireLogin, TodoController.createTodo);
  app.get("/api/todos", requireLogin, TodoController.getTodos);
  app.get("/api/todos/filter/:category", requireLogin, TodoController.getTodosByCategory);
  app.get("/api/todos/:id", requireLogin, TodoController.getTodoById);
  app.delete("/api/todos/:id", requireLogin, TodoController.deleteTodoById);
  app.patch("/api/todos/:id", requireLogin, TodoController.editTodoById);
};
