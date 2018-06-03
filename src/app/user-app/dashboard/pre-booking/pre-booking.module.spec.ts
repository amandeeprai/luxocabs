import { PreBookingModule } from './pre-booking.module';

describe('PreBookingModule', () => {
  let preBookingModule: PreBookingModule;

  beforeEach(() => {
    preBookingModule = new PreBookingModule();
  });

  it('should create an instance', () => {
    expect(preBookingModule).toBeTruthy();
  });
});
