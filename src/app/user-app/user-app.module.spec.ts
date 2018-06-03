import { UserAppModule } from './user-app.module';

describe('UserAppModule', () => {
  let userAppModule: UserAppModule;

  beforeEach(() => {
    userAppModule = new UserAppModule();
  });

  it('should create an instance', () => {
    expect(userAppModule).toBeTruthy();
  });
});
