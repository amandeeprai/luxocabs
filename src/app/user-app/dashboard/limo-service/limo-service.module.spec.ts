import { LimoServiceModule } from './limo-service.module';

describe('LimoServiceModule', () => {
  let limoServiceModule: LimoServiceModule;

  beforeEach(() => {
    limoServiceModule = new LimoServiceModule();
  });

  it('should create an instance', () => {
    expect(limoServiceModule).toBeTruthy();
  });
});
