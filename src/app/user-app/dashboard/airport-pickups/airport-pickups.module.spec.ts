import { AirportPickupsModule } from './airport-pickups.module';

describe('AirportPickupsModule', () => {
  let airportPickupsModule: AirportPickupsModule;

  beforeEach(() => {
    airportPickupsModule = new AirportPickupsModule();
  });

  it('should create an instance', () => {
    expect(airportPickupsModule).toBeTruthy();
  });
});
