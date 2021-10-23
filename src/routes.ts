import { Router } from "express";
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { MessageController } from './controllers/MessageController';
import { ShowMessageController } from './controllers/ShowMessageController';
import { ProfileUserController } from './controllers/ProfileUserController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';


const authenticateUserController = new AuthenticateUserController()


const router = Router()

router.use('/signin/callback', authenticateUserController.handle)
router.post('/message', ensureAuthenticated, new MessageController().handle)
router.get('/message', ensureAuthenticated, new ShowMessageController().handle)
router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

export { router }