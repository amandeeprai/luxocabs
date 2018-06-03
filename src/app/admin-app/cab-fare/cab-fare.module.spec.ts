import { CabFareModule } from './cab-fare.module';

describe('CabFareModule', () => {
  let cabFareModule: CabFareModule;

  beforeEach(() => {
    cabFareModule = new CabFareModule();
  });

  it('should create an instance', () => {
    expect(cabFareModule).toBeTruthy();
  });
});
