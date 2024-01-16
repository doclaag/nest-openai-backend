import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {
  // it's just going to call use case

  async ortographyCheck() {
    return await orthographyCheckUseCase();
  }
}
