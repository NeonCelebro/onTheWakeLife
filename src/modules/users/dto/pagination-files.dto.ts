import { PaginationMixin } from 'src/common/dto';
import { FeedbackFileEntity } from '../entities/feedback-file.entity';

/**
 * [description]
 */
export class PaginationUserFeedbackFilesDto extends PaginationMixin(FeedbackFileEntity) {
  /**
   * [description]
   * @param result
   * @param total
   */
  constructor([result, total]: [FeedbackFileEntity[], number]) {
    super();
    Object.assign(this, { result, total });
  }
}
