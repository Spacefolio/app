import { Request, Response, NextFunction } from 'express';

import debug from 'debug';
import { PermissionFlag } from './PermissionFlagEnum';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
        if (userPermissionFlags & requiredPermissionFlag) {
          next();
        } else {
          res.status(403).send();
        }
      } catch (e) {
        log(e);
      }
    };
  }

  async onlySameUserOrAdminCanDoThisAction(req: Request, res: Response, next: NextFunction) {
    const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
    
    if (req.params?.userId === res.locals.jwt.permissionFlags) {
      return next();
    } else if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }

  async onlyAdminCanDoThisAction(req: Request, res: Response, next: NextFunction) {
    const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
    if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export default new CommonPermissionMiddleware();