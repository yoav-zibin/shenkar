import {aiService} from '../aiService';
import {checkAiService} from '../../common/utilsForTests';

describe('aiService', function () {
  it('checkAiService', () => {
    checkAiService(aiService);
  });
});
