import { FqaModule } from './fqa.module';

describe('FqaModule', () => {
  let fqaModule: FqaModule;

  beforeEach(() => {
    fqaModule = new FqaModule();
  });

  it('should create an instance', () => {
    expect(fqaModule).toBeTruthy();
  });
});
