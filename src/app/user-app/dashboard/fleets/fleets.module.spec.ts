import { FleetsModule } from './fleets.module';

describe('FleetsModule', () => {
  let fleetsModule: FleetsModule;

  beforeEach(() => {
    fleetsModule = new FleetsModule();
  });

  it('should create an instance', () => {
    expect(fleetsModule).toBeTruthy();
  });
});
