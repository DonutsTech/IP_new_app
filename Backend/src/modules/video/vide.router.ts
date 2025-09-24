import { Router } from 'express';
import VideoController from './video.controller';
import { videoUpload } from '../../config/multerConfig';
import { isAuthenticateToken } from '../../middlewares/isAuthenticateToken';
import { isValidateUserPlan } from '../../middlewares/isValidateUserPlan';
import { isValidateLimitVideo } from '../../middlewares/isValidateLimitVideo';
import schemaValidator from '../../middlewares/schemaValidator';

class VideoRouter {
  public static create(router: Router): void {
    const endpoint = new VideoController();

    router.post(
      '/videos',
      isAuthenticateToken,
      isValidateUserPlan,
      isValidateLimitVideo,
      videoUpload.single('video'),
      endpoint.createVideo,
    );
    router.get('/videos', isAuthenticateToken, isValidateUserPlan, endpoint.videosByUser);
    router.get('/videos/:id', isAuthenticateToken, isValidateUserPlan, endpoint.videoById);
    router.put(
      '/videos/:id',
      isAuthenticateToken,
      isValidateUserPlan,
      schemaValidator('video/update'),
      endpoint.updateVideo,
    );
  }
}

export { VideoRouter };
