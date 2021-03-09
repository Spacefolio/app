import { IUserView } from './../../../types/user.types';
import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../../../types";
import { userService } from "./user.service";
const router = Router();

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);
//router.get('/', getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.get("/registrationCheck", checkRegistration);
// router.put('/:id', update);
//router.delete('/:id', _delete);

export { router as usersRouter };

function authenticate(req: any, res: Response, next: NextFunction) {
  userService
    .authenticate(req.body)
    .then((user: IUserView) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Email or password is incorrect" })
    )
    .catch((err: any) => next(err));
}

function checkRegistration(req: any, res: Response, next: NextFunction) {
    userService.checkIfRegistered(req.body.email)
    .then((registered) => res.json({ registered: registered }))
    .catch((err: any) => next(err));
}

function register(req: Request, res: Response, next: NextFunction) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

/*
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
*/

function getCurrent(req: any, res: Response, next: NextFunction) {
  userService.getById(
    req.user.sub
      .then((user: IUser) => (user ? res.json(user) : res.sendStatus(404)))
      .catch((err: any) => next(err))
  );
}

function getById(req: any, res: Response, next: NextFunction) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

// function update(req: any, res: Response, next: NextFunction) {
//     userService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err: any => next(err));
// }

/*
function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
*/
